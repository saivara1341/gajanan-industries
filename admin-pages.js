const pageToolbar = document.querySelector('.canvas-toolbar');

if (pageToolbar) {
  const switcher = document.createElement('div');
  switcher.className = 'page-switcher';
  switcher.innerHTML = `
    <button class="active" data-page="index.html" data-page-id="website">Website</button>
    <button data-page="editorial.html?page=blogs" data-page-id="blogs">Blogs</button>
    <button data-page="editorial.html?page=culture" data-page-id="culture">Culture</button>
    <button data-page="editorial.html?page=careers" data-page-id="careers">Careers</button>
    <button data-page="editorial.html?page=women" data-page-id="women">Women at Work</button>
    <button data-page="manufacturing-unit/" data-page-id="manufacturing">Manufacturing Units</button>`;
  pageToolbar.prepend(switcher);
  window.adminPreviewPageId = 'website';

  switcher.addEventListener('click', event => {
    const button = event.target.closest('button[data-page]');
    if (!button) return;
    switcher.querySelectorAll('button').forEach(item => item.classList.toggle('active', item === button));
    window.adminPreviewPageId = button.dataset.pageId || 'website';
    preview.src = button.dataset.page;
    document.querySelector('#clearSelection').click();
  });
}
