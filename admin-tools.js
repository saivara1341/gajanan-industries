(() => {
  const guide = document.querySelector('#studioGuide');
  document.querySelector('#editGuide')?.addEventListener('click', () => { guide.hidden = false; });
  document.querySelector('#closeGuide')?.addEventListener('click', () => { guide.hidden = true; });

  const storageKey = 'gajanan-admin-products';
  const dialog = document.createElement('dialog');
  dialog.className = 'product-manager';
  dialog.innerHTML = '<header><div><p>CATALOGUE MANAGER</p><h2>Products</h2></div><button type="button" data-close>×</button></header><div class="product-manager-body"><aside><button type="button" class="product-add">+ Add product</button><div class="product-list"></div></aside><form class="product-form"><p>Select a product or add a new one.</p></form></div>';
  document.body.append(dialog);
  const list = dialog.querySelector('.product-list');
  const form = dialog.querySelector('.product-form');
  let products = [], active = null;
  const localProducts = () => { try { const data = JSON.parse(localStorage.getItem(storageKey) || '[]'); return Array.isArray(data) ? data : []; } catch { return []; } };
  const saveProducts = async () => {
    if (location.protocol === 'file:') { localStorage.setItem(storageKey, JSON.stringify(products)); return; }
    const response = await fetch('/api/products', { method:'PUT', headers:{'content-type':'application/json'}, body:JSON.stringify({items:products}) });
    if (!response.ok) throw new Error('Could not save products.');
  };
  const renderForm = () => {
    if (active === null) { form.innerHTML = '<p>Select a product on the left, or create a new product.</p>'; return; }
    const item = products[active];
    form.innerHTML = '<label>CATALOGUE <select name="group"><option value="domestic">Domestic</option><option value="export">Export</option></select></label><label>PRODUCT NAME<input name="name" required></label><label>DESCRIPTION<textarea name="description" rows="4"></textarea></label><label>IMAGE PATH OR URL<input name="image" placeholder="uploads/product.png"></label><label>PRODUCT DETAILS<textarea name="specification" rows="3"></textarea></label><div class="product-form-actions"><button type="submit">Save product</button><button type="button" class="product-delete">Delete</button></div>';
    form.group.value = item.group || 'domestic'; form.name.value = item.name || ''; form.description.value = item.description || ''; form.image.value = item.image || ''; form.specification.value = item.specification || '';
    form.querySelector('.product-delete').addEventListener('click', async () => { if (!confirm(`Delete ${item.name || 'this product'}?`)) return; products.splice(active, 1); active = null; await saveProducts(); renderList(); renderForm(); });
  };
  const renderList = () => { list.innerHTML = ''; products.forEach((item, index) => { const button = document.createElement('button'); button.type = 'button'; button.className = index === active ? 'active' : ''; button.innerHTML = `<small>${item.group || 'domestic'}</small><b>${item.name || 'Untitled product'}</b>`; button.addEventListener('click', () => { active = index; renderList(); renderForm(); }); list.append(button); }); };
  dialog.querySelector('.product-add').addEventListener('click', () => { products.push({group:'domestic',name:'New rice product',description:'',image:'',specification:''}); active = products.length - 1; renderList(); renderForm(); });
  form.addEventListener('submit', async event => { event.preventDefault(); if (active === null) return; const fields = new FormData(form); products[active] = {...products[active], ...Object.fromEntries(fields.entries())}; await saveProducts(); renderList(); renderForm(); });
  const loadProducts = async () => { try { const response = await fetch('/api/products'); if (!response.ok) throw new Error(); products = (await response.json()).items || []; } catch { products = localProducts(); } renderList(); renderForm(); };
  document.querySelector('#productsTool')?.addEventListener('click', async () => { await loadProducts(); dialog.showModal(); });
  dialog.querySelector('[data-close]').addEventListener('click', () => dialog.close());
})();
