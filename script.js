/* ==========================================================================
   Janarthanan K — Portfolio Scripts
   Modular vanilla JS: Navigation, Scroll Effects, Counters, Reveal, DNA BG
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initScrollProgress();
  initScrollReveal();
  initCounters();
  initBackToTop();
  initDnaBackground();
  initFooterYear();
});

/* ---------------------------------------------------------------------
   Navigation: sticky navbar shadow, mobile toggle, active link on scroll
   --------------------------------------------------------------------- */
function initNavigation() {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (!navbar) return;

  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 12);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

/* ---------------------------------------------------------------------
   Scroll progress indicator
   --------------------------------------------------------------------- */
function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;

  const update = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = `${progress}%`;
  };

  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
}

/* ---------------------------------------------------------------------
   Scroll reveal for elements with .reveal
   --------------------------------------------------------------------- */
function initScrollReveal() {
  const targets = document.querySelectorAll('.reveal');
  if (!targets.length) return;

  if (!('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('in-view'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  targets.forEach((el) => observer.observe(el));
}

/* ---------------------------------------------------------------------
   Animated counters for research statistics
   --------------------------------------------------------------------- */
function initCounters() {
  const counters = document.querySelectorAll('.stat-number');
  if (!counters.length) return;

  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-count'), 10) || 0;
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1400;
    const start = performance.now();

    const step = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); /* ease-out cubic */
      const value = Math.round(eased * target);
      el.textContent = `${value}${suffix}`;
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  if (!('IntersectionObserver' in window)) {
    counters.forEach(animateCounter);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );

  counters.forEach((el) => observer.observe(el));
}

/* ---------------------------------------------------------------------
   Back-to-top button
   --------------------------------------------------------------------- */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  const toggle = () => btn.classList.toggle('visible', window.scrollY > 500);
  toggle();
  window.addEventListener('scroll', toggle, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ---------------------------------------------------------------------
   Ambient DNA double-helix background animation (hero section)
   Pure SVG, generated procedurally, low-opacity, decorative only.
   --------------------------------------------------------------------- */
function initDnaBackground() {
  const svg = document.querySelector('.dna-svg');
  if (!svg) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const ns = 'http://www.w3.org/2000/svg';
  const group = svg.querySelector('.dna-strand') || document.createElementNS(ns, 'g');
  group.setAttribute('class', 'dna-strand');
  group.innerHTML = '';

  const rungCount = 22;
  const spacingY = 800 / rungCount;
  const amplitude = 70;
  const centerX = 200;

  for (let i = 0; i < rungCount; i++) {
    const y = i * spacingY;
    const phase = (i / rungCount) * Math.PI * 2;
    const x1 = centerX + Math.sin(phase) * amplitude;
    const x2 = centerX - Math.sin(phase) * amplitude;

    const rung = document.createElementNS(ns, 'line');
    rung.setAttribute('x1', x1);
    rung.setAttribute('y1', y);
    rung.setAttribute('x2', x2);
    rung.setAttribute('y2', y);
    rung.setAttribute('stroke', 'url(#dnaGradient)');
    rung.setAttribute('stroke-width', '1.2');
    group.appendChild(rung);

    const node1 = document.createElementNS(ns, 'circle');
    node1.setAttribute('cx', x1);
    node1.setAttribute('cy', y);
    node1.setAttribute('r', 3.2);
    node1.setAttribute('fill', '#3B82F6');
    group.appendChild(node1);

    const node2 = document.createElementNS(ns, 'circle');
    node2.setAttribute('cx', x2);
    node2.setAttribute('cy', y);
    node2.setAttribute('r', 3.2);
    node2.setAttribute('fill', '#14B8A6');
    group.appendChild(node2);
  }

  /* gradient defs */
  let defs = svg.querySelector('defs');
  if (!defs) {
    defs = document.createElementNS(ns, 'defs');
    svg.insertBefore(defs, svg.firstChild);
  }
  const gradient = document.createElementNS(ns, 'linearGradient');
  gradient.setAttribute('id', 'dnaGradient');
  gradient.setAttribute('x1', '0%');
  gradient.setAttribute('x2', '100%');
  const stop1 = document.createElementNS(ns, 'stop');
  stop1.setAttribute('offset', '0%');
  stop1.setAttribute('stop-color', '#3B82F6');
  const stop2 = document.createElementNS(ns, 'stop');
  stop2.setAttribute('offset', '100%');
  stop2.setAttribute('stop-color', '#14B8A6');
  gradient.appendChild(stop1);
  gradient.appendChild(stop2);
  defs.appendChild(gradient);

  if (!svg.contains(group)) svg.appendChild(group);

  if (!prefersReducedMotion) {
    let frame = 0;
    const animate = () => {
      frame += 0.006;
      group.setAttribute('transform', `translate(0, ${Math.sin(frame) * 12})`);
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }
}

/* ---------------------------------------------------------------------
   Footer year
   --------------------------------------------------------------------- */
function initFooterYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}
