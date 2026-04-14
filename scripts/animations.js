// Banex Mall - Animations JavaScript
// Handles scroll-triggered animations and micro-interactions

class AnimationManager {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupParallaxEffects();
        this.setupHoverAnimations();
        this.setupRevealAnimations();
    }

    // Setup scroll-triggered animations
    setupScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Add staggered animation for children
                    const children = entry.target.querySelectorAll(':scope > *'); 
                    children.forEach((child, index) => {
                        child.style.animationDelay = `${index * 0.1}s`;
                        child.classList.add('stagger-in');
                    });
                }
            });
        }, this.observerOptions);

        // Observe all sections
        document.querySelectorAll('section').forEach(section => {
            section.classList.add('fade-section');
            observer.observe(section);
        });
    }

    // Setup parallax effects
    setupParallaxEffects() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        if (parallaxElements.length === 0) return;
        
        window.addEventListener('scroll', () => {
            const scrollY = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = parseFloat(element.dataset.parallax) || 0.5;
                const yPos = scrollY * speed;
                element.style.transform = `translateY(${yPos}px)`;
            });
        }, { passive: true });
    }

    // Setup hover animations
    setupHoverAnimations() {
        // Card hover effects
        const cards = document.querySelectorAll('.card, .store-card, .event-card, .offer-card, .dining-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.classList.add('card-hovered');
            });
            
            card.addEventListener('mouseleave', () => {
                card.classList.remove('card-hovered');
            });
        });
        
        // Button hover effects
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                button.classList.add('btn-hovered');
            });
            
            button.addEventListener('mouseleave', () => {
                button.classList.remove('btn-hovered');
            });
            
            // Click animation
            button.addEventListener('click', (e) => {
                button.classList.add('btn-clicked');
                setTimeout(() => {
                    button.classList.remove('btn-clicked');
                }, 200);
            });
        });
        
        // Link hover effects
        const links = document.querySelectorAll('a, .nav-link, .drawer-link');
        
        links.forEach(link => {
            link.addEventListener('mouseenter', () => {
                link.classList.add('link-hovered');
            });
            
            link.addEventListener('mouseleave', () => {
                link.classList.remove('link-hovered');
            });
        });
    }

    // Setup reveal animations on scroll
    setupRevealAnimations() {
        const revealElements = document.querySelectorAll('[data-reveal]');
        
        if (revealElements.length === 0) return;
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.dataset.revealDelay || 0;
                    setTimeout(() => {
                        entry.target.classList.add('revealed');
                    }, delay);
                    
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });
        
        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    }

    // Add animation class to element
    animateElement(element, animation = 'fadeInUp', duration = 0.8) {
        element.style.animation = `${animation} ${duration}s ease-out forwards`;
    }

    // Remove animation class
    resetAnimation(element) {
        element.style.animation = '';
        element.classList.remove('animate-in', 'stagger-in');
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new AnimationManager();
});

// Export for global use
window.AnimationManager = AnimationManager;