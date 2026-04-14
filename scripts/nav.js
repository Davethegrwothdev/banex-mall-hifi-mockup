/**
 * Banex Mall Navigation Scripts
 * Handles sticky header, mobile menu, and navigation interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  // Header scroll behavior
  const header = document.querySelector('.header');
  const statusBar = document.querySelector('.live-status-bar');
  
  let lastScroll = 0;
  const scrollThreshold = 50;
  
  function handleScroll() {
    const currentScroll = window.pageYOffset;
    
    // Add scrolled class when past threshold
    if (currentScroll > scrollThreshold) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
    
    lastScroll = currentScroll;
  }
  
  // Throttled scroll handler
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  });
  
  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      // Toggle mobile drawer - implementation depends on mobile drawer component
      console.log('Mobile menu toggle clicked');
    });
  }
  
  // Active nav link on scroll
  const sections = document.querySelectorAll('section[id]');
  
  function highlightNavOnScroll() {
    const scrollPos = window.pageYOffset + 200;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        document.querySelectorAll('.header__nav-link').forEach(link => {
          link.classList.remove('header__nav-link--active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('header__nav-link--active');
          }
        });
      }
    });
  }
  
  window.addEventListener('scroll', highlightNavOnScroll);
});