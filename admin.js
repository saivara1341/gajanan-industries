const $ = s => document.querySelector(s), $$ = s => document.querySelectorAll(s);
const preview = $('#sitePreview'), shell = $('#previewShell'), previewViewport = $('#previewViewport'), canvasScroll = document.querySelector('.canvas-scroll');
let edits = {}, publishedEdits = {}, selected = null, hovered = null, boundPreviewDocument = null;
window.adminEditMode = false;

const targetSelector = 'h1,h2,h3,h4,h5,h6,p,a,small,span,strong,b,dd,dt,time,label,option,img,input,textarea,select,button,.rice-product-photo,.featured-photo,.rice-item,.unit-card,.milestone-card,.editorial-page';

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
  if (el.matches?.('.rice-item,.unit-card,.milestone-card,.editorial-page')) return 'Card or section';
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
  if (edit.kind === 'hidden') {
    el.hidden = Boolean(edit.value);
    return;
  }
  if (edit.kind === 'link') {
    el.href = edit.value;
    return;
  }
  const mediaValue = value => {
    if (!String(value).startsWith('uploads/')) return value;
    return /\/manufacturing-unit\/?$/.test(el.ownerDocument.location.pathname) || /\/manufacturing-unit\/index\.html$/.test(el.ownerDocument.location.pathname)
      ? `../${value}`
      : value;
  };
  if (edit.kind === 'image') {
    const value = mediaValue(edit.value);
    if (el.tagName === 'IMG') el.src = value;
    else el.style.backgroundImage = `url("${value.replaceAll('"', '\\"')}")`;
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
      const isManufacturingPage = /\/manufacturing-unit\/?$/.test(doc.location.pathname) || /\/manufacturing-unit\/index\.html$/.test(doc.location.pathname);
      const manufacturingEdit = path.startsWith('manufacturing:');
      if (manufacturingEdit && !isManufacturingPage) return;
      const selector = manufacturingEdit ? path.slice('manufacturing:'.length) : path;
      const el = doc.querySelector(selector);
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
    const response = await fetch('/api/content', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(edits)
    });
    if (!response.ok) throw new Error((await response.json().catch(() => ({}))).error || 'Could not publish the content update.');
    const result = await response.json();
    publishedEdits = { ...edits };
    return result;
  }
}

function describe(el) {
  const text = (el.textContent || el.alt || 'Image').trim().replace(/\s+/g, ' ');
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
    storageKey: window.adminPreviewPageId === 'manufacturing' ? `manufacturing:${pathFor(el)}` : pathFor(el),
    kind: el.matches?.('.rice-item,.unit-card,.milestone-card,.editorial-page') ? 'container' : el.tagName === 'A' ? 'link' : (el.tagName === 'IMG' || background(el) !== 'none') ? 'image' : ['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName) ? 'field' : 'text'
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
  const current = kind === 'link'
    ? el.href
    : kind === 'image'
    ? (el.tagName === 'IMG' ? el.currentSrc : background(el).match(/url\(["']?(.*?)["']?\)/)?.[1] || '')
    : kind === 'field'
      ? (el.tagName === 'SELECT' ? el.innerHTML : el.placeholder || '')
      : kind === 'container' ? '' : el.innerHTML;

  $('#editor').innerHTML = `
    <div class="editor-header">
      <h3>Edit selected component</h3>
      <span>UI 02</span>
    </div>
    <div class="element-path">${path}</div>
    ${kind === 'link' ? `
      <div class="field">
        <label>LINK DESTINATION</label>
        <input id="elementValue" type="url" placeholder="https://..." value="${current}">
      </div>
      <div class="editor-note">This updates the selected footer icon or website link without changing its icon.</div>
    ` : kind === 'image' ? `
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
    ` : kind === 'container' ? `
      <div class="editor-note">This is a complete card or section. You can remove it from the published website, or select text or an image inside it to edit only that part.</div>
    ` : `
      <div class="field">
        <label>CONTENT TEXT</label>
        <textarea id="elementValue" rows="${Math.max(4, Math.min(10, (el.textContent.length / 35 | 0) + 3))}" placeholder="Write the text visitors should see"></textarea>
      </div>
    `}
    ${kind === 'container' ? '' : '<button class="apply-edit" id="applyEdit">Update website</button>'}
    <button class="remove-edit" id="removeEdit" type="button">Remove component</button>
    <div class="editor-note">Write normal text only — no code is needed. Use a new line when you want a line break.</div>
  `;

  const input = $('#elementValue');
  if (input) input.value = kind === 'text' ? el.textContent : current;

  if (kind === 'image') {
    $('#imageUpload').addEventListener('change', e => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => { input.value = reader.result; };
      reader.readAsDataURL(file);
    });
  }

  $('#applyEdit')?.addEventListener('click', async () => {
    const value = (kind === 'image' || kind === 'field' || kind === 'link') ? input.value : input.value.replaceAll('\n', '<br>');
    if (!value.trim()) return;
    const edit = { kind, value };
    setValue(el, edit);
    edits[selected.storageKey] = edit;
    let publication;
    try {
      publication = await persist();
    } catch (error) {
      $('#toast').textContent = error.message || 'Could not publish this content update.';
      $('#toast').classList.add('show');
      setTimeout(() => $('#toast').classList.remove('show'), 4500);
      return;
    }
    $('#savedState').textContent = publication?.published ? 'Published to GitHub' : 'Content saved';
    $('#toast').textContent = publication?.message || 'Content updated successfully!';
    $('#toast').classList.add('show');
    setTimeout(() => $('#toast').classList.remove('show'), 2400);
  });

  $('#removeEdit')?.addEventListener('click', async () => {
    if (!confirm('Remove this component from the published website? You can use Discard changes before publishing to restore it.')) return;
    const edit = { kind: 'hidden', value: true };
    setValue(el, edit);
    edits[selected.storageKey] = edit;
    let publication;
    try { publication = await persist(); } catch (error) { $('#toast').textContent = error.message || 'Could not publish this removal.'; $('#toast').classList.add('show'); return; }
    $('#savedState').textContent = publication?.published ? 'Published to GitHub' : 'Component marked for removal';
    $('#toast').textContent = publication?.message || 'Component removed from the preview.';
    $('#toast').classList.add('show');
    $('#clearSelection').click();
    setTimeout(() => $('#toast').classList.remove('show'), 3000);
  });
}

function bindPreview() {
  const doc = preview.contentDocument;
  if (!doc || boundPreviewDocument === doc) return;
  if (/\/admin\.html$/.test(doc.location.pathname)) {
    preview.src = 'index.html';
    return;
  }
  boundPreviewDocument = doc;
  applyStored(doc);

  const style = doc.createElement('style');
  style.textContent = 'html[data-admin-editing],html[data-admin-editing] *{cursor:crosshair!important}html[data-admin-editing] [data-cms-hover]{outline:2px dashed #dce780!important;outline-offset:3px!important}html[data-admin-editing] [data-cms-selected]{outline:3px solid #dce780!important;outline-offset:3px!important}#cmsHoverNote{position:fixed;z-index:2147483647;display:none;max-width:215px;padding:7px 9px;border-radius:4px;background:#263d2a;color:#fff;font:11px/1.35 Arial,sans-serif;box-shadow:0 6px 16px #0005;pointer-events:none}';
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

window.bindAdminPreview = bindPreview;

function setAdminEditMode(active) {
  const enabled = Boolean(active);
  window.adminEditMode = enabled;

  const editButton = $('#editGuide');
  editButton?.classList.toggle('is-active', enabled);
  editButton?.setAttribute('aria-pressed', String(enabled));
  if (editButton) editButton.innerHTML = enabled ? '<span>✓</span> Editing enabled' : '<span>✎</span> Edit content';
  document.querySelector('.top-actions')?.classList.toggle('editing-active', enabled);

  const savedState = $('#savedState');
  if (savedState) savedState.textContent = enabled ? 'Selector active — click any text, image, or button to edit it' : 'Browse mode';

  if (enabled) bindPreview();
  const doc = preview.contentDocument;
  if (!doc || /\/admin\.html$/.test(doc.location.pathname)) return;
  doc.documentElement.toggleAttribute('data-admin-editing', enabled);
  doc.getElementById('cmsHoverNote')?.style && (doc.getElementById('cmsHoverNote').style.display = 'none');

  if (!enabled) {
    doc.querySelectorAll('[data-cms-hover],[data-cms-selected]').forEach(element => {
      element.removeAttribute('data-cms-hover');
      element.removeAttribute('data-cms-selected');
    });
    $('#clearSelection')?.click();
  }
}

window.setAdminEditMode = setAdminEditMode;
$('#editGuide')?.addEventListener('click', event => {
  event.preventDefault();
  event.stopPropagation();
  setAdminEditMode(!window.adminEditMode);
});

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
preview.addEventListener('load', () => setAdminEditMode(window.adminEditMode === true));
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
  if (!confirm('Publish these saved content changes to GitHub and update the live website?')) return;
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
    document.querySelector('.top-actions')?.classList.remove('has-edits');
    $('#savedState').textContent = 'Published to GitHub';
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
    window.setAdminEditMode?.(false);
    edits = { ...publishedEdits };
    try {
      localStorage.removeItem('gajanan-admin-content');
      preview.contentWindow.location.reload();
      $('#clearSelection').click();
      if ($('#savedState')) $('#savedState').textContent = 'All edits discarded';
    } catch (error) {
      $('#toast').textContent = error.message;
      $('#toast').classList.add('show');
    }
  }
});

$('#openSite').addEventListener('click', () => window.open('index.html', '_blank'));

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
      publishedEdits = { ...data };
      edits = { ...data, ...edits };
      $('#savedState').textContent = 'Content loaded';
      if (preview.contentDocument?.readyState === 'complete') applyStored(preview.contentDocument);
    }
  })
  .catch(() => {
    $('#savedState').textContent = 'Local editing ready';
  });
