// Banex Mall - Main Application JavaScript
// Core functionality and utilities

// Global app state
const App = {
    isLoaded: false,
    isScrolled: false,
    currentSection: 'hero',
    
    // Initialize the application
    init() {
        this.setupEventListeners();
        this.setupScrollHandling();
        this.setupSmoothScroll();
        this.isLoaded = true;
        console.log('Banex Mall App Initialized');
    },
    
    // Setup global event listeners
    setupEventListeners() {
        // Handle page visibility
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseAnimations();
            } else {
                this.resumeAnimations();
            }
        });
        
        // Handle window resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.handleResize();
            }, 250);
        });
        
        // Handle online/offline status
        window.addEventListener('online', () => {
            this.showNotification('Connection restored', 'success');
        });
        
        window.addEventListener('offline', () => {
            this.showNotification('You are offline', 'warning');
        });
    },
    
    // Setup scroll handling
    setupScrollHandling() {
        let lastScroll = 0;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            // Update scroll state
            this.isScrolled = currentScroll > 50;
            
            // Determine current section
            this.updateCurrentSection();
            
            lastScroll = currentScroll;
        }, { passive: true });
    },
    
    // Update current section based on scroll position
    updateCurrentSection() {
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                if (this.currentSection !== sectionId) {
                    this.currentSection = sectionId;
                    this.onSectionChange(sectionId);
                }
            }
        });
    },
    
    // Handle section changes
    onSectionChange(sectionId) {
        // Update nav links if needed
        const navLinks = document.querySelectorAll('.nav-ink');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('active');
            }
        });
    },
    
    // Setup smooth scroll for anchor links
    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const targetId = anchor.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    },
    
    // Handle window resize
    handleResize() {
        // Recalculate any dynamic elements
        this.updateCurrentSection();
    },
    
    // Pause animations when tab is hidden
    pauseAnimations() {
        document.body.style.animationPlayState = 'paused';
    },
    
    // Resume animations when tab is visible
    resumeAnimations() {
        document.body.style.animationPlayState = 'running';
    },
    
    // Show notification toast
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Add to DOM
        document.body.appendChild(notification);
        
        // Trigger animation
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Remove after delay
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    },
    
    // Debounce utility
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Throttle utility
    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
};

// Utility functions
const Utils = {
    // Format date
    formatDate(date, format = 'long') {
        const d = new Date(date);
        const options = format === 'short' 
            ? { month: 'short', day: 'numeric' }
            : { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
        return d.toLocaleDateString('en-US', options);
    },
    
    // Format time
    formatTime(time) {
        const [hours, minutes] = time.split(':');
        const h = parseInt(hours);
        const ampm = h >= 12 ? 'PM' : 'AM';
        const hour = h % 12 || 12;
        return `${hour}:${minutes} ${ampm}`;
    },
    
    // Format currency
    formatCurrency(amount, currency = 'NGN') {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 0
        }).format(amount);
    },
    
    // Get time remaining
    getTimeRemaining(endtime) {
        const total = Date.parse(endtime) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
        const days = Math.floor(total / (1000 * 60 * 60 * 24));
        
        return {
            total,
            days,
            hours,
            minutes,
            seconds
        };
    },
    
    // Lazy load images
    lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    },
    
    // Check if element is in viewport
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});

// Export for global use
window.App = App;
window.Utils = Utils;