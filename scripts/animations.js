/**
 * Banex Mall Animation Scripts
 * Handles scroll-triggered animations and interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  // Intersection Observer for fade-up animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const fadeUpObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-up--visible');
        fadeUpObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all fade-up elements
  document.querySelectorAll('.fade-up').forEach(el => {
    fadeUpObserver.observe(el);
  });

  // Parallax effect for hero (subtle)
  const heroSection = document.querySelector('.hero-section');
  if (heroSection) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const heroBackground = heroSection.querySelector('.hero-background');
      
      if (heroBackground && scrolled < heroSection.offsetHeight) {
        heroBackground.style.transform = `translateY(${scrolled * 0.3}px)`;
      }
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  // Dynamic text rotation for hero
  const dynamicTexts = [
    "100+ brands waiting to be discovered",
    "Fresh meals from breakfast to late night",
    "Where families make memories every weekend",
    "Your favorite cinema is right here",
    "Work smarter in our modern co-working spaces"
  ];
  
  const dynamicTextEl = document.querySelector('.dynamic-text__item');
  if (dynamicTextEl) {
    let currentIndex = 0;
    
    setInterval(() => {
      currentIndex = (currentIndex + 1) % dynamicTexts.length;
      dynamicTextEl.style.opacity = '0';
      
      setTimeout(() => {
        dynamicTextEl.textContent = dynamicTexts[currentIndex];
        dynamicTextEl.style.opacity = '0.8';
      }, 500);
    }, 4000);
  }

  // Header background change on scroll
  const header = document.querySelector('.header');
  if (header) {
    const updateHeaderBg = () => {
      const scrolled = window.pageYOffset;
      if (scrolled > 50) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = 'var(--shadow-md)';
      } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
      }
    };

    window.addEventListener('scroll', updateHeaderBg, { passive: true });
  }
});