/* =========================================================
   ANIMATIONS.JS — Typing animation, scroll reveals,
                   counter animation, intersection observers
   ========================================================= */

'use strict';

/* ── TYPING ANIMATION ────────────────────────────────────── */

const TYPING_PHRASES = [
  "for the web.",
  "clean interfaces.",
  "embedded systems.",
  "things that matter.",
  "fast experiences.",
  "cool stuff. 🚀"
];

class TypingAnimation {
  constructor(elementId, phrases, options = {}) {
    this.el       = document.getElementById(elementId);
    this.phrases  = phrases;
    this.speed    = options.typeSpeed  || 65;
    this.delSpeed = options.deleteSpeed || 40;
    this.pauseMs  = options.pauseMs    || 1800;

    this.phraseIndex = 0;
    this.charIndex   = 0;
    this.isDeleting  = false;

    if (this.el) this._tick();
  }

  _tick() {
    const currentPhrase = this.phrases[this.phraseIndex];
    const isComplete    = this.charIndex === currentPhrase.length;

    if (this.isDeleting) {
      this.charIndex--;
      this.el.textContent = currentPhrase.slice(0, this.charIndex);
    } else {
      this.charIndex++;
      this.el.textContent = currentPhrase.slice(0, this.charIndex);
    }

    let delay = this.isDeleting ? this.delSpeed : this.speed;

    if (!this.isDeleting && isComplete) {
      // Pause at end of phrase
      delay = this.pauseMs;
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting  = false;
      this.phraseIndex = (this.phraseIndex + 1) % this.phrases.length;
      delay = 400;
    }

    setTimeout(() => this._tick(), delay);
  }
}

/* ── SCROLL REVEAL ───────────────────────────────────────── */

function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  revealEls.forEach(el => observer.observe(el));

  // Keep observing newly rendered elements (e.g. after project filter)
  return observer;
}

/* ── RE-OBSERVE after dynamic render ────────────────────── */
// Called from projects.js after rendering cards
window.reObserveReveal = function(observer) {
  if (!observer) return;
  document.querySelectorAll('.reveal-up:not(.revealed)').forEach(el => {
    observer.observe(el);
  });
};

/* ── STAT COUNTER ANIMATION ──────────────────────────────── */

function animateCounter(el) {
  const target   = parseInt(el.dataset.count, 10);
  const duration = 1200;
  const start    = performance.now();

  const easeOut = (t) => 1 - Math.pow(1 - t, 3);

  function update(now) {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const value    = Math.round(easeOut(progress) * target);
    el.textContent = value;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target;
    }
  }

  requestAnimationFrame(update);
}

function initCounters() {
  const counters = document.querySelectorAll('.stat-number[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(el => observer.observe(el));
}

/* ── INIT ─────────────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {
  // Start typing animation
  new TypingAnimation('typingText', TYPING_PHRASES, {
    typeSpeed:    60,
    deleteSpeed:  35,
    pauseMs:      2000
  });

  // Scroll reveal
  const revealObserver = initScrollReveal();
  // Expose observer for dynamic content
  window._revealObserver = revealObserver;

  // Counters
  initCounters();
});
