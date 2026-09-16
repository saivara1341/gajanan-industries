(() => {
  const panel = document.querySelector('#labReports');
  const nav = document.querySelector('#labReportsNav');
  const workspace = document.querySelector('.workspace');
  const inquiries = document.querySelector('#inquiries');
  const form = document.querySelector('#labReportForm');
  const list = document.querySelector('#labReportList');
  const status = document.querySelector('#labReportStatus');
  if (!panel || !nav || !form) return;
  let reports = [];
  const endpoint = 'https://xoqpxckowwubeqdtazks.supabase.co/functions/v1/lab-reports';
  const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const batch = value => String(value || '').trim().toUpperCase().replace(/\s+/g, '');
  const setStatus = (message = '', error = false) => { status.textContent = message; status.classList.toggle('is-error', error); };
  const show = open => {
    panel.hidden = !open;
    workspace.hidden = open;
    inquiries.hidden = true;
    nav.classList.toggle('active', open);
    document.querySelector('.side-nav a[href="#studio"]')?.classList.toggle('active', !open);
    document.querySelector('#inquiriesNav')?.classList.remove('active');
    if (open) load();
  };
  const render = () => {
    if (!reports.length) { list.innerHTML = '<p class="lab-empty">No lab reports have been added yet.</p>'; return; }
    list.innerHTML = `<div class="lab-table-wrap"><table class="lab-table"><thead><tr><th>Batch number</th><th>Product</th><th>Report date</th><th>Lab report</th><th></th></tr></thead><tbody>${reports.map((item, index) => `<tr><td><code>${escape(item.batchNumber)}</code></td><td>${escape(item.product) || '—'}</td><td>${escape(item.reportDate) || '—'}</td><td><a href="${encodeURI(item.reportPath)}" target="_blank" rel="noopener">Open report ↗</a></td><td><button type="button" data-delete="${index}">Remove</button></td></tr>`).join('')}</tbody></table></div>`;
  };
  const adminToken = () => { try { const session = JSON.parse(localStorage.getItem('gajanan_admin_session') || '{}'); return session.expiresAt > Date.now() ? session.token : ''; } catch { return ''; } };
  const request = async (body) => {
    const response = await fetch(endpoint, {method:'POST',headers:{'content-type':'application/json',authorization:`Bearer ${adminToken()}`},body:JSON.stringify(body)});
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'Could not process lab reports.');
    return result;
  };
  const load = async () => {
    list.innerHTML = '<p class="lab-empty">Loading lab reports…</p>';
    try { const result = await request({action:'admin-list'}); reports = result.items || []; render(); }
    catch (error) { list.innerHTML = `<p class="lab-empty">${escape(error.message || 'Could not load lab reports.')}</p>`; }
  };
  const upload = file => new Promise((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve(String(reader.result)); reader.onerror = () => reject(new Error('Could not read the selected file.')); reader.readAsDataURL(file); });
  nav.addEventListener('click', event => { event.preventDefault(); history.replaceState(null, '', '#lab-reports'); show(true); });
  document.querySelector('.side-nav a[href="#studio"]')?.addEventListener('click', () => { panel.hidden = true; nav.classList.remove('active'); });
  form.addEventListener('submit', async event => { event.preventDefault(); const fields = new FormData(form); const file = fields.get('report'); const batchNumber = batch(fields.get('batchNumber')); if (!batchNumber || !file?.size) return setStatus('Enter a batch number and choose a report file.', true); if (reports.some(item => item.batchNumber === batchNumber)) return setStatus(`A report already exists for ${batchNumber}. Remove it before replacing it.`, true); const button = form.querySelector('button'); button.disabled = true; setStatus('Uploading report…'); try { const data = await upload(file); await request({action:'admin-upload',batchNumber,product:String(fields.get('product') || '').trim(),reportDate:String(fields.get('reportDate') || '').trim(),name:file.name,data}); form.reset(); await load(); setStatus(`Report for ${batchNumber} is now available to customers.`); } catch (error) { setStatus(error.message || 'Could not upload the report.', true); } finally { button.disabled = false; } });
  list.addEventListener('click', async event => { const index = event.target.dataset.delete; if (index === undefined) return; const item = reports[Number(index)]; if (!confirm(`Remove the lab report for ${item.batchNumber}? This will permanently remove its stored document.`)) return; try { await request({action:'admin-delete',id:item.id}); await load(); setStatus('Lab report removed from batch lookup.'); } catch (error) { setStatus(error.message || 'Could not remove report.', true); } });
  if (location.hash === '#lab-reports') show(true);
})();
