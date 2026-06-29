/* ============================================================
   CHAR'S BEAUTY ROOM — main.js
   Hamburger nav toggle + IntersectionObserver scroll reveal
   Pure vanilla JS — zero dependencies
   ============================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     HAMBURGER NAV
  ---------------------------------------------------------- */
  var hamburger = document.getElementById('hamburger');
  var mobileNav = document.getElementById('mobileNav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function () {
      var isOpen = mobileNav.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close mobile nav on link click
    var mobileLinks = mobileNav.querySelectorAll('a');
    mobileLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        mobileNav.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
        mobileNav.classList.remove('open');
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
    // Fallback: just show everything
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* ----------------------------------------------------------
     SHR TABS
  ---------------------------------------------------------- */
  var tabBtns = document.querySelectorAll('.tab-btn');
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
    var answer = item.querySelector('.faq-answer');

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

})();
