import { createClient } from 'npm:@supabase/supabase-js@2.116.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}
const json = (body: Record<string, unknown>, status = 200) => new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, 'content-type': 'application/json' } })
const batch = (value: unknown) => String(value || '').trim().toUpperCase().replace(/\s+/g, '')
const clean = (value: unknown, length: number) => String(value || '').trim().replace(/[\u0000-\u001f\u007f]/g, ' ').slice(0, length)
const allowedMimes = new Set(['application/pdf', 'image/png', 'image/jpeg', 'image/webp'])

const bytesFromDataUrl = (data: string) => {
  const match = /^data:(application\/pdf|image\/(?:png|jpeg|webp));base64,([a-z0-9+/=]+)$/i.exec(data)
  if (!match) throw new Error('Upload a PDF, PNG, JPEG, or WebP report.')
  const binary = atob(match[2])
  const bytes = Uint8Array.from(binary, character => character.charCodeAt(0))
  if (bytes.byteLength > 25 * 1024 * 1024) throw new Error('The report must be 25 MB or smaller.')
  return { mimeType: match[1].toLowerCase(), bytes }
}

async function isAdmin(req: Request) {
  const header = req.headers.get('authorization') || ''
  const token = header.replace(/^Bearer\s+/i, '')
  const [expiresAt, signature] = token.split('.')
  const secret = Deno.env.get('ADMIN_TOTP_SECRET') || ''
  if (!secret || !/^\d+$/.test(expiresAt || '') || Number(expiresAt) <= Date.now() || !/^[a-f0-9]{64}$/i.test(signature || '')) return false
  const payload = `${expiresAt}:${secret.slice(0, 6)}`
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
  const digest = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payload))
  const expected = Array.from(new Uint8Array(digest)).map(value => value.toString(16).padStart(2, '0')).join('')
  return expected === signature
}

Deno.serve(async req => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  if (req.method !== 'POST') return json({ error: 'Method not allowed.' }, 405)
  try {
    const body = await req.json()
    const action = clean(body.action, 30)
    const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)
    if (action === 'lookup') {
      const batchNumber = batch(body.batchNumber)
      if (!/^[A-Z0-9_/-]{1,100}$/.test(batchNumber)) return json({ error: 'not_found' }, 404)
      const folder = batchNumber.replaceAll('/', '_')

      // 1. Try listing files inside the batch folder in lab-reports storage bucket (e.g. CB172_26)
      try {
        const { data: files } = await supabase.storage.from('lab-reports').list(folder, { limit: 10 })
        const validFile = files?.find(f => f.name && !f.name.startsWith('.'))
        if (validFile) {
          const { data: signed, error: signedError } = await supabase.storage.from('lab-reports').createSignedUrl(`${folder}/${validFile.name}`, 300)
          if (!signedError && signed?.signedUrl) {
            return json({ reportUrl: signed.signedUrl, batchNumber })
          }
        }
      } catch (_) {}

      // 2. Check gajanan_lab_reports database table
      try {
        const { data: report } = await supabase.from('gajanan_lab_reports').select('storage_path').eq('batch_number', batchNumber).maybeSingle()
        if (report?.storage_path) {
          const { data: signed, error: signedError } = await supabase.storage.from('lab-reports').createSignedUrl(report.storage_path, 300)
          if (!signedError && signed?.signedUrl) {
            return json({ reportUrl: signed.signedUrl, batchNumber })
          }
        }
      } catch (_) {}

      return json({ error: 'not_found' }, 404)
    }
    if (!await isAdmin(req)) return json({ error: 'Admin verification is required.' }, 401)
    if (action === 'admin-open') {
      const { data: report, error } = await supabase.from('gajanan_lab_reports').select('storage_path').eq('id', clean(body.id, 80)).maybeSingle()
      if (error) throw error
      if (!report) return json({ error: 'Lab report not found.' }, 404)
      const { data, error: signError } = await supabase.storage.from('lab-reports').createSignedUrl(report.storage_path, 300)
      if (signError) throw signError
      return json({ reportUrl: data.signedUrl })
    }
    if (action === 'admin-list') {
      const { data, error } = await supabase.from('gajanan_lab_reports').select('id, batch_number, product_name, report_date, created_at').order('created_at', { ascending: false })
      if (error) throw error
      return json({ items: data.map(item => ({ id: item.id, batchNumber: item.batch_number, product: item.product_name, reportDate: item.report_date, createdAt: item.created_at })) })
    }
    if (action === 'admin-upload') {
      const batchNumber = batch(body.batchNumber)
      if (!/^[A-Z0-9_/-]{1,100}$/.test(batchNumber)) return json({ error: 'Use 1–100 letters, numbers, slashes, hyphens, or underscores for the batch number.' }, 400)
      const { mimeType, bytes } = bytesFromDataUrl(String(body.data || ''))
      if (!allowedMimes.has(mimeType)) return json({ error: 'Unsupported report type.' }, 400)
      const extension = mimeType === 'application/pdf' ? 'pdf' : mimeType === 'image/jpeg' ? 'jpg' : mimeType.split('/')[1]
      const storagePath = `${batchNumber.replaceAll('/', '_')}/${crypto.randomUUID()}.${extension}`
      const { error: uploadError } = await supabase.storage.from('lab-reports').upload(storagePath, bytes, { contentType: mimeType, upsert: false })
      if (uploadError) throw uploadError
      const { error: insertError } = await supabase.from('gajanan_lab_reports').insert({ batch_number: batchNumber, product_name: clean(body.product, 160) || null, report_date: clean(body.reportDate, 10) || null, storage_path: storagePath, mime_type: mimeType })
      if (insertError) { await supabase.storage.from('lab-reports').remove([storagePath]); if (insertError.code === '23505') return json({ error: `A report already exists for ${batchNumber}.` }, 409); throw insertError }
      return json({ ok: true }, 201)
    }
    if (action === 'admin-delete') {
      const id = clean(body.id, 80)
      const { data: report, error: findError } = await supabase.from('gajanan_lab_reports').select('storage_path').eq('id', id).maybeSingle()
      if (findError) throw findError
      if (!report) return json({ error: 'Lab report not found.' }, 404)
      const { error: deleteError } = await supabase.from('gajanan_lab_reports').delete().eq('id', id)
      if (deleteError) throw deleteError
      const { error: removeError } = await supabase.storage.from('lab-reports').remove([report.storage_path])
      if (removeError) throw removeError
      return json({ ok: true })
    }
    return json({ error: 'Unknown lab report action.' }, 400)
  } catch (error) { return json({ error: error.message || 'Could not process the lab report.' }, 500) }
})
