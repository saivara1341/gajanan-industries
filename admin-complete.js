/* Content Studio enhancements: upload images as deployable files instead of
   embedding large base64 payloads in the content manifest. */
(() => {
  const toast = (message, duration = 3200) => {
    const element = document.querySelector('#toast');
    if (!element) return;
    element.textContent = message;
    element.classList.add('show');
    window.setTimeout(() => element.classList.remove('show'), duration);
  };

  document.addEventListener('change', event => {
    const input = event.target;
    if (input?.id !== 'imageUpload' || !input.files?.[0]) return;
    const file = input.files[0];
    if (!/^image\/(png|jpeg|webp)$/.test(file.type)) {
      toast('Please select a PNG, JPEG, or WebP image.');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast('Please choose an image smaller than 10 MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      const field = document.querySelector('#elementValue');
      if (!field) return;
      toast('Uploading image…', 1200);
      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ name: file.name, data: reader.result })
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || 'Image upload failed.');
        field.value = result.path;
        field.dispatchEvent(new Event('input', { bubbles: true }));
        toast('Image ready. Click “Update website” to save it.');
      } catch (error) {
        toast(error.message || 'Could not upload image. Start Content Studio with node admin-server.mjs.');
      }
    };
    reader.readAsDataURL(file);
  }, true);

  const heading = document.querySelector('.topbar .crumb');
  if (heading) heading.title = 'Changes save to admin-content.json. Publish pushes it and uploaded media to the deployment branch.';
})();
