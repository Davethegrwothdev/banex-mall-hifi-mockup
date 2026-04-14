/**
 * Banex Mall Homepage - Page Specific JavaScript
 * Handles floor switcher, deal filters, and interactive features
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all homepage features
  initFloorSwitcher();
  initDealsFilter();
});

/**
 * Floor Switcher - Interactive map floor navigation
 */
function initFloorSwitcher() {
  const floorButtons = document.querySelectorAll('.floor-btn');
  const mapPreview = document.querySelector('.map-preview');
  
  if (!floorButtons.length) return;
  
  floorButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      // Remove active class from all buttons
      floorButtons.forEach(b => b.classList.remove('floor-btn--active'));
      
      // Add active class to clicked button
      this.classList.add('floor-btn--active');
      
      const floor = this.dataset.floor;
      
      // Animate map preview based on floor selection
      if (mapPreview) {
        mapPreview.style.transform = 'scale(0.98)';
        mapPreview.style.opacity = '0.8';
        
        setTimeout(() => {
          mapPreview.style.transform = 'scale(1)';
          mapPreview.style.opacity = '1';
        }, 150);
      }
      
      // Update pins visibility based on floor (demo only)
      updateFloorPins(floor);
    });
  });
}

/**
 * Update floor pins visibility (demo implementation)
 */
function updateFloorPins(floor) {
  const pins = document.querySelectorAll('.map-pin');
  
  pins.forEach(pin => {
    pin.style.transition = 'opacity 0.3s ease';
    
    // Demo: Show/hide pins based on floor
    // In production, this would load actual floor data
    switch(floor) {
      case 'ground':
        if (pin.classList.contains('map-pin--1') || pin.classList.contains('map-pin--2')) {
          pin.style.opacity = '1';
        } else {
          pin.style.opacity = '0.3';
        }
        break;
      case 'first':
        if (pin.classList.contains('map-pin--3')) {
          pin.style.opacity = '1';
        } else {
          pin.style.opacity = '0.3';
        }
        break;
      case 'second':
        if (pin.classList.contains('map-pin--4')) {
          pin.style.opacity = '1';
        } else {
          pin.style.opacity = '0.3';
        }
        break;
    }
  });
}

/**
 * Deals Filter - Filter deals by category
 */
function initDealsFilter() {
  const filterButtons = document.querySelectorAll('.filter-chip');
  const dealCards = document.querySelectorAll('.promo-card[data-category]');
  
  if (!filterButtons.length || !dealCards.length) return;
  
  filterButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      // Update active button
      filterButtons.forEach(b => b.classList.remove('filter-chip--active'));
      this.classList.add('filter-chip--active');
      
      const filter = this.dataset.filter;
      
      // Filter deal cards
      dealCards.forEach(card => {
        const category = card.dataset.category;
        
        if (filter === 'all' || category === filter) {
          card.style.display = '';
          // Add fade-in animation
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          
          setTimeout(() => {
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.display = 'none';
        }
      });
      
      // Update grid layout after filtering
      updateDealsGrid();
    });
  });
}

/**
 * Update deals grid layout for empty states
 */
function updateDealsGrid() {
  const dealCards = document.querySelectorAll('.promo-card[data-category]');
  const visibleCards = Array.from(dealCards).filter(card => card.style.display !== 'none');
  
  const dealsGrid = document.querySelector('.deals-grid');
  if (!dealsGrid) return;
  
  if (visibleCards.length === 0) {
    // Show empty state
    const emptyState = document.createElement('div');
    emptyState.className = 'empty-state';
    emptyState.style.cssText = `
      grid-column: 1 / -1;
      text-align: center;
      padding: var(--space-12);
      color: var(--color-text-muted);
    `;
    emptyState.innerHTML = `
      <span class="material-symbols-outlined" style="font-size: 48px; opacity: 0.5;">search_off</span>
      <p>No deals found in this category</p>
    `;
    
    // Remove any existing empty state
    const existingEmpty = dealsGrid.querySelector('.empty-state');
    if (existingEmpty) {
      existingEmpty.remove();
    }
    
    dealsGrid.appendChild(emptyState);
  } else {
    // Remove empty state if exists
    const existingEmpty = dealsGrid.querySelector('.empty-state');
    if (existingEmpty) {
      existingEmpty.remove();
    }
  }
}

/**
 * Countdown Timer - Updates deal countdowns (if implemented server-side)
 */
function initDealCountdowns() {
  // This would be used if deals have server-side countdown timers
  // For demo purposes, the countdown is static HTML
}

/**
 * Lazy load images in deals section
 */
function initDealsLazyLoad() {
  const dealImages = document.querySelectorAll('.deals-grid .placeholder-image');
  
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('loaded');
          observer.unobserve(entry.target);
        }
      });
    });
    
    dealImages.forEach(img => observer.observe(img));
  }
}
