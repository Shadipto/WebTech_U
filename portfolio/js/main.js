/* =========================================================
   MAIN.JS — Core site interactivity:
             • Dark / Light theme toggle (localStorage)
             • Sticky nav + active link tracking
             • Mobile hamburger menu
             • Custom cursor
             • Scroll-to-top button
             • Current year footer
   ========================================================= */

'use strict';

/* ── THEME ────────────────────────────────────────────────── */

const THEME_KEY = 'portfolio-theme';

function getStoredTheme() {
  return localStorage.getItem(THEME_KEY);
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_KEY, theme);
  updateThemeToggleLabel(theme);
}

function updateThemeToggleLabel(theme) {
  const btn = document.getElementById('themeToggle');
  if (!btn) return;
  btn.setAttribute('aria-label',
    theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
  );
}

function initTheme() {
  const stored  = getStoredTheme();
  // Respect stored preference, or default to dark
  const initial = stored || 'dark';
  setTheme(initial);

  const btn = document.getElementById('themeToggle');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
  });
}

/* ── STICKY NAV ───────────────────────────────────────────── */

function initStickyNav() {
  const header = document.getElementById('siteHeader');
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load
}

/* ── ACTIVE NAV LINK (Intersection Observer) ─────────────── */

function initActiveNavLinks() {
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-link');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        navLinks.forEach(link => {
          const href = link.getAttribute('href')?.slice(1); // strip '#'
          const isActive = href === entry.target.id;
          link.classList.toggle('active', isActive);
        });
      });
    },
    {
      threshold:   0.3,
      rootMargin: '-10% 0px -60% 0px'
    }
  );

  sections.forEach(sec => observer.observe(sec));
}

/* ── MOBILE HAMBURGER ─────────────────────────────────────── */

function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  if (!hamburger || !navLinks) return;

  function openMenu() {
    hamburger.classList.add('open');
    navLinks.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    hamburger.classList.contains('open') ? closeMenu() : openMenu();
  });

  // Close on nav link click
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('open') &&
        !navLinks.contains(e.target) &&
        !hamburger.contains(e.target)) {
      closeMenu();
    }
  });
}

/* ── CUSTOM CURSOR ────────────────────────────────────────── */

function initCustomCursor() {
  const cursor   = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  if (!cursor || !follower) return;

  // Bail out on touch-only devices
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    cursor.style.display   = 'none';
    follower.style.display = 'none';
    return;
  }

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;
  let raf;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursor.style.left = `${mouseX}px`;
    cursor.style.top  = `${mouseY}px`;
  });

  // Smooth follower with lerp
  function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;

    follower.style.left = `${followerX}px`;
    follower.style.top  = `${followerY}px`;

    raf = requestAnimationFrame(animateFollower);
  }
  animateFollower();

  // Hover state on interactive elements
  const interactiveSelector = 'a, button, .project-card, .filter-btn, .skill-item, input, textarea, label';

  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(interactiveSelector)) {
      document.body.classList.add('cursor-hover');
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(interactiveSelector)) {
      document.body.classList.remove('cursor-hover');
    }
  });

  // Hide when leaving viewport
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity   = '0';
    follower.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    cursor.style.opacity   = '';
    follower.style.opacity = '';
  });
}

/* ── SCROLL TO TOP ─────────────────────────────────────────── */

function initScrollTop() {
  const btn = document.getElementById('scrollTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ── FOOTER YEAR ──────────────────────────────────────────── */

function initFooterYear() {
  const yearEl = document.getElementById('currentYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

/* ── SMOOTH SCROLL FOR ANCHOR LINKS ──────────────────────── */

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;

      e.preventDefault();
      const offset = document.getElementById('siteHeader')?.offsetHeight || 80;
      const top    = target.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* ── OBSERVE newly added .reveal elements after project filter ── */

function initDynamicRevealObserver() {
  // After projects.js calls renderProjects(), new cards need to be observed.
  // We patch by watching DOM mutations.
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;

  const mutationObs = new MutationObserver(() => {
    if (window._revealObserver) {
      grid.querySelectorAll('.reveal-up:not(.revealed)').forEach(el => {
        window._revealObserver.observe(el);
      });
    }
  });

  mutationObs.observe(grid, { childList: true });
}

/* ── INIT ALL ──────────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initStickyNav();
  initActiveNavLinks();
  initHamburger();
  initCustomCursor();
  initScrollTop();
  initFooterYear();
  initSmoothScroll();
  initDynamicRevealObserver();
});
