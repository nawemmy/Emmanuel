document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const toggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggle) {
    toggle.addEventListener('click', () => navLinks.classList.toggle('open'));
    navLinks.querySelectorAll('a').forEach(link =>
      link.addEventListener('click', () => navLinks.classList.remove('open'))
    );
  }

  // Animated stat counters
  const counters = document.querySelectorAll('.stat-num');
  const animateCounter = (el) => {
    const target = +el.dataset.target;
    const duration = 2000;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target).toLocaleString();
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString() + '+';
    };
    requestAnimationFrame(step);
  };

  // Scroll-triggered fade-in animations
  const fadeEls = document.querySelectorAll('.about, .videos, .cta, .connect, .video-card, .about-text, .about-image');
  fadeEls.forEach(el => el.classList.add('fade-in'));

  let statsAnimated = false;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        if (!statsAnimated && entry.target.closest('.hero')) {
          counters.forEach(animateCounter);
          statsAnimated = true;
        }
      }
    });
  }, { threshold: 0.15 });

  fadeEls.forEach(el => observer.observe(el));

  // Animate stats on load since they're in the hero
  setTimeout(() => {
    if (!statsAnimated) {
      counters.forEach(animateCounter);
      statsAnimated = true;
    }
  }, 500);

  // Smooth parallax on hero
  window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero-content');
    if (hero) {
      const scroll = window.scrollY;
      hero.style.transform = `translateY(${scroll * 0.3}px)`;
      hero.style.opacity = 1 - scroll / 800;
    }
  });
});
