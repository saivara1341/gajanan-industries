const pageToolbar = document.querySelector('.canvas-toolbar');

if (pageToolbar) {
  const switcher = document.createElement('div');
  switcher.className = 'page-switcher';
  const builtInPages = [
    ['index.html', 'website', 'Website'],
    ['editorial.html?page=blogs', 'blogs', 'Blogs'],
    ['editorial.html?page=culture', 'culture', 'Culture'],
    ['editorial.html?page=careers', 'careers', 'Careers'],
    ['editorial.html?page=women', 'women', 'Women at Work'],
    ['manufacturing-unit/', 'manufacturing', 'Manufacturing Units'],
    ['lowgi/', 'lab-report-lookup', 'Quality & Batch']
  ];
  const renderPages = customPages => {
    const allPages = [...builtInPages, ...customPages.map(page => [`editorial.html?page=${encodeURIComponent(page.slug)}`, `custom-${page.slug}`, page.title])];
    switcher.innerHTML = allPages.map(([url,id,label],index) => `<button class="${index === 0 ? 'active' : ''}" data-page="${url}" data-page-id="${id}">${label}</button>`).join('');
  };
  renderPages([]);
  pageToolbar.prepend(switcher);
  window.adminPreviewPageId = 'website';

  switcher.addEventListener('click', async event => {
    const button = event.target.closest('button[data-page]');
    if (!button) return;
    switcher.querySelectorAll('button[data-page]').forEach(item => item.classList.toggle('active', item === button));
    window.adminPreviewPageId = button.dataset.pageId || 'website';
    preview.src = button.dataset.page;
    document.querySelector('#clearSelection').click();
  });

  fetch('/api/pages').then(response => response.ok ? response.json() : {items:[]}).then(data => renderPages(data.items || [])).catch(() => {});
}
