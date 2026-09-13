(function () {
  'use strict';

  // mobile nav toggle
  var navToggle = document.getElementById('navToggle');
  var mainNav = document.getElementById('main-nav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      var open = mainNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(open));
    });
    mainNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mainNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // FAQ accordion
  document.querySelectorAll('.faq-q').forEach(function (btn) {
    var answer = btn.nextElementSibling;
    btn.addEventListener('click', function () {
      var expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      answer.style.maxHeight = expanded ? '0px' : answer.scrollHeight + 'px';
    });
  });

  // scroll reveal: only hide-then-fade elements once JS + IO + motion prefs allow it,
  // so anyone without JS simply sees everything already visible.
  var prefersMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: no-preference)').matches;
  var revealTargets = document.querySelectorAll('.reveal');
  if (prefersMotion && 'IntersectionObserver' in window && revealTargets.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealTargets.forEach(function (el) {
      el.classList.add('pre');
      observer.observe(el);
    });
  }

  // entry form: client-side confirmation (wire up to a backend/email service on deploy)
  var form = document.getElementById('entryForm');
  var status = document.getElementById('formStatus');
  if (form && status) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      status.classList.add('show');
      form.reset();
      status.setAttribute('tabindex', '-1');
      status.focus();
    });
  }
})();
