(() => {
  const AUTH_ENDPOINT = 'https://xoqpxckowwubeqdtazks.supabase.co/functions/v1/admin-auth';
  const REPORT_ENDPOINT = 'https://xoqpxckowwubeqdtazks.supabase.co/functions/v1/lab-reports';
  const SESSION_KEY = 'gajanan_admin_session';
  const overlay = document.querySelector('#authOverlay');
  const authForm = document.querySelector('#authForm');
  const authCode = document.querySelector('#authCode');
  const authError = document.querySelector('#authError');
  const manager = document.querySelector('#batchManager');
  const lockButton = document.querySelector('#lockButton');
  const form = document.querySelector('#batchReportForm');
  const list = document.querySelector('#batchReportList');
  const status = document.querySelector('#batchStatus');
  const viewer = document.querySelector('#reportViewer');
  const reportFrame = document.querySelector('#reportFrame');
  const reportDownloadLink = document.querySelector('#reportDownloadLink');
  const reportInput = form.querySelector('[type=file]');
  const clearReportFile = document.querySelector('#clearReportFile');
  let reports = [];

  const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const normaliseBatch = value => String(value || '').trim().toUpperCase().replace(/\s+/g, '');
  const readSession = () => {
    try {
      const session = JSON.parse(localStorage.getItem(SESSION_KEY) || '{}');
      return session.expiresAt > Date.now() && session.token ? session : null;
    } catch { return null; }
  };
  const setStatus = (message = '', error = false) => {
    status.textContent = message;
    status.classList.toggle('is-error', error);
  };
  const showManager = () => {
    overlay.hidden = true;
    manager.hidden = false;
    lockButton.hidden = false;
    loadReports();
  };
  const showLogin = () => {
    localStorage.removeItem(SESSION_KEY);
    overlay.hidden = false;
    manager.hidden = true;
    lockButton.hidden = true;
    authCode.value = '';
    authError.textContent = '';
    setTimeout(() => authCode.focus(), 50);
  };
  const request = async body => {
    const session = readSession();
    if (!session) throw new Error('Admin verification is required.');
    const response = await fetch(REPORT_ENDPOINT, {method:'POST',headers:{'content-type':'application/json',authorization:`Bearer ${session.token}`},body:JSON.stringify(body)});
    const result = await response.json().catch(() => ({}));
    if (response.status === 401) { showLogin(); throw new Error('Your session has expired. Verify again to continue.'); }
    if (!response.ok) throw new Error(result.error || 'Could not process lab reports.');
    return result;
  };
  const render = () => {
    if (!reports.length) { list.innerHTML = '<p class="empty-state">No lab reports have been added yet.</p>'; return; }
    list.innerHTML = `<div class="table-wrap"><table class="report-table"><thead><tr><th>Batch number</th><th>Product</th><th>Report date</th><th>Lab report</th><th></th></tr></thead><tbody>${reports.map((item,index)=>`<tr><td><code>${escape(item.batchNumber)}</code></td><td>${escape(item.product)||'—'}</td><td>${escape(item.reportDate)||'—'}</td><td><button class="table-action" type="button" data-open="${index}">Open report</button></td><td><button class="table-action remove" type="button" data-delete="${index}">Remove</button></td></tr>`).join('')}</tbody></table></div>`;
  };
  const loadReports = async () => {
    list.innerHTML = '<p class="empty-state">Loading lab reports…</p>';
    try { const result = await request({action:'admin-list'}); reports = result.items || []; render(); }
    catch (error) { list.innerHTML = `<p class="empty-state">${escape(error.message)}</p>`; }
  };
  const fileAsDataUrl = file => new Promise((resolve,reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error('Could not read the selected report.'));
    reader.readAsDataURL(file);
  });

  authForm.addEventListener('submit', async event => {
    event.preventDefault();
    const code = authCode.value.replace(/\D/g, '').slice(0, 6);
    if (code.length !== 6) { authError.textContent = 'Enter all 6 digits.'; return; }
    const button = authForm.querySelector('button');
    button.disabled = true;
    button.textContent = 'Verifying…';
    authError.textContent = '';
    try {
      const response = await fetch(AUTH_ENDPOINT, {method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({code})});
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.ok) throw new Error(result.error || 'Invalid authentication code.');
      localStorage.setItem(SESSION_KEY, JSON.stringify({token:result.token,expiresAt:result.expiresAt || Date.now() + 12 * 60 * 60 * 1000}));
      showManager();
    } catch (error) { authError.textContent = error.message || 'Could not verify this code.'; authCode.select(); }
    finally { button.disabled = false; button.textContent = 'Unlock page'; }
  });
  authCode.addEventListener('input', () => { authCode.value = authCode.value.replace(/\D/g, '').slice(0, 6); });
  lockButton.addEventListener('click', showLogin);
  document.querySelector('#closeReportViewer').addEventListener('click', () => viewer.close());
  viewer.addEventListener('close', () => { reportFrame.src = 'about:blank'; reportDownloadLink.removeAttribute('href'); });
  reportInput.addEventListener('change', event => {
    const selected = event.target.files[0];
    form.querySelector('.file-field span').textContent = selected?.name || 'Choose report file';
    clearReportFile.hidden = !selected;
  });
  clearReportFile.addEventListener('click', () => {
    reportInput.value = '';
    form.querySelector('.file-field span').textContent = 'Choose report file';
    clearReportFile.hidden = true;
    setStatus('Selected file removed.');
  });
  form.addEventListener('submit', async event => {
    event.preventDefault();
    const fields = new FormData(form);
    const file = fields.get('report');
    const batchNumber = normaliseBatch(fields.get('batchNumber'));
    if (!batchNumber || !file?.size) { setStatus('Enter a batch number and choose its laboratory report.', true); return; }
    if (reports.some(item => item.batchNumber === batchNumber)) { setStatus(`A report already exists for ${batchNumber}. Remove it before replacing it.`, true); return; }
    const button = form.querySelector('[type=submit]');
    button.disabled = true;
    setStatus('Uploading report…');
    try {
      const data = await fileAsDataUrl(file);
      await request({action:'admin-upload',batchNumber,product:String(fields.get('product')||'').trim(),reportDate:String(fields.get('reportDate')||''),name:file.name,data});
      form.reset();
      form.elements.product.value = 'Low GI Rice';
      form.querySelector('.file-field span').textContent = 'Choose report file';
      clearReportFile.hidden = true;
      await loadReports();
      setStatus(`Report for ${batchNumber} is now available on the Low GI page.`);
    } catch (error) { setStatus(error.message || 'Could not upload the report.', true); }
    finally { button.disabled = false; }
  });
  list.addEventListener('click', async event => {
    const openIndex = event.target.dataset.open;
    if (openIndex !== undefined) {
      event.target.disabled = true;
      event.target.textContent = 'Opening…';
      try {
        const item = reports[Number(openIndex)];
        const result = await request({action:'admin-open',id:item.id});
        if (!result.reportUrl) throw new Error('The report link could not be created.');
        document.querySelector('#reportViewerTitle').textContent = `Laboratory report — ${item.batchNumber}`;
        reportFrame.src = result.reportUrl;
        reportDownloadLink.href = result.reportUrl;
        viewer.showModal();
      } catch (error) { setStatus(error.message || 'Could not open the report.', true); }
      finally { event.target.disabled = false; event.target.textContent = 'Open report'; }
      return;
    }
    const deleteIndex = event.target.dataset.delete;
    if (deleteIndex === undefined) return;
    const item = reports[Number(deleteIndex)];
    if (!confirm(`Remove the report for ${item.batchNumber}?`)) return;
    try { await request({action:'admin-delete',id:item.id}); await loadReports(); setStatus(`Report for ${item.batchNumber} was removed.`); }
    catch (error) { setStatus(error.message || 'Could not remove the report.', true); }
  });

  if (readSession()) showManager(); else showLogin();
})();
