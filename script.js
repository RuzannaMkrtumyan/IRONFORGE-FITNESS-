/* =============================================
   IRONFORGE FITNESS — Interactions
   ============================================= */

(() => {
  'use strict';

  // ---------- NAV: scroll state + mobile toggle ----------
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav__link');

  const setNavScrolled = () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', setNavScrolled, { passive: true });
  setNavScrolled();

  navToggle.addEventListener('click', () => {
    const open = navMenu.classList.toggle('open');
    navToggle.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.style.overflow = open ? 'hidden' : '';
  });

  // Close mobile menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  });

  // ---------- ACTIVE NAV LINK on scroll ----------
  const sections = document.querySelectorAll('section[id]');
  const updateActiveLink = () => {
    const y = window.scrollY + 120;
    let currentId = 'home';
    sections.forEach(sec => {
      if (sec.offsetTop <= y) currentId = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
    });
  };
  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();

  // ---------- SCROLL REVEAL via IntersectionObserver ----------
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
  revealEls.forEach(el => revealObserver.observe(el));

  // ---------- ANIMATED STATS ----------
  const stats = document.querySelectorAll('.stat__number');
  const animateCount = (el) => {
    const target = parseInt(el.dataset.count, 10);
    const duration = 1800;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target;
    };
    requestAnimationFrame(tick);
  };
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  stats.forEach(s => statsObserver.observe(s));

  // ---------- MODAL ----------
  const modal = document.getElementById('modal');
  const modalPlan = document.getElementById('modalPlan');
  const modalPrice = document.getElementById('modalPrice');
  const modalTitle = document.getElementById('modalTitle');
  const modalSubtitle = document.getElementById('modalSubtitle');
  const modalForm = document.getElementById('modalForm');
  const modalSuccess = document.getElementById('modalSuccess');
  let lastFocus = null;

  const openModal = (plan = 'Pro', price = '$59/month', title = 'Join IRONFORGE') => {
    lastFocus = document.activeElement;
    modalPlan.textContent = plan;
    modalPrice.textContent = price;
    modalTitle.textContent = title;
    modalSubtitle.innerHTML = title === 'Claim Your Free Session'
      ? `Reserve a <span class="accent">no-cost trial session</span> — no commitment.`
      : `Select the <span class="accent">${plan}</span> plan at <span class="accent">${price}</span>.`;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    setTimeout(() => modal.querySelector('.modal__close, .modal__content input')?.focus(), 100);
  };
  const closeModal = () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    modalForm.reset();
    modalSuccess.classList.remove('show');
    modalForm.querySelectorAll('.form__error').forEach(e => e.textContent = '');
    if (lastFocus) lastFocus.focus();
  };

  // Membership plan buttons
  document.querySelectorAll('.plan__cta').forEach(btn => {
    btn.addEventListener('click', () => {
      openModal(btn.dataset.plan, btn.dataset.price, 'Join IRONFORGE');
    });
  });

  // Free session CTA
  document.getElementById('openFreeSession').addEventListener('click', () => {
    openModal('Free Session', 'Complimentary', 'Claim Your Free Session');
  });

  // Close modal
  modal.querySelectorAll('[data-close]').forEach(el => {
    el.addEventListener('click', closeModal);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });

  // Trap focus inside modal
  modal.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    const focusable = modal.querySelectorAll('button, [href], input, textarea, [tabindex]:not([tabindex="-1"])');
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

  // ---------- FORM VALIDATION ----------
  const validateField = (input) => {
    const errEl = input.closest('.form__group').querySelector('.form__error');
    if (!errEl) return true;
    let msg = '';
    const val = input.value.trim();
    if (input.required && !val) msg = 'This field is required.';
    else if (input.type === 'email' && val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) msg = 'Please enter a valid email.';
    else if (input.minLength && val.length < input.minLength) msg = `Minimum ${input.minLength} characters.`;
    errEl.textContent = msg;
    return !msg;
  };

  const attachValidation = (form, successEl) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const inputs = form.querySelectorAll('input[required], textarea[required]');
      let valid = true;
      inputs.forEach(i => { if (!validateField(i)) valid = false; });
      if (!valid) return;
      successEl.classList.add('show');
      form.reset();
      setTimeout(() => successEl.classList.remove('show'), 6000);
    });
    form.querySelectorAll('input, textarea').forEach(i => {
      i.addEventListener('blur', () => validateField(i));
      i.addEventListener('input', () => {
        const errEl = i.closest('.form__group').querySelector('.form__error');
        if (errEl && errEl.textContent) validateField(i);
      });
    });
  };

  attachValidation(document.getElementById('contactForm'), document.getElementById('formSuccess'));
  attachValidation(modalForm, modalSuccess);

  // ---------- BACK TO TOP ----------
  const btt = document.getElementById('backToTop');
  const toggleBtt = () => btt.classList.toggle('show', window.scrollY > 600);
  window.addEventListener('scroll', toggleBtt, { passive: true });
  toggleBtt();
  btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // ---------- DYNAMIC YEAR ----------
  document.getElementById('year').textContent = new Date().getFullYear();
})();
