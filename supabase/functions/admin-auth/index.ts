// Supabase Edge Function: Verify Google Authenticator 6-Digit Code (RFC 6238 TOTP)
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

const base32Alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'

function base32Decode(input: string): Uint8Array {
  let bits = ''
  for (let i = 0; i < input.length; i++) {
    const val = base32Alphabet.indexOf(input.charAt(i).toUpperCase())
    if (val === -1) continue
    bits += val.toString(2).padStart(5, '0')
  }
  const bytes: number[] = []
  for (let i = 0; i + 8 <= bits.length; i += 8) {
    bytes.push(parseInt(bits.substring(i, i + 8), 2))
  }
  return new Uint8Array(bytes)
}

async function computeTOTP(secret: string, counter: number): Promise<string> {
  const keyBytes = base32Decode(secret)
  const key = await crypto.subtle.importKey(
    'raw',
    keyBytes,
    { name: 'HMAC', hash: 'SHA-1' },
    false,
    ['sign']
  )

  const buffer = new ArrayBuffer(8)
  const view = new DataView(buffer)
  view.setBigUint64(0, BigInt(counter), false)

  const signature = await crypto.subtle.sign('HMAC', key, buffer)
  const sigBytes = new Uint8Array(signature)

  const offset = sigBytes[sigBytes.length - 1] & 0x0f
  const binary =
    ((sigBytes[offset] & 0x7f) << 24) |
    ((sigBytes[offset + 1] & 0xff) << 16) |
    ((sigBytes[offset + 2] & 0xff) << 8) |
    (sigBytes[offset + 3] & 0xff)

  const otp = binary % 1000000
  return otp.toString().padStart(6, '0')
}

async function verifyCode(code: string, secret: string): Promise<boolean> {
  const cleaned = code.replace(/\s+/g, '').trim()
  if (cleaned.length !== 6 || !/^\d{6}$/.test(cleaned)) return false

  const currentCounter = Math.floor(Date.now() / 1000 / 30)
  // Check current window, -1 window, and +1 window (tolerance for clock drift)
  for (let window = -1; window <= 1; window++) {
    const expected = await computeTOTP(secret, currentCounter + window)
    if (expected === cleaned) return true
  }
  return false
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    })
  }

  try {
    const { code } = await req.json()
    const secret = Deno.env.get('ADMIN_TOTP_SECRET')
    if (!secret) {
      return new Response(
        JSON.stringify({ ok: false, error: 'Server authentication secret not configured' }),
        { status: 500, headers: { ...corsHeaders, 'content-type': 'application/json' } }
      )
    }

    const isValid = await verifyCode(code, secret)

    if (!isValid) {
      return new Response(
        JSON.stringify({ ok: false, error: 'Invalid 6-digit code. Please check your Google Authenticator app.' }),
        { status: 401, headers: { ...corsHeaders, 'content-type': 'application/json' } }
      )
    }

    // Generate session token valid for 12 hours
    const expiresAt = Date.now() + 12 * 60 * 60 * 1000
    const tokenPayload = `${expiresAt}:${secret.slice(0, 6)}`
    const encoder = new TextEncoder()
    const tokenKey = await crypto.subtle.importKey(
      'raw',
      encoder.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    )
    const tokenSignature = await crypto.subtle.sign('HMAC', tokenKey, encoder.encode(tokenPayload))
    const sigHex = Array.from(new Uint8Array(tokenSignature)).map(b => b.toString(16).padStart(2, '0')).join('')
    const token = `${expiresAt}.${sigHex}`

    return new Response(
      JSON.stringify({
        ok: true,
        message: 'Admin verification successful',
        token,
        expiresAt,
      }),
      { status: 200, headers: { ...corsHeaders, 'content-type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ ok: false, error: error.message || 'Verification error' }),
      { status: 400, headers: { ...corsHeaders, 'content-type': 'application/json' } }
    )
  }
})
