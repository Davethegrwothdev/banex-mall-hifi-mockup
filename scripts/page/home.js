// Banex Mall Homepage JavaScript
// Handles dynamic content loading and interactions

class HomepageManager {
    constructor() {
        this.init();
    }

    init() {
        this.loadFeaturedStores();
        this.loadLiveEvents();
        this.loadCurrentOffers();
        this.setupScrollAnimations();
        this.setupInteractiveElements();
    }

    // Load featured stores from JSON
    async loadFeaturedStores() {
        try {
            const response = await fetch('/data/stores.json');
            const data = await response.json();
            const featuredStores = data.featured || [];
            
            const container = document.getElementById('featuredStores');
            if (!container) return;

            container.innerHTML = featuredStores.map(store => this.createStoreCard(store)).join('');
            
            // Add hover effects
            this.setupStoreCardInteractions();
        } catch (error) {
            console.error('Error loading featured stores:', error);
            this.showFallbackStores();
        }
    }

    // Load live events from JSON
    async loadLiveEvents() {
        try {
            const response = await fetch('/data/events.json');
            const data = await response.json();
            const liveEvents = data.live || [];
            const upcomingEvents = data.upcoming || [];
            
            const container = document.getElementById('liveEvents');
            if (!container) return;

            const allEvents = [...liveEvents, ...upcomingEvents.slice(0, 2)];
            container.innerHTML = allEvents.map(event => this.createEventCard(event)).join('');
        } catch (error) {
            console.error('Error loading events:', error);
            this.showFallbackEvents();
        }
    }

    // Load current offers from JSON
    async loadCurrentOffers() {
        try {
            const response = await fetch('/data/events.json');
            const data = await response.json();
            const offers = data.offers || [];
            
            const container = document.getElementById('currentOffers');
            if (!container) return;

            container.innerHTML = offers.map(offer => this.createOfferCard(offer)).join('');
            
            // Add countdown timers
            this.setupOfferCountdowns();
        } catch (error) {
            console.error('Error loading offers:', error);
            this.showFallbackOffers();
        }
    }

    // Create store card HTML
    createStoreCard(store) {
        return `
            <div class="store-card" data-store-id="${store.id}">
                <div class="store-image">
                    <img src="${store.image}" alt="${store.name}" loading="lazy">
                    <div class="store-overlay">
                        <button class="btn btn-primary btn-small">View Store</button>
                    </div>
                </div>
                <div class="store-content">
                    <div class="store-header">
                        <h3>${store.name}</h3>
                        <span class="floor-badge">${store.floor}</span>
                    </div>
                    <p class="store-description">${store.description}</p>
                    <div class="store-category">
                        <span class="category-tag category-${store.category.toLowerCase()}">${store.category}</span>
                    </div>
                </div>
    </div>
        `;
    }

    // Create event card HTML
    createEventCard(event) {
        const badgeClass = `badge-${event.badgeType}`;
        return `
            <div class="event-card">
                <div class="event-image">
                    <img src="${event.image}" alt="${event.title}" loading="lazy">
                    <span class="event-badge ${badgeClass}">${event.badge}</span>
                </div>
                <div class="event-content">
                    <h3>${event.title}</h3>
                    <p>${event.description}</p>
                    <div class="event-details">
                        <div class="event-detail">
                            <i data-lucide="calendar"></i>
                            <span>${event.date}</span>
                        </div>
                        <div class="event-detail">
                            <i data-lucide="clock"></i>
                            <span>${event.time}</span>
                        </div>
                        <div class="event-detail">
                            <i data-lucide="map-pin"></i>
                            <span>${event.location}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Create offer card HTML
    createOfferCard(offer) {
        const badgeClass = `badge-${offer.badgeType}`;
        return `
            <div class="offer-card" data-offer-id="${offer.id}" data-ends-at="${offer.endsAt}">
                <div class="offer-image">
                    <img src="${offer.image}" alt="${offer.title}" loading="lazy">
                    <div class="offer-discount">${offer.discount}</div>
                </div>
                <div class="offer-content">
                    <div class="offer-header">
                        <h3>${offer.title}</h3>
                        <span class="offer-badge ${badgeClass}">${offer.badge}</span>
                    </div>
                    <p>${offer.description}</p>
                    <div class="offer-store">${offer.store}</div>
                    <div class="offer-countdown" data-ends="${offer.endsAt}"></div>
                </div>
            </div>
        `;
    }

    // Setup store card interactions
    setupStoreCardInteractions() {
        const storeCards = document.querySelectorAll('.store-card');
        storeCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.classList.add('card-hover');
            });
            
            card.addEventListener('mouseleave', () => {
                card.classList.remove('card-hover');
            });

            // Add click handler
            card.addEventListener('click', (e) => {
                if (!e.target.closest('button')) {
                    const storeId = card.dataset.storeId;
                    window.location.href = `/pages/store-detail.html?store=${storeId}`;
                }
            });
        });
    }

    // Setup offer countdowns
    setupOfferCountdowns() {
        const countdownElements = document.querySelectorAll('.offer-countdown');
        
        countdownElements.forEach(element => {
            const endsAt = element.dataset.ends;
            if (endsAt) {
                this.startCountdown(element, endsAt);
            }
        });
    }

    // Start countdown timer
    startCountdown(element, endTime) {
        const updateCountdown = () => {
            const now = new Date().getTime();
            const end = new Date(endTime).getTime();
            const distance = end - now;

            if (distance < 0) {
                element.innerHTML = '<span class="expired">Offer Expired</span>';
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            let countdownText = '';
            if (days > 0) {
                countdownText = `${days}d ${hours}h left`;
            } else if (hours > 0) {
                countdownText = `${hours}h ${minutes}m left`;
            } else {
                countdownText = `${minutes}m ${seconds}s left`;
            }

            element.innerHTML = `<span class="countdown">${countdownText}</span>`;
        };

        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    // Setup scroll animations
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe sections for animation
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            observer.observe(section);
        });

        // Observe cards for staggered animation
        const cards = document.querySelectorAll('.store-card, .event-card, .offer-card, .dining-card');
        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            observer.observe(card);
        });
    }

    // Setup interactive elements
    setupInteractiveElements() {
        // Quick actions hover effects
        const actionCards = document.querySelectorAll('.action-card');
        actionCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.classList.add('action-hover');
            });
            
            card.addEventListener('mouseleave', () => {
                card.classList.remove('action-hover');
            });
        });

        // Hero scroll indicator
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.addEventListener('click', () => {
                document.querySelector('#quickActions').scrollIntoView({
                    behavior: 'smooth'
                });
            });
        }

        // CTA button interactions
        const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
        ctaButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                // Add click animation
                button.classList.add('btn-click');
                setTimeout(() => {
                    button.classList.remove('btn-click');
                }, 200);
            });
        });
    }

    // Fallback methods for when JSON loading fails
    showFallbackStores() {
        const container = document.getElementById('featuredStores');
        if (!container) return;

        const fallbackStores = [
            {
                name: "Nike",
                category: "Fashion",
                floor: "Ground Floor",
                description: "Premium athletic footwear and apparel"
            },
            {
                name: "Samsung",
                category: "Technology", 
                floor: "First Floor",
                description: "Latest smartphones and electronics"
            },
            {
                name: "Filmhouse Cinemas",
                category: "Entertainment",
                floor: "Third Floor", 
                description: "Luxury cinema experience"
            },
            {
                name: "KFC",
                category: "Dining",
                floor: "Food Court",
                description: "Famous fried chicken and sides"
            }
        ];

        container.innerHTML = fallbackStores.map(store => this.createStoreCard(store)).join('');
    }

    showFallbackEvents() {
        const container = document.getElementById('liveEvents');
        if (!container) return;

        container.innerHTML = `
            <div class="event-card">
                <div class="event-content">
                    <h3>Spring Fashion Week</h3>
                    <p>Exclusive runway shows featuring top designers</p>
                    <div class="event-details">
                        <div class="event-detail">
                            <i data-lucide="calendar"></i>
                            <span>April 14-20, 2026</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    showFallbackOffers() {
        const container = document.getElementById('currentOffers');
        if (!container) return;

        container.innerHTML = `
            <div class="offer-card">
                <div class="offer-content">
                    <h3>50% Off Selected Items</h3>
                    <p>Limited time offer on premium brands</p>
                    <div class="offer-store">Various Stores</div>
                </div>
            </div>
        `;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new HomepageManager();
});

// Export for use in other scripts
window.HomepageManager = HomepageManager;
