const $ = s => document.querySelector(s), $$ = s => document.querySelectorAll(s);
const preview = $('#sitePreview'), shell = $('#previewShell'), previewViewport = $('#previewViewport'), canvasScroll = document.querySelector('.canvas-scroll');
let edits = {}, selected = null, hovered = null, boundPreviewDocument = null;
window.adminEditMode = false;

const targetSelector = 'h1,h2,h3,h4,h5,h6,p,a,small,span,strong,b,dd,dt,time,label,option,img,input,textarea,select,button,.rice-product-photo,.featured-photo';

function pathFor(el) {
  if (el.id) return '#' + CSS.escape(el.id);
  const path = [];
  for (let node = el; node && node.tagName?.toLowerCase() !== 'body' && node.tagName?.toLowerCase() !== 'html'; node = node.parentElement) {
    let part = node.tagName.toLowerCase();
    const matching = [...node.parentElement.children].filter(x => x.tagName === node.tagName);
    if (matching.length > 1) part += `:nth-of-type(${matching.indexOf(node) + 1})`;
    path.unshift(part);
  }
  return path.join(' > ');
}

function background(el) {
  try {
    return el.ownerDocument.defaultView.getComputedStyle(el).backgroundImage;
  } catch (_) {
    return 'none';
  }
}

function typeOf(el) {
  if (el.tagName === 'IMG') return 'Image';
  if (['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName)) return 'Form field';
  if (['H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(el.tagName)) return 'Heading';
  if (el.tagName === 'P') return 'Paragraph';
  if (el.tagName === 'A') return 'Link or button';
  if (background(el) !== 'none') return 'Background image';
  return 'Text or data';
}

function editable(el) {
  return window.adminEditMode !== false && el && !['SCRIPT', 'STYLE', 'SVG', 'PATH'].includes(el.tagName) && (el.matches(targetSelector) || background(el) !== 'none');
}

function isSection(el) {
  return Boolean(el?.matches?.(sectionSelector));
}

function setValue(el, edit) {
  if (edit.kind === 'image') {
    if (el.tagName === 'IMG') el.src = edit.value;
    else el.style.backgroundImage = `url("${edit.value.replaceAll('"', '\\"')}")`;
  } else if (edit.kind === 'field') {
    if (el.tagName === 'SELECT') el.innerHTML = edit.value;
    else {
      el.placeholder = edit.value;
      el.setAttribute('aria-label', edit.value);
    }
  } else {
    el.innerHTML = edit.value;
  }
}

function applyStored(doc) {
  Object.entries(edits).forEach(([path, edit]) => {
    try {
      const el = doc.querySelector(path);
      if (el) setValue(el, edit);
    } catch (_) {}
  });
}

async function persist() {
  try {
    localStorage.setItem('gajanan-admin-content', JSON.stringify(edits));
  } catch (e) {
    console.warn('LocalStorage save failed:', e);
  }

  // Only attempt background server sync if running locally on the specific node admin server (port 4173)
  if (location.hostname === 'localhost' && location.port === '4173') {
    try {
      await fetch('/api/content', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(edits)
      });
    } catch (_) {}
  }
}

function describe(el) {
  const text = (el.innerText || el.alt || 'Image').trim().replace(/\s+/g, ' ');
  return text.length > 64 ? text.slice(0, 64) + '…' : text;
}

function showHover(el, event) {
  if (window.adminEditMode === false) el = null;
  const doc = preview.contentDocument;
  if (!doc) return;
  if (hovered === el) return;
  doc.querySelectorAll('[data-cms-hover]').forEach(x => x.removeAttribute('data-cms-hover'));
  hovered = el;
  if (!el) return;
  el.setAttribute('data-cms-hover', '');
  const note = doc.getElementById('cmsHoverNote');
  if (note) {
    note.textContent = `${typeOf(el)} · Click to edit`;
    note.style.display = 'block';
    note.style.left = `${Math.min(event.clientX + 14, doc.documentElement.clientWidth - 230)}px`;
    note.style.top = `${event.clientY + 14}px`;
  }
}

function select(el) {
  if (!editable(el)) return;
  const doc = preview.contentDocument;
  if (doc) {
    doc.querySelectorAll('[data-cms-selected]').forEach(x => x.removeAttribute('data-cms-selected'));
    el.setAttribute('data-cms-selected', '');
  }
  selected = {
    el,
    path: pathFor(el),
    kind: (el.tagName === 'IMG' || background(el) !== 'none') ? 'image' : ['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName) ? 'field' : 'text'
  };
  $('#componentName').textContent = typeOf(el);
  $('#selectionCard').innerHTML = `<span class="selection-icon">✓</span><div><b>${typeOf(el)} selected</b><small>${describe(el) || 'Ready to update.'}</small></div>`;
  document.querySelector('.editor-panel')?.classList.add('is-open');
  renderEditor();
}

function renderEditor() {
  if (!selected) {
    $('#editor').innerHTML = '';
    return;
  }
  const { el, path, kind } = selected;
  const current = kind === 'image'
    ? (el.tagName === 'IMG' ? el.currentSrc : background(el).match(/url\(["']?(.*?)["']?\)/)?.[1] || '')
    : kind === 'field'
      ? (el.tagName === 'SELECT' ? el.innerHTML : el.placeholder || '')
      : el.innerHTML;

  $('#editor').innerHTML = `
    <div class="editor-header">
      <h3>Edit selected component</h3>
      <span>UI 02</span>
    </div>
    <div class="element-path">${path}</div>
    ${kind === 'image' ? `
      <div class="image-field">
        <img src="${current}" alt="Selected media">
        <div class="image-info"><b>Replace this image</b><small>Paste an image URL or upload a file.</small></div>
      </div>
      <div class="field">
        <label>IMAGE URL <span>OPTIONAL</span></label>
        <input id="elementValue" type="url" placeholder="https://..." value="${current}">
      </div>
      <div class="upload-row"><input id="imageUpload" type="file" accept="image/*"></div>
    ` : kind === 'field' ? `
      <div class="field">
        <label>${el.tagName === 'SELECT' ? 'OPTIONS' : 'FIELD LABEL'}</label>
        <textarea id="elementValue" rows="5"></textarea>
      </div>
    ` : `
      <div class="field">
        <label>CONTENT TEXT</label>
        <textarea id="elementValue" rows="${Math.max(4, Math.min(10, (el.innerText.length / 35 | 0) + 3))}" placeholder="Write the text visitors should see"></textarea>
      </div>
    `}
    <button class="apply-edit" id="applyEdit">Update website</button>
    <div class="editor-note">Write normal text only — no code is needed. Use a new line when you want a line break.</div>
  `;

  const input = $('#elementValue');
  input.value = kind === 'text' ? el.innerText : current;

  if (kind === 'image') {
    $('#imageUpload').addEventListener('change', e => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => { input.value = reader.result; };
      reader.readAsDataURL(file);
    });
  }

  $('#applyEdit').addEventListener('click', async () => {
    const value = (kind === 'image' || kind === 'field') ? input.value : input.value.replaceAll('\n', '<br>');
    if (!value.trim()) return;
    const edit = { kind, value };
    setValue(el, edit);
    edits[path] = edit;
    try {
      await persist();
    } catch (_) {}
    $('#savedState').textContent = 'Website updated';
    $('#toast').textContent = 'Content updated successfully!';
    $('#toast').classList.add('show');
    setTimeout(() => $('#toast').classList.remove('show'), 2400);
  });
}

function bindPreview() {
  const doc = preview.contentDocument;
  if (!doc || boundPreviewDocument === doc) return;
  boundPreviewDocument = doc;
  applyStored(doc);

  const style = doc.createElement('style');
  style.textContent = 'html[data-admin-editing] [data-cms-hover]{outline:2px dashed #dce780!important;outline-offset:3px!important;cursor:crosshair!important}html[data-admin-editing] [data-cms-selected]{outline:3px solid #dce780!important;outline-offset:3px!important;cursor:crosshair!important}#cmsHoverNote{position:fixed;z-index:2147483647;display:none;max-width:215px;padding:7px 9px;border-radius:4px;background:#263d2a;color:#fff;font:11px/1.35 Arial,sans-serif;box-shadow:0 6px 16px #0005;pointer-events:none}';
  doc.head.append(style);

  const note = doc.createElement('div');
  note.id = 'cmsHoverNote';
  doc.body.append(note);

  const targetFromEvent = e => e.target instanceof doc.defaultView.Element ? e.target.closest(targetSelector) : null;
  doc.addEventListener('mousemove', e => {
    if (!window.adminEditMode) {
      if (hovered) {
        doc.querySelectorAll('[data-cms-hover]').forEach(x => x.removeAttribute('data-cms-hover'));
        hovered = null;
      }
      note.style.display = 'none';
      return;
    }
    showHover(targetFromEvent(e), e);
  });
  doc.addEventListener('mouseleave', () => { note.style.display = 'none'; showHover(null, {}); });
  doc.addEventListener('click', e => {
    if (!window.adminEditMode) return; // In normal browse mode, do nothing - links work normally!
    const el = targetFromEvent(e);
    if (editable(el)) {
      e.preventDefault();
      e.stopPropagation();
      note.style.display = 'none';
      select(el);
    }
  }, true);
}

function sizePreview() {
  if (!previewViewport || !canvasScroll) return;
  const mobile = shell.classList.contains('mobile');
  if (mobile) {
    previewViewport.style.width = '390px';
    previewViewport.style.height = `${Math.max(500, window.innerHeight - 230)}px`;
    return;
  }
  const available = Math.max(320, canvasScroll.clientWidth - 44), scale = Math.min(1, available / 1440);
  shell.style.setProperty('--desktop-preview-scale', scale);
  previewViewport.style.width = `${1440 * scale}px`;
  previewViewport.style.height = `${900 * scale}px`;
}

preview.addEventListener('load', bindPreview);
if (preview.contentDocument?.readyState === 'complete') bindPreview();

$$('.device').forEach(btn => btn.addEventListener('click', () => {
  $$('.device').forEach(x => x.classList.toggle('active', x === btn));
  shell.className = `preview-shell ${btn.dataset.device}`;
  sizePreview();
}));

window.addEventListener('resize', sizePreview);
new ResizeObserver(sizePreview).observe(canvasScroll);
sizePreview();

$('#clearSelection').addEventListener('click', () => {
  if (selected) selected.el.removeAttribute('data-cms-selected');
  selected = null;
  document.querySelector('.editor-panel')?.classList.remove('is-open');
  $('#componentName').textContent = 'Select a component';
  $('#selectionCard').innerHTML = '<span class="selection-icon">⌖</span><div><b>Click an element in the preview</b><small>Headings, copy, buttons and images can all be edited live.</small></div>';
  renderEditor();
});

$('#publishBtn')?.addEventListener('click', async () => {
  try {
    await persist();
    const isLocalServer = ['localhost', '127.0.0.1'].includes(location.hostname) && location.port === '4173';
    if (!isLocalServer) {
      const blob = new Blob([JSON.stringify(edits, null, 2)], { type: 'application/json' });
      const dlUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = dlUrl;
      a.download = 'admin-content.json';
      a.click();
      URL.revokeObjectURL(dlUrl);
      $('#toast').textContent = 'Edits saved! Downloaded admin-content.json for GitHub deployment.';
      $('#toast').classList.add('show');
      setTimeout(() => $('#toast').classList.remove('show'), 4000);
      return;
    }
    const response = await fetch('/api/publish', { method: 'POST' });
    let result = {};
    try {
      result = await response.json();
    } catch (_) {
      throw new Error('Server returned non-JSON response.');
    }
    if (!response.ok) throw new Error(result.error || 'Publish failed');
    $('#toast').textContent = result.message || 'Changes published to GitHub!';
    $('#toast').classList.add('show');
    setTimeout(() => $('#toast').classList.remove('show'), 3500);
  } catch (error) {
    $('#toast').textContent = error.message || 'GitHub publish failed';
    $('#toast').classList.add('show');
    setTimeout(() => $('#toast').classList.remove('show'), 4500);
  }
});

$('#resetBtn')?.addEventListener('click', async () => {
  if (confirm('Discard all saved content updates?')) {
    edits = {};
    try {
      localStorage.removeItem('gajanan-admin-content');
      await persist();
      preview.contentWindow.location.reload();
      $('#clearSelection').click();
      if ($('#savedState')) $('#savedState').textContent = 'All edits discarded';
    } catch (error) {
      $('#toast').textContent = error.message;
      $('#toast').classList.add('show');
    }
  }
});

$('#openSite').addEventListener('click', () => window.open('./', '_blank'));

try {
  const localData = JSON.parse(localStorage.getItem('gajanan-admin-content') || '{}');
  if (localData && typeof localData === 'object' && Object.keys(localData).length > 0) {
    edits = localData;
    $('#savedState').textContent = 'Saved edits loaded';
    if (preview.contentDocument?.readyState === 'complete') applyStored(preview.contentDocument);
  }
} catch (_) {}

fetch('admin-content.json')
  .then(response => response.ok ? response.json() : null)
  .then(data => {
    if (data && typeof data === 'object') {
      edits = { ...data, ...edits };
      $('#savedState').textContent = 'Content loaded';
      if (preview.contentDocument?.readyState === 'complete') applyStored(preview.contentDocument);
    }
  })
  .catch(() => {
    $('#savedState').textContent = 'Local editing ready';
  });
