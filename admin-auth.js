(() => {
  const overlay = document.getElementById('adminAuthOverlay');
  const form = document.getElementById('adminAuthForm');
  const errorMsg = document.getElementById('authErrorMsg');
  const submitBtn = document.getElementById('authSubmitBtn');
  const pinBoxes = Array.from(document.querySelectorAll('.pin-box'));
  const lockBtn = document.getElementById('lockPortalBtn');
  const card = document.querySelector('.admin-auth-card');

  const STORAGE_KEY = 'gajanan_admin_session';
  const SECRET = 'XHFL66PJWIXT6VHN'; // Gajanan Admin TOTP Key

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

  function unlock(animate = true) {
    if (overlay) {
      if (animate) {
        overlay.classList.add('is-hidden');
      } else {
        overlay.classList.add('is-hidden');
      }
    }
  }

  function lock() {
    localStorage.removeItem(STORAGE_KEY);
    if (overlay) {
      overlay.classList.remove('is-hidden');
      pinBoxes.forEach(box => box.value = '');
      if (pinBoxes[0]) pinBoxes[0].focus();
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

  // Client-side TOTP verification using Web Crypto API
  async function computeClientTOTP(secret, counter) {
    const base32Alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    let bits = '';
    for (let i = 0; i < secret.length; i++) {
      const val = base32Alphabet.indexOf(secret.charAt(i).toUpperCase());
      if (val === -1) continue;
      bits += val.toString(2).padStart(5, '0');
    }
    const bytes = [];
    for (let i = 0; i + 8 <= bits.length; i += 8) {
      bytes.push(parseInt(bits.substring(i, i + 8), 2));
    }
    const keyBytes = new Uint8Array(bytes);

    const key = await crypto.subtle.importKey(
      'raw',
      keyBytes,
      { name: 'HMAC', hash: 'SHA-1' },
      false,
      ['sign']
    );

    const buffer = new ArrayBuffer(8);
    const view = new DataView(buffer);
    view.setBigUint64(0, BigInt(counter), false);

    const signature = await crypto.subtle.sign('HMAC', key, buffer);
    const sigBytes = new Uint8Array(signature);

    const offset = sigBytes[sigBytes.length - 1] & 0x0f;
    const binary =
      ((sigBytes[offset] & 0x7f) << 24) |
      ((sigBytes[offset + 1] & 0xff) << 16) |
      ((sigBytes[offset + 2] & 0xff) << 8) |
      (sigBytes[offset + 3] & 0xff);

    const otp = binary % 1000000;
    return otp.toString().padStart(6, '0');
  }

  async function verifyTOTP(code) {
    // 1. Try Supabase Edge Function first
    try {
      const res = await fetch('https://xoqpxckowwubeqdtazks.supabase.co/functions/v1/admin-auth', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ code })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.ok) return { ok: true, token: data.token };
      } else if (res.status === 401) {
        return { ok: false };
      }
    } catch (_) {}

    // 2. Cryptographic TOTP check fallback (tolerates +/- 30s clock drift)
    const currentCounter = Math.floor(Date.now() / 1000 / 30);
    for (let window = -1; window <= 1; window++) {
      const expected = await computeClientTOTP(SECRET, currentCounter + window);
      if (expected === code) return { ok: true, token: 'session_' + Date.now() };
    }

    return { ok: false };
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
          expiresAt: Date.now() + 12 * 60 * 60 * 1000 // 12 hours
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
        unlock(true);
      } else {
        if (card) {
          card.classList.add('is-shaking');
          setTimeout(() => card.classList.remove('is-shaking'), 500);
        }
        if (errorMsg) errorMsg.textContent = 'Invalid code. Check your Google Authenticator app.';
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

  lockBtn?.addEventListener('click', () => {
    if (confirm('Lock Admin Portal now?')) {
      lock();
    }
  });

  // Check on load
  checkSession();
})();
