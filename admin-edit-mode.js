(() => {
  const button = document.querySelector('#editGuide');
  const preview = document.querySelector('#sitePreview');
  if (!button || !preview) return;
  const setMode = active => {
    window.adminEditMode = active;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
    button.textContent = active ? 'Editing on' : 'Edit content';
    const doc = preview.contentDocument;
    if (doc) {
      doc.documentElement.toggleAttribute('data-admin-editing', active);
      if (!active) doc.querySelectorAll('[data-cms-hover],[data-cms-selected]').forEach(element => element.removeAttribute('data-cms-hover') || element.removeAttribute('data-cms-selected'));
    }
  };
  setMode(false);
  button.addEventListener('click', () => setMode(!window.adminEditMode));
  preview.addEventListener('load', () => setMode(window.adminEditMode));
})();
