(() => {
  const button = document.querySelector('#editGuide');
  const preview = document.querySelector('#sitePreview');
  if (!button || !preview) return;

  const setMode = active => {
    window.adminEditMode = Boolean(active);
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
    button.innerHTML = active ? '<span>✓</span> Editing enabled' : '<span>✎</span> Edit content';

    const savedState = document.querySelector('#savedState');
    if (savedState) savedState.textContent = active ? 'Editing enabled — select an item in the preview' : 'Browse mode';
    
    const doc = preview.contentDocument;
    if (doc && !/\/admin\.html$/.test(doc.location.pathname)) {
      doc.documentElement.toggleAttribute('data-admin-editing', active);
      const note = doc.getElementById('cmsHoverNote');
      if (note) note.style.display = 'none';

      if (!active) {
        doc.querySelectorAll('[data-cms-hover],[data-cms-selected]').forEach(element => {
          element.removeAttribute('data-cms-hover');
          element.removeAttribute('data-cms-selected');
        });
        // Close sidebar editor if open
        const clearBtn = document.querySelector('#clearSelection');
        if (clearBtn) clearBtn.click();
      }
    }
  };

  // Start in normal browse mode with normal cursor
  window.adminEditMode = false;
  setMode(false);
  window.setAdminEditMode = setMode;

  // Toggle mode on click: edit mode <-> normal cursor
  button.addEventListener('click', event => {
    event.preventDefault();
    event.stopPropagation();
    setMode(!window.adminEditMode);
  });

  preview.addEventListener('load', () => {
    setMode(window.adminEditMode === true);
  });
})();
