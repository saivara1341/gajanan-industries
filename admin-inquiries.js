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
  inquiryList.innerHTML = inquiryItems.map(item => `<article class="inquiry-card" data-id="${inquiryEscape(item.id)}"><div><h3>${inquiryEscape(item.name)} <small>· ${inquiryEscape(item.type)}</small></h3><div class="inquiry-meta"><span>${inquiryEscape(item.email)}</span>${item.phone ? `<span>${inquiryEscape(item.phoneCode || '')} ${inquiryEscape(item.phone)}</span>` : ''}${item.company ? `<span>${inquiryEscape(item.company)}</span>` : ''}${item.country ? `<span>${inquiryEscape(item.country)}</span>` : ''}<span>${displayDate(item.createdAt)}</span></div><p class="inquiry-message">${inquiryEscape(item.message)}</p></div><div class="inquiry-side"><span class="inquiry-status" data-status="${inquiryEscape(item.status)}">${inquiryEscape(item.status)}</span><select aria-label="Update enquiry status"><option value="new" ${item.status==='new'?'selected':''}>New</option><option value="in-progress" ${item.status==='in-progress'?'selected':''}>In progress</option><option value="resolved" ${item.status==='resolved'?'selected':''}>Resolved</option></select><small class="delivery-note">${item.mail?.delivered ? 'Email delivered to ssaivaraprasad51@gmail.com' : 'Saved in inbox — email relay needs configuration'}</small></div></article>`).join('');
}
async function loadInquiries(){
  inquiryList.innerHTML = '<p class="inquiry-empty">Loading enquiries…</p>';
  try { const response = await fetch('/api/inquiries'); const data = await response.json(); if (!response.ok) throw new Error(data.error); inquiryItems = data.items || []; renderInquiries(); }
  catch (error) {
    inquiryItems = getLocalInquiries();
    if (inquiryItems.length) { renderInquiries(); inquiryList.insertAdjacentHTML('afterbegin','<p class="inquiry-empty">Showing enquiries saved on this device. Start the Content Studio server to view shared inbox submissions and enable email delivery.</p>'); return; }
    inquiryList.innerHTML = '<p class="inquiry-empty">No local enquiries yet. Start the Content Studio server to view the shared inbox and email delivery status.</p>';
  }
}
inquiryNav?.addEventListener('click', event => { event.preventDefault(); history.replaceState(null,'','#inquiries'); showInquiries(true); });
document.querySelector('#backToStudio')?.addEventListener('click', () => { history.replaceState(null,'','#studio'); showInquiries(false); });
document.querySelector('.side-nav a[href="#studio"]')?.addEventListener('click', event => { event.preventDefault(); history.replaceState(null,'','#studio'); showInquiries(false); });
inquiryList?.addEventListener('change', async event => {
  if (event.target.tagName !== 'SELECT') return;
  const card = event.target.closest('.inquiry-card'); const id = card?.dataset.id;
  if (!id) return;
  try { const response = await fetch(`/api/inquiries/${encodeURIComponent(id)}`,{method:'PATCH',headers:{'content-type':'application/json'},body:JSON.stringify({status:event.target.value})}); const data = await response.json(); if (!response.ok) throw new Error(data.error); const item = inquiryItems.find(entry => entry.id === id); if (item) Object.assign(item,data.item); renderInquiries(); }
  catch (error) { document.querySelector('#toast').textContent = error.message || 'Could not update enquiry'; document.querySelector('#toast').classList.add('show'); setTimeout(() => document.querySelector('#toast').classList.remove('show'),3200); }
});
if (location.hash === '#inquiries') showInquiries(true);
