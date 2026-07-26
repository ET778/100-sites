/**
 * 启源阀门 QIYUAN VALVE - Site Scripts
 * 纯原生 JavaScript，无框架依赖
 */

(function () {
  'use strict';

  /* ============================================
     Mobile Navigation
     ============================================ */
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileClose = document.getElementById('mobileClose');
  const mobileOverlay = document.getElementById('mobileOverlay');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  function openMobileMenu() {
    mobileMenu.classList.add('active');
    mobileOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileMenu.classList.remove('active');
    mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (navToggle) {
    navToggle.addEventListener('click', openMobileMenu);
  }

  if (mobileClose) {
    mobileClose.addEventListener('click', closeMobileMenu);
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', closeMobileMenu);
  }

  mobileLinks.forEach(function (link) {
    link.addEventListener('click', closeMobileMenu);
  });

  /* ============================================
     Form Validation & Submission
     ============================================ */
  const inquiryForm = document.getElementById('inquiryForm');
  const formSuccess = document.getElementById('formSuccess');
  const resetFormBtn = document.getElementById('resetForm');

  if (inquiryForm) {
    inquiryForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const nameInput = document.getElementById('name');
      const companyInput = document.getElementById('company');
      const phoneInput = document.getElementById('phone');

      let isValid = true;

      // Validate Name
      if (!validateField(nameInput, 'nameError', function (val) {
        return val.trim().length > 0;
      })) {
        isValid = false;
      }

      // Validate Company
      if (!validateField(companyInput, 'companyError', function (val) {
        return val.trim().length > 0;
      })) {
        isValid = false;
      }

      // Validate Phone
      if (!validateField(phoneInput, 'phoneError', function (val) {
        // Allow digits, spaces, dashes, plus, parentheses
        var phoneRegex = /^[\d\s\-+()]+$/;
        return val.trim().length >= 7 && phoneRegex.test(val.trim());
      })) {
        isValid = false;
      }

      if (isValid) {
        // Show success state
        inquiryForm.style.display = 'none';
        formSuccess.classList.add('active');

        // Reset form for next time
        inquiryForm.reset();
      }
    });

    // Real-time validation: clear error on input
    ['name', 'company', 'phone'].forEach(function (fieldId) {
      var input = document.getElementById(fieldId);
      if (input) {
        input.addEventListener('input', function () {
          clearFieldError(input, fieldId + 'Error');
        });
      }
    });
  }

  // Reset form button
  if (resetFormBtn) {
    resetFormBtn.addEventListener('click', function () {
      formSuccess.classList.remove('active');
      inquiryForm.style.display = 'flex';
    });
  }

  /**
   * Validate a single form field
   * @param {HTMLInputElement} input - The input element
   * @param {string} errorId - The error message element ID
   * @param {Function} validator - Validation function returning boolean
   * @returns {boolean} - Whether the field is valid
   */
  function validateField(input, errorId, validator) {
    var isValid = validator(input.value);
    var errorEl = document.getElementById(errorId);

    if (!isValid) {
      input.classList.add('error');
      if (errorEl) {
        errorEl.classList.add('visible');
      }
    } else {
      input.classList.remove('error');
      if (errorEl) {
        errorEl.classList.remove('visible');
      }
    }

    return isValid;
  }

  /**
   * Clear error state from a field
   * @param {HTMLInputElement} input - The input element
   * @param {string} errorId - The error message element ID
   */
  function clearFieldError(input, errorId) {
    input.classList.remove('error');
    var errorEl = document.getElementById(errorId);
    if (errorEl) {
      errorEl.classList.remove('visible');
    }
  }

  /* ============================================
     Navbar Scroll Effect
     ============================================ */
  const navbar = document.getElementById('navbar');
  var lastScrollY = window.scrollY;

  function handleScroll() {
    var currentScrollY = window.scrollY;

    // Add shadow when scrolled
    if (currentScrollY > 10) {
      navbar.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
    } else {
      navbar.style.boxShadow = 'none';
    }

    lastScrollY = currentScrollY;
  }

  window.addEventListener('scroll', handleScroll);

  /* ============================================
     Smooth Scroll for Anchor Links
     ============================================ */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        var navHeight = navbar ? navbar.offsetHeight : 72;
        var targetPosition = targetEl.getBoundingClientRect().top + window.scrollY - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

})();
