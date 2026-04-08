/* =========================================================
   FORM.JS — Contact form validation & submission handling
   ========================================================= */

'use strict';

/* ── VALIDATORS ──────────────────────────────────────────── */

const VALIDATORS = {
  name: {
    validate: (val) => val.trim().length >= 2,
    message: 'Name must be at least 2 characters.'
  },
  email: {
    validate: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim()),
    message: 'Please enter a valid email address.'
  },
  subject: {
    validate: (val) => val.trim().length >= 3,
    message: 'Subject must be at least 3 characters.'
  },
  message: {
    validate: (val) => val.trim().length >= 10,
    message: 'Message must be at least 10 characters.'
  }
};

/* ── HELPERS ─────────────────────────────────────────────── */

/**
 * Shows an error message for a given field.
 * @param {HTMLElement} input
 * @param {string} message
 */
function showError(input, message) {
  input.classList.add('error');
  input.setAttribute('aria-invalid', 'true');

  const errorEl = document.getElementById(`${input.id}-error`);
  if (errorEl) {
    errorEl.textContent = message;
  }
}

/**
 * Clears the error state for a given field.
 * @param {HTMLElement} input
 */
function clearError(input) {
  input.classList.remove('error');
  input.removeAttribute('aria-invalid');

  const errorEl = document.getElementById(`${input.id}-error`);
  if (errorEl) {
    errorEl.textContent = '';
  }
}

/**
 * Validates a single field and returns true if valid.
 * @param {HTMLElement} input
 * @returns {boolean}
 */
function validateField(input) {
  const fieldName = input.name;
  const validator = VALIDATORS[fieldName];
  if (!validator) return true;

  const isValid = validator.validate(input.value);

  if (!isValid) {
    showError(input, validator.message);
  } else {
    clearError(input);
  }

  return isValid;
}

/**
 * Validates all fields in the form.
 * @param {HTMLFormElement} form
 * @returns {boolean} True if all fields are valid.
 */
function validateForm(form) {
  const inputs = form.querySelectorAll('[aria-required="true"]');
  let isValid = true;

  inputs.forEach(input => {
    if (!validateField(input)) {
      isValid = false;
    }
  });

  // Focus first invalid field
  if (!isValid) {
    const firstError = form.querySelector('.error');
    if (firstError) firstError.focus();
  }

  return isValid;
}

/* ── SUBMIT HANDLER ──────────────────────────────────────── */

/**
 * Simulates a form submission with a loading state,
 * then shows a success message. (No backend — as per spec.)
 * @param {HTMLFormElement} form
 */
function handleSubmit(form) {
  const submitBtn  = form.querySelector('#submitBtn');
  const successMsg = form.querySelector('#formSuccess');

  // Set loading state
  submitBtn.classList.add('loading');
  submitBtn.disabled = true;

  // Simulate async submission (e.g., could be replaced with fetch())
  setTimeout(() => {
    // Reset loading
    submitBtn.classList.remove('loading');
    submitBtn.disabled = false;

    // Show success message
    if (successMsg) {
      successMsg.hidden = false;
      successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Reset form
    form.reset();

    // Clear all error states
    form.querySelectorAll('.form-input').forEach(clearError);

    // Hide success after 6s
    setTimeout(() => {
      if (successMsg) successMsg.hidden = true;
    }, 6000);

  }, 1400);
}

/* ── LIVE VALIDATION (on blur + input after first error) ─── */

function initLiveValidation(form) {
  const inputs = form.querySelectorAll('.form-input');

  inputs.forEach(input => {
    // Validate on blur
    input.addEventListener('blur', () => {
      if (input.getAttribute('aria-required') === 'true') {
        validateField(input);
      }
    });

    // Clear error while typing after it's been triggered
    input.addEventListener('input', () => {
      if (input.classList.contains('error')) {
        validateField(input);
      }
    });
  });
}

/* ── CHAR COUNTER FOR TEXTAREA ───────────────────────────── */

function initCharCounter(form) {
  const textarea = form.querySelector('#message');
  if (!textarea) return;

  const counter = document.createElement('span');
  counter.className = 'char-counter';
  counter.setAttribute('aria-live', 'polite');
  counter.style.cssText = `
    font-size: 0.72rem;
    color: var(--text-muted);
    font-family: 'JetBrains Mono', monospace;
    text-align: right;
    display: block;
    margin-top: -4px;
  `;

  textarea.parentNode.insertBefore(counter, textarea.nextSibling);

  const update = () => {
    const len   = textarea.value.length;
    const max   = 500;
    counter.textContent = `${len} / ${max}`;
    counter.style.color = len > max * 0.9 ? '#ef4444' : 'var(--text-muted)';

    if (len > max) {
      textarea.value = textarea.value.slice(0, max);
    }
  };

  textarea.addEventListener('input', update);
  update();
}

/* ── INIT ─────────────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  if (!form) return;

  initLiveValidation(form);
  initCharCounter(form);

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Run full validation
    if (!validateForm(form)) return;

    handleSubmit(form);
  });
});
