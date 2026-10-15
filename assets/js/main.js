/* ══════════════════════════════════════════
   JC EVENTS – main.js
══════════════════════════════════════════ */

// Shared by every page. Each block below checks that its elements exist,
// so a page without a hero, stats band, gallery or form doesn't stop the script.

const LANG = document.documentElement.lang === 'en' ? 'en' : 'es';
const MESSAGES = {
  es: { required: 'Este campo es obligatorio.', email: 'Ingresa un email válido.', sending: 'Enviando...' },
  en: { required: 'This field is required.', email: 'Enter a valid email address.', sending: 'Sending...' },
}[LANG];

document.addEventListener('DOMContentLoaded', () => {

  /* ─────────────────────────────────────
     LOADER
  ───────────────────────────────────── */
  const loader = document.getElementById('loader');
  if (loader) {
    window.addEventListener('load', () => {
      setTimeout(() => loader.classList.add('hidden'), 1800);
    });
  }

  /* ─────────────────────────────────────
     NAVBAR – scroll behaviour
  ───────────────────────────────────── */
  const navbar = document.getElementById('navbar');
  const backTop = document.getElementById('backTop');

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY > 80;
    navbar?.classList.toggle('scrolled', scrolled);
    backTop?.classList.toggle('visible', scrolled);
    highlightNavLink();
  });

  backTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ─────────────────────────────────────
     NAVBAR – active link highlight
  ───────────────────────────────────── */
  const sections = document.querySelectorAll('section[id]');

  function highlightNavLink() {
    const scrollY = window.scrollY + 120;
    sections.forEach(sec => {
      const top    = sec.offsetTop;
      const height = sec.offsetHeight;
      const id     = sec.getAttribute('id');
      const link   = document.querySelector(`.nav-links a[href="#${id}"]`);
      if (link) {
        if (scrollY >= top && scrollY < top + height) {
          document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
          link.classList.add('active');
        }
      }
    });
  }

  /* ─────────────────────────────────────
     HAMBURGER MENU
  ───────────────────────────────────── */
  const hamburger  = document.getElementById('hamburger');
  const navLinks   = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  /* ─────────────────────────────────────
     HERO SLIDESHOW
  ───────────────────────────────────── */
  const heroImgs  = document.querySelectorAll('.hero-img');
  const heroDots  = document.querySelectorAll('.dot');
  let   currentSlide = 0;
  let   slideTimer;

  function goToSlide(n) {
    heroImgs[currentSlide].classList.remove('active');
    heroDots[currentSlide]?.classList.remove('active');
    currentSlide = (n + heroImgs.length) % heroImgs.length;
    heroImgs[currentSlide].classList.add('active');
    heroDots[currentSlide]?.classList.add('active');
  }

  function nextSlide() { goToSlide(currentSlide + 1); }

  function startSlider() {
    slideTimer = setInterval(nextSlide, 5000);
  }

  heroDots.forEach(dot => {
    dot.addEventListener('click', () => {
      clearInterval(slideTimer);
      goToSlide(parseInt(dot.dataset.slide));
      startSlider();
    });
  });

  // Only the home hero has several images with matching dots.
  if (heroImgs.length > 1 && heroDots.length === heroImgs.length) startSlider();

  /* ─────────────────────────────────────
     STATS COUNTER
  ───────────────────────────────────── */
  const statNums = document.querySelectorAll('.stat-num');
  let statsAnimated = false;

  function animateStats() {
    if (statsAnimated) return;
    const band = document.querySelector('.stats-band');
    if (!band) return;
    const rect = band.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      statsAnimated = true;
      statNums.forEach(el => {
        const target = parseInt(el.dataset.target);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        const timer = setInterval(() => {
          current += step;
          if (current >= target) { current = target; clearInterval(timer); }
          el.textContent = Math.floor(current);
        }, 16);
      });
    }
  }

  window.addEventListener('scroll', animateStats);
  animateStats();

  /* ─────────────────────────────────────
     REVEAL ON SCROLL
  ───────────────────────────────────── */
  const reveals = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const delay = entry.target.closest('.services-grid, .gallery-grid')
          ? Array.from(entry.target.parentNode.children).indexOf(entry.target) * 80
          : 0;
        setTimeout(() => entry.target.classList.add('visible'), delay);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  reveals.forEach(el => revealObserver.observe(el));

  /* ─────────────────────────────────────
     GALLERY FILTER
  ───────────────────────────────────── */
  const filterBtns   = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      galleryItems.forEach(item => {
        if (filter === 'all' || item.dataset.cat === filter) {
          item.classList.remove('hidden');
          item.style.animation = 'fadeIn 0.4s ease';
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

  /* ─────────────────────────────────────
     LIGHTBOX
  ───────────────────────────────────── */
  const lightbox  = document.getElementById('lightbox');
  const lbImg     = document.getElementById('lbImg');
  const lbCaption = document.getElementById('lbCaption');
  const lbClose   = document.getElementById('lbClose');
  const lbPrev    = document.getElementById('lbPrev');
  const lbNext    = document.getElementById('lbNext');
  let   lbIndex   = 0;

  function getVisibleItems() {
    return Array.from(galleryItems).filter(i => !i.classList.contains('hidden'));
  }

  function openLightbox(idx) {
    const items = getVisibleItems();
    lbIndex = idx;
    const item  = items[lbIndex];
    const img   = item.querySelector('img');
    const info  = item.querySelector('.gallery-info p');
    lbImg.src = img.src;
    lbCaption.textContent = info ? info.textContent : '';
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  function lbNav(dir) {
    const items = getVisibleItems();
    lbIndex = (lbIndex + dir + items.length) % items.length;
    openLightbox(lbIndex);
  }

  // Only the home page has this lightbox; the gallery page has its own.
  if (lightbox) {
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const visible = getVisibleItems();
        const visIdx  = visible.indexOf(item);
        if (visIdx >= 0) openLightbox(visIdx);
      });
    });

    lbClose.addEventListener('click', closeLightbox);
    lbPrev.addEventListener('click', () => lbNav(-1));
    lbNext.addEventListener('click', () => lbNav(1));

    lightbox.addEventListener('click', e => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', e => {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape')      closeLightbox();
      if (e.key === 'ArrowLeft')   lbNav(-1);
      if (e.key === 'ArrowRight')  lbNav(1);
    });
  }

  /* ─────────────────────────────────────
     TESTIMONIALS SLIDER
  ───────────────────────────────────── */
  const track     = document.getElementById('testimonialsTrack');
  if (track) {
    const cards     = track.querySelectorAll('.testimonial-card');
    const tDots     = document.getElementById('tDots');
    const tPrev     = document.getElementById('tPrev');
    const tNext     = document.getElementById('tNext');
    let   tIndex    = 0;
    let   perView   = 3;
    let   tTimer;

    function getPerView() {
      if (window.innerWidth <= 480)  return 1;
      if (window.innerWidth <= 768)  return 1;
      if (window.innerWidth <= 900)  return 2;
      return 3;
    }

    function buildDots() {
      tDots.innerHTML = '';
      perView = getPerView();
      const count = Math.ceil(cards.length / perView);
      for (let i = 0; i < count; i++) {
        const dot = document.createElement('button');
        dot.className = 't-dot' + (i === 0 ? ' active' : '');
        dot.addEventListener('click', () => goTo(i));
        tDots.appendChild(dot);
      }
    }

    function goTo(idx) {
      perView = getPerView();
      const max  = Math.ceil(cards.length / perView) - 1;
      tIndex = Math.max(0, Math.min(idx, max));
      const cardW = track.parentElement.offsetWidth;
      track.style.transform = `translateX(-${tIndex * cardW}px)`;
      document.querySelectorAll('.t-dot').forEach((d, i) => d.classList.toggle('active', i === tIndex));
    }

    function startTTimer() {
      tTimer = setInterval(() => {
        perView = getPerView();
        const max = Math.ceil(cards.length / perView) - 1;
        goTo(tIndex >= max ? 0 : tIndex + 1);
      }, 5000);
    }

    tPrev.addEventListener('click', () => { clearInterval(tTimer); goTo(tIndex - 1); startTTimer(); });
    tNext.addEventListener('click', () => { clearInterval(tTimer); goTo(tIndex + 1); startTTimer(); });

    buildDots();
    startTTimer();
    window.addEventListener('resize', () => { buildDots(); goTo(0); });
  }

  /* ─────────────────────────────────────
     CONTACT FORM VALIDATION
  ───────────────────────────────────── */
  // Home page (#contactForm) and contact page (#contactPageForm).
  // This is a demo site: the forms validate, then show a notice that
  // nothing was sent. Connect a form service before using it for real.
  function validateField(field) {
    const errorEl = field.parentElement.querySelector('.form-error');
    if (!errorEl) return true;

    field.classList.remove('error');
    errorEl.textContent = '';

    if (field.hasAttribute('required') && !field.value.trim()) {
      field.classList.add('error');
      errorEl.textContent = MESSAGES.required;
      return false;
    }

    if (field.type === 'email' && field.value) {
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRe.test(field.value)) {
        field.classList.add('error');
        errorEl.textContent = MESSAGES.email;
        return false;
      }
    }

    return true;
  }

  ['contactForm', 'contactPageForm'].forEach(id => {
    const form = document.getElementById(id);
    if (!form) return;
    const success = form.querySelector('.form-success');
    const btn     = form.querySelector('.btn-submit');
    const btnText = btn?.querySelector('.btn-text');
    const idleLabel = btnText?.textContent;

    form.querySelectorAll('input, select, textarea').forEach(field => {
      field.addEventListener('blur', () => validateField(field));
      field.addEventListener('input', () => validateField(field));
    });

    form.addEventListener('submit', e => {
      e.preventDefault();
      let isValid = true;
      form.querySelectorAll('[required]').forEach(f => { if (!validateField(f)) isValid = false; });
      if (!isValid) return;

      if (btn) btn.disabled = true;
      if (btnText) btnText.textContent = MESSAGES.sending;

      setTimeout(() => {
        form.reset();
        if (btn) btn.disabled = false;
        if (btnText) btnText.textContent = idleLabel;
        success?.classList.add('show');
        setTimeout(() => success?.classList.remove('show'), 8000);
      }, 800);
    });
  });

  /* ─────────────────────────────────────
     SMOOTH SCROLL for all anchor links
  ───────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'));
      const top  = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ─────────────────────────────────────
     GOLD PARTICLE CURSOR TRAIL (desktop)
  ───────────────────────────────────── */
  if (window.matchMedia('(pointer: fine)').matches) {
    let lastX = 0, lastY = 0;
    document.addEventListener('mousemove', e => {
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      if (Math.abs(dx) < 5 && Math.abs(dy) < 5) return;
      lastX = e.clientX; lastY = e.clientY;

      const dot = document.createElement('div');
      dot.style.cssText = `
        position:fixed;
        left:${e.clientX}px; top:${e.clientY}px;
        width:4px; height:4px;
        background: rgba(201,168,76,0.6);
        border-radius:50%;
        pointer-events:none;
        z-index:9998;
        transform:translate(-50%,-50%);
        transition: opacity 0.8s ease, transform 0.8s ease;
      `;
      document.body.appendChild(dot);
      requestAnimationFrame(() => {
        dot.style.opacity = '0';
        dot.style.transform = 'translate(-50%,-50%) scale(0)';
      });
      setTimeout(() => dot.remove(), 800);
    });
  }

  /* ─────────────────────────────────────
     CSS ANIMATION for gallery filter
  ───────────────────────────────────── */
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.95); }
      to   { opacity: 1; transform: scale(1); }
    }
  `;
  document.head.appendChild(style);

}); // end DOMContentLoaded


document.addEventListener('DOMContentLoaded', () => {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;

            faqItem.classList.toggle('open');
        });
    });
});