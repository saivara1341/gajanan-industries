(() => {
  const button = document.querySelector('#editGuide');
  const preview = document.querySelector('#sitePreview');
  if (!button || !preview) return;

  const setMode = active => {
    window.adminEditMode = Boolean(active);
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
    button.innerHTML = active ? '<span>✓</span> Editing Mode' : '<span>✎</span> Edit content';
    
    const doc = preview.contentDocument;
    if (doc) {
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

  // Toggle mode on click: edit mode <-> normal cursor
  button.addEventListener('click', () => {
    setMode(!window.adminEditMode);
  });

  preview.addEventListener('load', () => {
    setMode(window.adminEditMode === true);
  });
})();
