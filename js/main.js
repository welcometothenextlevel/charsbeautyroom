/* ============================================================
   CHAR'S BEAUTY ROOM — main.js
   Hamburger nav toggle + IntersectionObserver scroll reveal
   Pure vanilla JS — zero dependencies
   ============================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     HAMBURGER NAV — FIXED
     Toggles .nav-open on .site-nav so CSS can show/hide menu
  ---------------------------------------------------------- */
  var hamburger = document.getElementById('hamburger');
  var mobileNav = document.getElementById('mobileNav');
  var siteNav   = document.querySelector('.site-nav');

  if (hamburger && mobileNav && siteNav) {

    hamburger.addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = siteNav.classList.toggle('nav-open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close on any link inside mobile nav
    var mobileLinks = mobileNav.querySelectorAll('a');
    mobileLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        siteNav.classList.remove('nav-open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!siteNav.contains(e.target)) {
        siteNav.classList.remove('nav-open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ----------------------------------------------------------
     SCROLL REVEAL — IntersectionObserver
  ---------------------------------------------------------- */
  if ('IntersectionObserver' in window) {
    var revealEls = document.querySelectorAll('.reveal');

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* ----------------------------------------------------------
     SHR TABS
  ---------------------------------------------------------- */
  var tabBtns   = document.querySelectorAll('.tab-btn');
  var tabPanels = document.querySelectorAll('.tab-panel');

  if (tabBtns.length > 0) {
    tabBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var target = btn.getAttribute('data-tab');
        tabBtns.forEach(function (b) { b.classList.remove('active'); });
        tabPanels.forEach(function (p) { p.classList.remove('active'); });
        btn.classList.add('active');
        var panel = document.getElementById(target);
        if (panel) { panel.classList.add('active'); }
      });
    });
  }

  /* ----------------------------------------------------------
     FAQ ACCORDION
  ---------------------------------------------------------- */
  var faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(function (item) {
    var question = item.querySelector('.faq-question');
    var answer   = item.querySelector('.faq-answer');

    if (question && answer) {
      question.addEventListener('click', function () {
        var isOpen = item.classList.toggle('open');
        question.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });
    }
  });

  /* ----------------------------------------------------------
     HERO SMOOTH SCROLL — "Explore Treatments" button
  ---------------------------------------------------------- */
  var exploreBtn = document.getElementById('exploreBtn');
  if (exploreBtn) {
    exploreBtn.addEventListener('click', function (e) {
      e.preventDefault();
      var target = document.getElementById('services');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  /* ----------------------------------------------------------
     SMOOTH SCROLL — anchor links starting with #
  ---------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = anchor.getAttribute('href').slice(1);
      if (!targetId) return;
      var targetEl = document.getElementById(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* ----------------------------------------------------------
     VIEW MORE RESULTS TOGGLE
  ---------------------------------------------------------- */
  var toggleBtn = document.getElementById('results-toggle-btn');
  var row2 = document.getElementById('results-row-2');

  if (toggleBtn && row2) {
    toggleBtn.addEventListener('click', function () {
      var isOpen = row2.classList.toggle('hp-results-open');
      row2.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
      toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      toggleBtn.textContent = isOpen ? 'Show Less' : 'View More Results';

      // Observe new reveal elements in row 2
      if (isOpen && 'IntersectionObserver' in window) {
        row2.querySelectorAll('.reveal:not(.visible)').forEach(function (el) {
          var obs = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
              if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
              }
            });
          }, { threshold: 0.12 });
          obs.observe(el);
        });
      }
    });
  }

})();

/* ----------------------------------------------------------
   ABOUT EXPANDABLE SECTION (Homepage v5)
---------------------------------------------------------- */
(function () {
  var expandBtn     = document.getElementById('about-expand-btn');
  var expandContent = document.getElementById('about-expand-content');
  if (expandBtn && expandContent) {
    expandBtn.addEventListener('click', function () {
      var isOpen = expandContent.classList.toggle('hp-expand-open');
      expandContent.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
      expandBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      expandBtn.textContent = isOpen ? 'Show Less −' : 'About Charmayne +';
    });
  }
})();

// --- Popup modal (homepage only, sessionStorage, 3s delay) ---
(function () {
  if (!document.querySelector('.hp-popup-overlay')) return;
  if (sessionStorage.getItem('hp-popup-shown')) return;
  setTimeout(function () {
    var overlay = document.querySelector('.hp-popup-overlay');
    if (overlay) {
      overlay.classList.add('active');
      sessionStorage.setItem('hp-popup-shown', '1');
    }
  }, 3000);
  function closePopup() {
    var overlay = document.querySelector('.hp-popup-overlay');
    if (overlay) overlay.classList.remove('active');
  }
  document.addEventListener('click', function (e) {
    if (e.target.classList.contains('hp-popup-overlay')) closePopup();
    if (e.target.classList.contains('hp-popup-close')) closePopup();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closePopup();
  });
})();
