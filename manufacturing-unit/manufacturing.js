const filters = [...document.querySelectorAll('[data-filter]')];
const cards = [...document.querySelectorAll('[data-unit]')];
const grid = document.querySelector('.unit-grid');
const count = document.querySelector('#directory-count');

function showUnits(value) {
  filters.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === value)));
  cards.forEach(card => { card.hidden = value !== 'all' && card.dataset.unit !== value; });
  grid.classList.toggle('is-filtered', value !== 'all');
  count.textContent = value === 'all' ? 'Showing all 3 units' : 'Showing unit ' + value.toUpperCase();
}
filters.forEach(button => button.addEventListener('click', () => showUnits(button.dataset.filter)));

function syncBatchHash() {
  const match = /^#unit-([abc])$/.exec(location.hash);
  if (match) showUnits(match[1]);
}
window.addEventListener('hashchange', syncBatchHash);
syncBatchHash();

const toast = document.querySelector('.toast');
let toastTimer;
function notify(message) {
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.hidden = false;
  toastTimer = setTimeout(() => { toast.hidden = true; toast.textContent = ''; }, 2500);
}
document.querySelectorAll('[data-licence]').forEach(button => {
  button.addEventListener('click', async () => {
    let copied = false;
    try {
      await navigator.clipboard.writeText(button.dataset.licence);
      copied = true;
    } catch {
      const area = document.createElement('textarea');
      area.value = button.dataset.licence;
      area.style.position = 'fixed';
      area.style.opacity = '0';
      document.body.append(area);
      area.select();
      copied = document.execCommand('copy');
      area.remove();
      button.focus({ preventScroll: true });
    }
    notify(copied ? 'Licence number copied' : 'Unable to copy. Please select the licence number to copy it.');
  });
});

const form = document.querySelector('#unitEnquiryForm');
const countryField = document.querySelector('#country-field');
const country = document.querySelector('#enquiry-country');
function syncEnquiryType() {
  const isExport = form.elements.type.value === 'export';
  countryField.hidden = !isExport;
  country.required = isExport;
  country.disabled = !isExport;
}
form.elements.type.addEventListener('change', syncEnquiryType);
syncEnquiryType();

form.addEventListener('submit', async event => {
  event.preventDefault();
  const status = form.querySelector('.form-status');
  const button = form.querySelector('[type=submit]');
  const data = Object.fromEntries(new FormData(form));
  const label = button.innerHTML;
  button.disabled = true;
  button.textContent = 'Sending…';
  status.textContent = '';
  try {
    const response = await fetch('https://xoqpxckowwubeqdtazks.supabase.co/functions/v1/submit-enquiry', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'Unable to send enquiry.');
    form.reset();
    syncEnquiryType();
    status.textContent = 'Thank you — your enquiry has been received.';
  } catch {
    status.textContent = 'Your enquiry could not be sent. Please try again. Your details are still here.';
  } finally {
    button.disabled = false;
    button.innerHTML = label;
  }
});

fetch('../admin-content.json')
  .then(response => response.ok ? response.json() : {})
  .then(edits => Object.entries(edits).forEach(([key, edit]) => {
    if (!key.startsWith('manufacturing:')) return;
    try {
      const element = document.querySelector(key.slice('manufacturing:'.length));
      if (!element) return;
      if (edit.kind === 'hidden') {
        element.hidden = Boolean(edit.value);
      } else if (edit.kind === 'link') {
        const link = typeof edit.value === 'string' ? { href: edit.value } : (edit.value || {});
        if (link.href) element.href = link.href;
        if (Object.hasOwn(link, 'label') && link.label.trim()) element.textContent = link.label;
        if (link.color) element.style.color = link.color;
        if (link.backgroundColor) element.style.backgroundColor = link.backgroundColor;
      } else if (edit.kind === 'image') {
        const value = String(edit.value).startsWith('uploads/') ? `../${edit.value}` : edit.value;
        if (element.tagName === 'IMG') element.src = value;
        else element.style.backgroundImage = `url("${value.replaceAll('"', '\\"')}")`;
      } else if (edit.kind === 'field') {
        if (element.tagName === 'SELECT') element.innerHTML = edit.value;
        else {
          element.placeholder = edit.value;
          element.setAttribute('aria-label', edit.value);
        }
      } else {
        element.innerHTML = edit.value;
      }
    } catch (_) {}
  }))
  .catch(() => {});
