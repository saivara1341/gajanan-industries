(() => {
  const button = document.querySelector('#editGuide');
  const preview = document.querySelector('#sitePreview');
  if (!button || !preview) return;

  const setMode = active => {
    window.adminEditMode = active;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
    button.innerHTML = active ? '<span>✎</span> Edit content' : 'Browse site';
    const doc = preview.contentDocument;
    if (doc) {
      doc.documentElement.toggleAttribute('data-admin-editing', active);
      if (!active) {
        doc.querySelectorAll('[data-cms-hover],[data-cms-selected]').forEach(element => {
          element.removeAttribute('data-cms-hover');
          element.removeAttribute('data-cms-selected');
        });
      }
    }
  };

  // Content studio is in edit mode by default so clicking any element works immediately
  setMode(true);

  button.addEventListener('click', () => {
    setMode(true);
    if (typeof window.openSectionEditor === 'function') {
      window.openSectionEditor();
    }
  });

  preview.addEventListener('load', () => {
    setMode(window.adminEditMode !== false);
  });
})();
