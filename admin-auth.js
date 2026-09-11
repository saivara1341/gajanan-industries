(() => {
  const overlay = document.getElementById('adminAuthOverlay');
  const form = document.getElementById('adminAuthForm');
  const errorMsg = document.getElementById('authErrorMsg');
  const submitBtn = document.getElementById('authSubmitBtn');
  const pinBoxes = Array.from(document.querySelectorAll('.pin-box'));
  const lockBtn = document.getElementById('lockPortalBtn');
  const card = document.querySelector('.admin-auth-card');

  const STORAGE_KEY = 'gajanan_admin_session';

  function checkSession() {
    try {
      const session = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      if (session && session.expiresAt && session.expiresAt > Date.now()) {
        unlock(false);
        return true;
      }
    } catch (_) {}
    lock();
    return false;
  }

  function unlock() {
    if (overlay) {
      overlay.classList.add('is-hidden');
      overlay.style.display = 'none';
      overlay.style.pointerEvents = 'none';
    }
  }

  function lock() {
    localStorage.removeItem(STORAGE_KEY);
    if (overlay) {
      overlay.classList.remove('is-hidden');
      overlay.style.display = 'flex';
      overlay.style.opacity = '1';
      overlay.style.visibility = 'visible';
      overlay.style.pointerEvents = 'auto';
      pinBoxes.forEach(box => box.value = '');
      setTimeout(() => {
        if (pinBoxes[0]) pinBoxes[0].focus();
      }, 50);
    }
    if (errorMsg) errorMsg.textContent = '';
  }

  // Auto-advance between PIN inputs and handle paste
  pinBoxes.forEach((box, index) => {
    box.addEventListener('input', e => {
      const val = e.target.value.replace(/\D/g, '');
      box.value = val ? val.slice(-1) : '';
      if (box.value && index < pinBoxes.length - 1) {
        pinBoxes[index + 1].focus();
      }
      if (pinBoxes.every(b => b.value.length === 1)) {
        form?.dispatchEvent(new Event('submit', { cancelable: true }));
      }
    });

    box.addEventListener('keydown', e => {
      if (e.key === 'Backspace' && !box.value && index > 0) {
        pinBoxes[index - 1].focus();
      }
    });

    box.addEventListener('paste', e => {
      e.preventDefault();
      const paste = (e.clipboardData?.getData('text') || '').replace(/\D/g, '').slice(0, 6);
      if (paste.length === 6) {
        pinBoxes.forEach((b, i) => b.value = paste[i] || '');
        pinBoxes[5].focus();
        form?.dispatchEvent(new Event('submit', { cancelable: true }));
      }
    });
  });

  // Server-side verification via Supabase Edge Function (Zero secret exposure in client code)
  async function verifyTOTP(code) {
    try {
      const res = await fetch('https://xoqpxckowwubeqdtazks.supabase.co/functions/v1/admin-auth', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ code })
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        return { ok: true, token: data.token };
      }
      return { ok: false, error: data.error || 'Invalid 6-digit code. Check your Google Authenticator app.' };
    } catch (_) {
      return { ok: false, error: 'Connection error. Please check your internet.' };
    }
  }

  form?.addEventListener('submit', async e => {
    e.preventDefault();
    const code = pinBoxes.map(b => b.value).join('').trim();
    if (code.length !== 6) {
      if (errorMsg) errorMsg.textContent = 'Please enter all 6 digits.';
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.querySelector('span').textContent = 'VERIFYING…';
    }
    if (errorMsg) errorMsg.textContent = '';

    try {
      const result = await verifyTOTP(code);
      if (result.ok) {
        const session = {
          token: result.token,
          expiresAt: Date.now() + 12 * 60 * 60 * 1000 // 12-hour session
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
        unlock();
      } else {
        if (card) {
          card.classList.add('is-shaking');
          setTimeout(() => card.classList.remove('is-shaking'), 500);
        }
        if (errorMsg) errorMsg.textContent = result.error || 'Invalid code. Check your Google Authenticator app.';
        pinBoxes.forEach(b => b.value = '');
        if (pinBoxes[0]) pinBoxes[0].focus();
      }
    } catch (err) {
      if (errorMsg) errorMsg.textContent = 'Verification error. Please try again.';
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.querySelector('span').textContent = 'Unlock Content Studio';
      }
    }
  });

  document.addEventListener('click', e => {
    if (e.target.closest?.('#lockPortalBtn, .lock-portal-btn')) {
      e.preventDefault();
      e.stopPropagation();
      lock();
    }
  }, true);

  // Check session on initial page load
  checkSession();
})();
