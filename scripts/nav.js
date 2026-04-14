// Banex Mall - Navigation JavaScript
// Handles sticky nav, mobile drawer, and nav interactions

class NavigationManager {
    constructor() {
        this.nav = null;
        this.mobileDrawer = null;
        this.isScrolled = false;
        this.isDrawerOpen = false;
        
        this.init();
    }

    init() {
        this.nav = document.getElementById('mainNav');
        this.mobileDrawer = document.getElementById('mobileDrawer');
        
        if (!this.nav) return;
        
        this.setupStickyNav();
        this.setupMobileDrawer();
        this.setupNavScroll();
    }

    // Setup sticky navigation behavior
    setupStickyNav() {
        const nav = this.nav;
        
        // Initial state
        this.updateNavState();
        
        // Listen for scroll
        window.addEventListener('scroll', () => {
            this.updateNavState();
        }, { passive: true });
    }

    // Update navigation state based on scroll position
    updateNavState() {
        const isScrolled = window.scrollY > 50;
        
        if (isScrolled !== this.isScrolled) {
            this.isScrolled = isScrolled;
            
            if (this.isScrolled) {
                this.nav.classList.add('nav-scrolled');
            } else {
                this.nav.classList.remove('nav-scrolled');
            }
        }
    }

    // Setup mobile drawer
    setupMobileDrawer() {
        const navToggle = document.getElementById('navToggle');
        const drawerClose = document.getElementById('drawerClose');
        const drawerOverlay = document.querySelector('.drawer-overlay');
        
        if (!navToggle || !this.mobileDrawer) return;
        
        // Open drawer
        navToggle.addEventListener('click', () => {
            this.openDrawer();
        });
        
        // Close drawer
        if (drawerClose) {
            drawerClose.addEventListener('click', () => {
                this.closeDrawer();
            });
        }
        
        // Close on overlay click
        if (drawerOverlay) {
            drawerOverlay.addEventListener('click', () => {
                this.closeDrawer();
            });
        }
        
        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isDrawerOpen) {
                this.closeDrawer();
            }
        });
        
        // Close on link click
        const drawerLinks = document.querySelectorAll('.drawer-link');
        drawerLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeDrawer();
            });
        });
    }

    // Open mobile drawer
    openDrawer() {
        if (!this.mobileDrawer) return;
        
        this.mobileDrawer.classList.add('drawer-open');
        document.body.style.overflow = 'hidden';
        this.isDrawerOpen = true;
        
        // Focus first link for accessibility
        setTimeout(() => {
            const firstLink = this.mobileDrawer.querySelector('.drawer-link');
            if (firstLink) firstLink.focus();
        }, 100);
    }

    // Close mobile drawer
    closeDrawer() {
        if (!this.mobileDrawer) return;
        
        this.mobileDrawer.classList.remove('drawer-open');
        document.body.style.overflow = '';
        this.isDrawerOpen = false;
        
        // Return focus to toggle button
        const navToggle = document.getElementById('navToggle');
        if (navToggle) navToggle.focus();
    }

    // Setup scroll-based nav behavior
    setupNavScroll() {
        let lastScroll = 0;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            // Hide nav on scroll down, show on scroll up
            if (currentScroll > lastScroll && currentScroll > 200) {
                this.nav.classList.add('nav-hidden');
            } else {
                this.nav.classList.remove('nav-hidden');
            }
            
            lastScroll = currentScroll;
        }, { passive: true });
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new NavigationManager();
});

// Export for global use
window.NavigationManager = NavigationManager;