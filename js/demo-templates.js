/* Premium JS for CJ Web Design Demo Templates */
(function() {
  'use strict';

  // ─── NAVBAR SCROLL GLASS EFFECT ────────────────────────────────
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const onScroll = () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ─── HERO IMAGE PAN EFFECT ─────────────────────────────────────
  const hero = document.querySelector('.hero');
  if (hero) {
    requestAnimationFrame(() => hero.classList.add('loaded'));
  }

  // ─── MOBILE NAV ────────────────────────────────────────────────
  const burger = document.getElementById('burger');
  const mobileNav = document.getElementById('mobileNav');
  const mobileClose = document.getElementById('mobileClose');

  if (burger && mobileNav) {
    burger.addEventListener('click', () => {
      mobileNav.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }

  const closeMobileNav = () => {
    mobileNav && mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  };

  mobileClose && mobileClose.addEventListener('click', closeMobileNav);
  mobileNav && mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMobileNav));

  // ─── SMOOTH SCROLL ─────────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = this.getAttribute('href');
      if (target === '#' || !target) return;
      const el = document.querySelector(target);
      if (!el) return;
      e.preventDefault();
      const offset = 90;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // ─── ANIMATED NUMBER COUNTERS ──────────────────────────────────
  function animateCounter(el) {
    const text = el.dataset.count;
    const num  = parseFloat(text.replace(/[^0-9.]/g, ''));
    const suffix = text.replace(/[0-9.,]/g, '');
    const duration = 1800;
    const start = performance.now();

    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease out cubic
      const current = num * eased;

      // Format with commas if needed
      const display = current >= 1000
        ? Math.floor(current).toLocaleString()
        : current % 1 !== 0
          ? current.toFixed(1)
          : Math.floor(current);

      el.textContent = display + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // ─── INTERSECTION OBSERVER — Reveal + Counter Trigger ──────────
  const revealEls = document.querySelectorAll('.service-card, .testi-card, .process-step, .stat-num, .city-pill');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.dataset.delay || 0;

        setTimeout(() => {
          el.classList.add('revealed');

          // Trigger counter if it has data-count
          if (el.classList.contains('stat-num') && el.dataset.count) {
            animateCounter(el);
          }
        }, delay);

        observer.unobserve(el);
      }
    });
  }, { threshold: 0.12 });

  // Add staggered delays to card grids
  document.querySelectorAll('.services-grid .service-card').forEach((el, i) => {
    el.dataset.delay = i * 80;
    observer.observe(el);
  });

  document.querySelectorAll('.testi-grid .testi-card').forEach((el, i) => {
    el.dataset.delay = i * 100;
    observer.observe(el);
  });

  document.querySelectorAll('.process-step, .city-pill').forEach((el, i) => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    el.dataset.delay = i * 60;
    observer.observe(el);
  });

  // Stat counters
  document.querySelectorAll('.stat-num[data-count]').forEach(el => {
    observer.observe(el);
  });

  // Ensure city-pill revealed class has correct effect
  document.querySelectorAll('.city-pill').forEach(el => {
    el.classList.add('reveal-target');
  });

  // Override for process-step and city-pill (not using 'revealed' class, using inline styles)
  const inlineRevealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.dataset.delay || 0;
        setTimeout(() => {
          el.style.opacity = 1;
          el.style.transform = 'translateY(0)';
        }, delay);
        inlineRevealObs.unobserve(el);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.process-step, .city-pill').forEach(el => {
    inlineRevealObs.observe(el);
  });

  // ─── FORM SUBMISSION ───────────────────────────────────────────
  const forms = document.querySelectorAll('.contact-form');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const btn = form.querySelector('.btn-submit');
      const originalText = btn.textContent;
      btn.textContent = '✓ Sent! We\'ll call you soon.';
      btn.style.background = '#22c55e';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.disabled = false;
        form.reset();
      }, 4000);
    });
  });

  // ─── PARALLAX HERO ─────────────────────────────────────────────
  const heroBg = document.querySelector('.hero-bg img');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY * 0.3;
      heroBg.style.transform = `scale(1.05) translateY(${y}px)`;
    }, { passive: true });
  }

})();
