/* Reveal publishing controls only after the administrator begins editing content. */
(() => {
  const actions = document.querySelector('.top-actions');
  if (!actions) return;
  const reveal = event => {
    if (event.target.closest?.('#editor')) actions.classList.add('has-edits');
  };
  document.addEventListener('input', reveal, true);
  document.addEventListener('change', reveal, true);
  document.addEventListener('click', event => {
    if (event.target.closest?.('#applyEdit')) actions.classList.add('has-edits');
    if (event.target.closest?.('#resetBtn')) actions.classList.remove('has-edits');
  }, true);
})();
