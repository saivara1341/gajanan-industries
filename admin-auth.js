(() => {
  const key = 'gajanan-admin-session';
  const originalFetch = window.fetch.bind(window);
  const token = () => sessionStorage.getItem(key);
  window.fetch = (resource, init = {}) => {
    const url = typeof resource === 'string' ? resource : resource.url;
    if (!url.includes('/api/') || url === '/api/auth/unlock') return originalFetch(resource, init);
    const headers = new Headers(init.headers || {});
    if (token()) headers.set('authorization', `Bearer ${token()}`);
    return originalFetch(resource, { ...init, headers });
  };
  const overlay = document.querySelector('#loginOverlay');
  const form = document.querySelector('#loginForm');
  const error = document.querySelector('#loginError');
  const show = () => { overlay.hidden = false; document.body.classList.add('login-required'); };
  const hide = () => { overlay.hidden = true; document.body.classList.remove('login-required'); };
  window.gajananAdminSession = { token, show, hide, signOut: () => { sessionStorage.removeItem(key); show(); } };
  if (token() || document.cookie.includes('gajanan_admin_open=1')) hide(); else show();
  form?.addEventListener('submit', () => { error.textContent = 'Opening portal…'; form.querySelector('button').disabled = true; });
})();
