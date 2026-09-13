const inquiryEscape = value => String(value ?? '').replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));
const inquiryPanel = document.querySelector('#inquiries');
const inquiryNav = document.querySelector('#inquiriesNav');
const studioWorkspace = document.querySelector('.workspace');
const inquiryList = document.querySelector('#inquiryList');
const inquirySummary = document.querySelector('#inquirySummary');
const inquiryCount = document.querySelector('#inquiryCount');
let inquiryItems = [];
const localInquiryKey = 'gajanan-local-enquiries';
const getLocalInquiries = () => { try { const items = JSON.parse(localStorage.getItem(localInquiryKey) || '[]'); return Array.isArray(items) ? items : []; } catch { return []; } };

function showInquiries(open){
  inquiryPanel.hidden = !open;
  studioWorkspace.hidden = open;
  inquiryNav.classList.toggle('active', open);
  document.querySelector('.side-nav a[href="#studio"]')?.classList.toggle('active', !open);
  if (open) loadInquiries();
}
function displayDate(value){ try { return new Intl.DateTimeFormat(undefined,{dateStyle:'medium',timeStyle:'short'}).format(new Date(value)); } catch { return value; } }
function renderInquiries(){
  const counts = ['new','in-progress','resolved'].map(status => inquiryItems.filter(item => item.status === status).length);
  inquiryCount.textContent = counts[0];
  inquirySummary.innerHTML = [['New',counts[0]],['In progress',counts[1]],['Resolved',counts[2]]].map(([label,count]) => `<article class="inquiry-stat"><b>${count}</b><span>${label}</span></article>`).join('');
  if (!inquiryItems.length) { inquiryList.innerHTML = '<p class="inquiry-empty">No website enquiries yet.</p>'; return; }
  inquiryList.innerHTML = `<div class="inquiry-table-wrap"><table class="inquiry-table"><thead><tr><th>Name</th><th>Email</th><th>Mobile</th><th>Company</th><th>Enquiry</th><th>Message</th><th>Received</th></tr></thead><tbody>${inquiryItems.map(item => `<tr><td>${inquiryEscape(item.name)}</td><td><a href="mailto:${inquiryEscape(item.email)}">${inquiryEscape(item.email)}</a></td><td>${item.phone ? `${inquiryEscape(item.phoneCode || '')} ${inquiryEscape(item.phone)}` : '—'}</td><td>${inquiryEscape(item.company) || '—'}</td><td>${inquiryEscape(item.type)}${item.country ? `<small>${inquiryEscape(item.country)}</small>` : ''}</td><td class="inquiry-message">${inquiryEscape(item.message)}</td><td>${displayDate(item.createdAt)}</td></tr>`).join('')}</tbody></table></div>`;
}
async function loadInquiries(){
  inquiryList.innerHTML = '<p class="inquiry-empty">Loading enquiries…</p>';
  const isLocalServer = ['localhost', '127.0.0.1'].includes(location.hostname) && (location.port === '4173' || location.port === '3000');
  if (isLocalServer) {
    try {
      const response = await fetch('/api/inquiries');
      let data = {};
      try {
        const contentType = response.headers.get('content-type') || '';
        if (contentType.includes('application/json')) data = await response.json();
      } catch (_) {}
      if (response.ok && Array.isArray(data.items)) {
        inquiryItems = data.items;
        renderInquiries();
        return;
      }
    } catch (_) {}
  }
  inquiryItems = getLocalInquiries();
  if (inquiryItems.length) {
    renderInquiries();
    inquiryList.insertAdjacentHTML('afterbegin','<p class="inquiry-empty">Showing enquiries saved on this device. Start the Content Studio server to view shared inbox submissions and enable email delivery.</p>');
    return;
  }
  inquiryList.innerHTML = '<p class="inquiry-empty">No local enquiries yet. Start the Content Studio server to view the shared inbox and email delivery status.</p>';
}
inquiryNav?.addEventListener('click', event => { event.preventDefault(); history.replaceState(null,'','#inquiries'); showInquiries(true); });
document.querySelector('#backToStudio')?.addEventListener('click', () => { history.replaceState(null,'','#studio'); showInquiries(false); });
document.querySelector('.side-nav a[href="#studio"]')?.addEventListener('click', event => { event.preventDefault(); history.replaceState(null,'','#studio'); showInquiries(false); });
if (location.hash === '#inquiries') showInquiries(true);
