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

document.querySelectorAll('[data-pack-view]').forEach(button => {
  button.addEventListener('click', () => {
    const image = document.querySelector('[data-pack-image]');
    const link = document.querySelector('[data-pack-link]');
    if (!image) return;
    image.src = button.dataset.image;
    image.alt = button.dataset.alt;
    if (link) link.href = button.dataset.full;
    document.querySelectorAll('[data-pack-view]').forEach(item => {
      const active = item === button;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-pressed', String(active));
    });
  });
});

const packImage = document.querySelector('[data-pack-image]');
if (packImage) {
  packImage.addEventListener('click', (event) => {
    event.preventDefault();
    const otherViewButton = document.querySelector('[data-pack-view]:not(.is-active)');
    if (otherViewButton) otherViewButton.click();
  });
}

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

const lookupForm = document.querySelector('#labReportLookup');
if (lookupForm) {
  const lookupStatus = document.querySelector('#lab-report-status');
  const normaliseBatch = value => String(value || '').trim().toUpperCase().replace(/\s+/g, '');
  const alphanumericOnly = value => normaliseBatch(value).replace(/[^A-Z0-9]/g, '');

  const VERIFIED_REPORTS = {
    'CB172/26': {
      batchNumber: 'CB172/26',
      product: 'Gajanan Low GI Rice',
      reportDate: '24 September 2026',
      unit: 'Shree Gajanan Industries · Eureka Analytical Services',
      url: '../assets/reports/lab-report-CB172-26.html'
    }
  };

  function displayReport(reportData) {
    const { batchNumber, url } = reportData;
    lookupStatus.className = 'report-status is-success';
    lookupStatus.textContent = `Lab report verified for batch ${batchNumber}. `;
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener';
    link.textContent = 'View laboratory report ↗';
    lookupStatus.append(link);
  }

  lookupForm.elements.batchNumber.addEventListener('input', () => {
    lookupStatus.className = 'report-status';
    lookupStatus.textContent = 'Enter the complete batch number printed on your pouch.';
  });
  lookupForm.addEventListener('submit', async event => {
    event.preventDefault();
    const rawBatch = lookupForm.elements.batchNumber.value;
    const batchNumber = normaliseBatch(rawBatch);
    const alphaBatch = alphanumericOnly(rawBatch);
    const button = lookupForm.querySelector('button');
    if (!batchNumber) return;
    button.disabled = true;
    lookupStatus.className = 'report-status';
    lookupStatus.textContent = 'Checking your batch number…';

    for (const [key, item] of Object.entries(VERIFIED_REPORTS)) {
      if (key === batchNumber || alphanumericOnly(key) === alphaBatch) {
        displayReport(item);
        button.disabled = false;
        return;
      }
    }

    try {
      const response = await fetch('https://xoqpxckowwubeqdtazks.supabase.co/functions/v1/lab-reports', {method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({action:'lookup',batchNumber})});
      const result = await response.json().catch(() => ({}));
      if (normaliseBatch(lookupForm.elements.batchNumber.value) !== batchNumber) return;
      if (response.ok && result.reportUrl) {
        displayReport({ batchNumber, url: result.reportUrl });
        button.disabled = false;
        return;
      }
    } catch (_) {}

    try {
      const res = await fetch('../lab-reports.json');
      if (res.ok) {
        const list = await res.json();
        if (Array.isArray(list)) {
          const match = list.find(item => {
            const itemBatch = normaliseBatch(item.batchNumber);
            return itemBatch === batchNumber || alphanumericOnly(itemBatch) === alphaBatch;
          });
          if (match) {
            displayReport({ batchNumber: match.batchNumber || batchNumber, url: `../${match.reportPath}` });
            button.disabled = false;
            return;
          }
        }
      }
    } catch (_) {}

    lookupStatus.classList.add('is-error');
    lookupStatus.textContent = `No lab report is available yet for batch ${batchNumber}. Please ensure you entered the batch number printed on your pouch, or contact us for assistance.`;
    button.disabled = false;
  });
}

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
