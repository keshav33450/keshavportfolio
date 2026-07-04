/* ============================
   Keshav Raja — Portfolio
   script.js
   ============================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Page Intro Overlay ---------- */
  const intro = document.getElementById('page-intro');
  if (intro) {
    setTimeout(() => { intro.style.display = 'none'; }, 2000);
  }

  /* ---------- Mute & Autoplay All Videos ---------- */
  const ensureVideos = () => {
    document.querySelectorAll('video').forEach(v => {
      v.muted = true;
      v.defaultMuted = true;
      v.loop = true;
      v.play().catch(() => {});
    });
  };
  ensureVideos();
  setTimeout(ensureVideos, 300);
  setTimeout(ensureVideos, 1200);

  /* ---------- Custom Cursor ---------- */
  const ring = document.getElementById('cursor-ring');
  const dot  = document.getElementById('cursor-dot');

  if (ring && dot && window.matchMedia('(pointer:fine)').matches) {
    document.documentElement.style.cursor = 'none';
    let mx = window.innerWidth / 2, my = window.innerHeight / 2, rx = mx, ry = my;

    window.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + 'px';
      dot.style.top  = my + 'px';
      ring.style.opacity = '1';
      dot.style.opacity  = '1';
    });

    window.addEventListener('mouseout', e => {
      if (!e.relatedTarget) {
        ring.style.opacity = '0';
        dot.style.opacity  = '0';
      }
    });

    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      requestAnimationFrame(loop);
    };
    loop();

    // Grow on interactive elements
    document.addEventListener('mouseover', e => {
      if (e.target.closest('a, article, video, button, [role="button"]')) {
        ring.classList.add('grow');
      }
    });
    document.addEventListener('mouseout', e => {
      if (e.target.closest('a, article, video, button, [role="button"]')) {
        ring.classList.remove('grow');
      }
    });
    window.addEventListener('mousedown', () => ring.classList.add('pressed'));
    window.addEventListener('mouseup',   () => ring.classList.remove('pressed'));
  }

  /* ---------- Count-Up Animation ---------- */
  const countUp = el => {
    if (el.dataset.counted) return;
    el.dataset.counted = '1';
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    if (isNaN(target)) return;
    const dur = 1200, start = performance.now();
    const tick = now => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  /* ---------- Scroll Reveal (IntersectionObserver) ---------- */
  const els = document.querySelectorAll('[data-reveal], [data-count]');
  if (!els.length) return;

  if (!('IntersectionObserver' in window)) {
    els.forEach(el => {
      if (el.hasAttribute('data-reveal')) el.classList.add('revealed');
      if (el.hasAttribute('data-count'))  countUp(el);
    });
    return;
  }

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const el = e.target;
        if (el.hasAttribute('data-reveal')) el.classList.add('revealed');
        if (el.hasAttribute('data-count'))  countUp(el);
        io.unobserve(el);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });

  els.forEach(el => io.observe(el));

  /* ---------- Mobile Nav Toggle ---------- */
  const hamburger = document.getElementById('nav-hamburger');
  const navLinks  = document.getElementById('nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
    // Close on link click
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

});
