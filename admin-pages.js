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
    ['manufacturing-unit/', 'manufacturing', 'Manufacturing Units']
  ];
  const renderPages = customPages => {
    const allPages = [...builtInPages, ...customPages.map(page => [`editorial.html?page=${encodeURIComponent(page.slug)}`, `custom-${page.slug}`, page.title])];
    switcher.innerHTML = `${allPages.map(([url,id,label],index) => `<button class="${index === 0 ? 'active' : ''}" data-page="${url}" data-page-id="${id}">${label}</button>`).join('')}<button class="page-add" type="button" id="addPage">+ Add page</button>`;
  };
  renderPages([]);
  pageToolbar.prepend(switcher);
  window.adminPreviewPageId = 'website';

  switcher.addEventListener('click', async event => {
    const addButton = event.target.closest('#addPage');
    if (addButton) {
      const title = prompt('New page name (for example: Sustainability)');
      if (!title?.trim()) return;
      try {
        const response = await fetch('/api/pages', {method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({title})});
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || 'Could not create page.');
        const pages = await fetch('/api/pages').then(r => r.json());
        renderPages(pages.items || []);
        switcher.querySelector(`[data-page-id="custom-${result.item.slug}"]`)?.click();
        document.querySelector('#toast').textContent = result.message || 'New page created and published.';
        document.querySelector('#toast').classList.add('show');
      } catch (error) {
        document.querySelector('#toast').textContent = error.message || 'Could not create page.';
        document.querySelector('#toast').classList.add('show');
      }
      return;
    }
    const button = event.target.closest('button[data-page]');
    if (!button) return;
    switcher.querySelectorAll('button[data-page]').forEach(item => item.classList.toggle('active', item === button));
    window.adminPreviewPageId = button.dataset.pageId || 'website';
    preview.src = button.dataset.page;
    document.querySelector('#clearSelection').click();
  });

  fetch('/api/pages').then(response => response.ok ? response.json() : {items:[]}).then(data => renderPages(data.items || [])).catch(() => {});
}
