const accessPanel = document.querySelector('#access');
const accessNav = document.querySelector('#accessNav');
const accessList = document.querySelector('#accessList');
const studioWorkspaceForAccess = document.querySelector('.workspace');
const inquiriesPanelForAccess = document.querySelector('#inquiries');

function showAccess(open) {
  accessPanel.hidden = !open;
  if (open) { studioWorkspaceForAccess.hidden = true; inquiriesPanelForAccess.hidden = true; accessNav.classList.add('active'); document.querySelector('#inquiriesNav').classList.remove('active'); document.querySelector('.side-nav a[href="#studio"]').classList.remove('active'); loadAccess(); }
}
function accessEscape(value) { return String(value ?? '').replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character])); }
async function loadAccess() {
  try { const response = await fetch('/api/admin/users'); const data = await response.json(); if (!response.ok) throw new Error(data.error); accessList.innerHTML = data.items.map(item => `<article class="access-user"><div><b>${accessEscape(item.email)}</b><small>${item.role === 'owner' ? 'Owner — can manage team access' : 'Admin — can edit content and view enquiries'}</small></div>${item.role === 'owner' ? '<span class="access-owner">Owner</span>' : `<button class="secondary" data-remove="${accessEscape(item.email)}">Remove access</button>`}</article>`).join('') || '<p class="inquiry-empty">No additional admins have access.</p>'; }
  catch (error) { accessList.innerHTML = `<p class="inquiry-empty">${accessEscape(error.message)}</p>`; }
}
accessNav?.addEventListener('click', event => { event.preventDefault(); history.replaceState(null,'','#access'); showAccess(true); });
document.querySelector('#backFromAccess')?.addEventListener('click', () => { history.replaceState(null,'','#studio'); showAccess(false); studioWorkspaceForAccess.hidden = false; document.querySelector('.side-nav a[href="#studio"]').classList.add('active'); });
document.querySelector('#accessForm')?.addEventListener('submit', async event => { event.preventDefault(); const form = event.currentTarget; const fields = new FormData(form); try { const response = await fetch('/api/admin/users',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({email:fields.get('email'),password:fields.get('password')})}); const result = await response.json(); if (!response.ok) throw new Error(result.error); form.reset(); loadAccess(); document.querySelector('#toast').textContent = 'Admin access granted.'; document.querySelector('#toast').classList.add('show'); setTimeout(() => document.querySelector('#toast').classList.remove('show'),2600); } catch (error) { alert(error.message || 'Could not add admin.'); } });
accessList?.addEventListener('click', async event => { const email = event.target.dataset.remove; if (!email || !confirm(`Remove admin access for ${email}?`)) return; const response = await fetch(`/api/admin/users/${encodeURIComponent(email)}`,{method:'DELETE'}); if (!response.ok) { const result=await response.json(); alert(result.error); return; } loadAccess(); });
if (location.hash === '#access') showAccess(true);
