import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

const clean = (value: unknown, length = 2000) => String(value ?? '').trim().replace(/[\u0000-\u001f\u007f]/g, ' ').slice(0, length)
const emailIsValid = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
const escapeHtml = (value: string) => value.replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character] ?? character))
const serviceKey = () => {
  const currentKeys = Deno.env.get('SUPABASE_SECRET_KEYS')
  if (currentKeys) {
    try {
      const keys = JSON.parse(currentKeys)
      if (typeof keys.default === 'string') return keys.default
    } catch {
      // Fall through to the legacy runtime variable below.
    }
  }
  return Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
}

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })
  if (request.method !== 'POST') return Response.json({ error: 'Method not allowed.' }, { status: 405, headers: corsHeaders })

  try {
    const body = await request.json()
    const inquiry = {
      name: clean(body.name, 120),
      email: clean(body.email, 254).toLowerCase(),
      phone_country_code: clean(body.phoneCode, 8),
      phone_number: clean(body.phone, 30),
      company: clean(body.company, 160) || null,
      enquiry_type: body.type === 'export' ? 'export' : 'domestic',
      exporting_country: clean(body.country, 100) || null,
      message: clean(body.message, 4000),
    }

    if (!/^[\p{L}][\p{L}\p{M}\s.'-]{1,119}$/u.test(inquiry.name)) throw new Error('Please enter your full name using letters only.')
    if (!emailIsValid(inquiry.email)) throw new Error('Please enter a valid email address.')
    if (!/^\+[0-9]{1,4}$/.test(inquiry.phone_country_code)) throw new Error('Please select a valid country calling code.')
    if (!/^\d+$/.test(inquiry.phone_number)) throw new Error('Mobile number can contain digits only.')
    if (inquiry.phone_country_code === '+91' && !/^[6-9]\d{9}$/.test(inquiry.phone_number)) throw new Error('Please enter a valid 10-digit Indian mobile number.')
    if (inquiry.phone_country_code !== '+91' && !/^\d{6,15}$/.test(inquiry.phone_number)) throw new Error('Please enter a valid mobile number.')
    if (inquiry.message.length < 8) throw new Error('Please add a little more detail to your enquiry.')

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      serviceKey(),
    )
    const { data, error } = await supabase.from('gajanan_enquiries').insert(inquiry).select('id').single()
    if (error) throw error

    const recipient = Deno.env.get('ENQUIRY_RECIPIENT') || 'ssaivaraprasad51@gmail.com'
    const resendKey = Deno.env.get('RESEND_API_KEY')
    const sender = Deno.env.get('MAIL_FROM')
    let mailSent = false
    if (resendKey && sender) {
      const rows = [
        ['Name', inquiry.name], ['Email', inquiry.email], ['Mobile', `${inquiry.phone_country_code} ${inquiry.phone_number}`],
        ['Company', inquiry.company || 'Not provided'], ['Enquiry type', inquiry.enquiry_type],
        ['Exporting country', inquiry.exporting_country || 'Not provided'], ['Requirement', inquiry.message],
      ].map(([label, value]) => `<tr><th align="left" style="padding:7px 14px 7px 0;vertical-align:top">${escapeHtml(label)}</th><td style="padding:7px 0">${escapeHtml(value)}</td></tr>`).join('')
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ from: sender, to: recipient, reply_to: inquiry.email, subject: `New ${inquiry.enquiry_type} enquiry — ${inquiry.name}`, html: `<h2>New website enquiry</h2><table>${rows}</table>` }),
      })
      mailSent = response.ok
      if (mailSent) await supabase.from('gajanan_enquiries').update({ email_sent_at: new Date().toISOString() }).eq('id', data.id)
    }
    return Response.json({ ok: true, mailSent }, { status: 201, headers: corsHeaders })
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : 'Unable to submit enquiry.' }, { status: 400, headers: corsHeaders })
  }
})
