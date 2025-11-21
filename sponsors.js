// Health Hack 2026

document.addEventListener('DOMContentLoaded', () => {
  initHamburgerMenu();
  initSmoothScroll();
  initScrollAnimations();
  initNavbarScroll();
});

function initHamburgerMenu() {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');

  if (!hamburger || !navMenu) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  const navLinks = navMenu.querySelectorAll('.sp-nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  document.addEventListener('click', (event) => {
    const isClickInsideNav = navMenu.contains(event.target);
    const isClickOnHamburger = hamburger.contains(event.target);

    if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    }
  });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');

      if (href === '#' || href === '#brochure-download') {
        e.preventDefault();
        return;
      }

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const navbarHeight = document.querySelector('.sp-navbar').offsetHeight;
        const targetPosition = target.offsetTop - navbarHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

function initScrollAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll('.sp-highlight-card, .sp-reason-card');
  animatedElements.forEach((element, index) => {
    element.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(element);
  });
}

function initNavbarScroll() {
  const navbar = document.querySelector('.sp-navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
      navbar.style.background = 'rgba(0, 27, 255, 0.25)';
      navbar.style.backdropFilter = 'blur(16px)';
    } else {
      navbar.style.background = 'rgba(0, 27, 255, 0.15)';
      navbar.style.backdropFilter = 'blur(14px)';
    }

    lastScroll = currentScroll;
  });
}