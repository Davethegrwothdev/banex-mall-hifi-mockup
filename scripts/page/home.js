/**
 * Banex Mall Homepage - Page Specific JavaScript
 * Handles floor switcher, deal filters, and interactive features
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all homepage features
  initFloorSwitcher();
  initDealsFilter();
  initBackToTop();
  initParkingCounter();
  initOpeningHoursCountdown();
});

/**
 * Floor Switcher - Interactive map floor navigation
 */
async function initFloorSwitcher() {
  const floorButtons = document.querySelectorAll('.floor-btn');
  const mapPreview = document.querySelector('.map-preview');
  const floorData = await loadFloorData();
  
  if (!floorButtons.length) return;
  
  floorButtons.forEach(btn => {
    btn.addEventListener('click', async function() {
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
      
      // Update pins with actual floor data
      updateFloorPinsWithData(floor, floorData);
    });
  });
}

/**
 * Load floor data from JSON file
 */
async function loadFloorData() {
  try {
    const response = await fetch('data/floors.json');
    return await response.json();
  } catch (error) {
    console.error('Error loading floor data:', error);
    // Return fallback data
    return {
      "ground": {"stores": [], "facilities": []},
      "first": {"stores": [], "facilities": []},
      "second": {"stores": [], "facilities": []}
    };
  }
}

/**
 * Update floor pins visibility with actual floor data
 */
function updateFloorPinsWithData(floor, floorData) {
  const pins = document.querySelectorAll('.map-pin');
  
  // Hide all pins first
  pins.forEach(pin => {
    pin.style.opacity = '0.3';
  });
  
  // Show pins for stores on the selected floor
  if (floorData[floor] && floorData[floor].stores) {
    floorData[floor].stores.forEach((store, index) => {
      const pin = document.querySelector(`.map-pin--${index + 1}`);
      if (pin) {
        pin.style.opacity = '1';
        // Update pin icon and label based on store data
        const iconEl = pin.querySelector('.material-symbols-outlined');
        const labelEl = pin.querySelector('.map-pin__label');
        if (iconEl) iconEl.textContent = store.icon;
        if (labelEl) labelEl.textContent = store.name;
      }
    });
  }
  
  // Show pins for facilities on the selected floor
  if (floorData[floor] && floorData[floor].facilities) {
    floorData[floor].facilities.forEach((facility, index) => {
      // Map facilities to existing pins or create new logic as needed
      // For demo, we'll just show some pins
      const pinIndex = (index % 4) + 1; // Cycle through pins 1-4
      const pin = document.querySelector(`.map-pin--${pinIndex}`);
      if (pin && pin.style.opacity !== '1') {
        pin.style.opacity = '0.7'; // Semi-transparent for facilities
        // Update pin icon and label based on facility data
        const iconEl = pin.querySelector('.material-symbols-outlined');
        const labelEl = pin.querySelector('.map-pin__label');
        if (iconEl) iconEl.textContent = facility.icon;
        if (labelEl) labelEl.textContent = facility.name;
      }
    });
  }
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

/**
 * Task 9: Back to Top button functionality
 */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  // Show/hide button based on scroll position
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
      backToTopBtn.classList.add('back-to-top--visible');
    } else {
      backToTopBtn.classList.remove('back-to-top--visible');
    }
  });

  // Scroll to top on click
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/**
 * Task 3: Parking live counter - simulates real-time parking availability
 */
function initParkingCounter() {
  const parkingCountEl = document.getElementById('parking-count');
  if (!parkingCountEl) return;

  // Simulate real-time parking counter (random updates)
  function updateParkingCount() {
    const currentCount = parseInt(parkingCountEl.textContent);
    // Random fluctuation between -3 and +2
    const change = Math.floor(Math.random() * 6) - 3;
    let newCount = currentCount + change;
    
    // Keep within bounds
    newCount = Math.max(350, Math.min(480, newCount));
    
    parkingCountEl.textContent = newCount;
    
    // Update status based on availability
    const statusEl = document.querySelector('.parking-counter__status');
    if (statusEl) {
      if (newCount > 100) {
        statusEl.textContent = 'Available';
        statusEl.className = 'parking-counter__status parking-counter__status--available';
      } else if (newCount > 50) {
        statusEl.textContent = 'Filling Fast';
        statusEl.className = 'parking-counter__status parking-counter__status--filling';
      } else {
        statusEl.textContent = 'Limited';
        statusEl.className = 'parking-counter__status parking-counter__status--limited';
      }
    }
  }

  // Update every 30 seconds
  setInterval(updateParkingCount, 30000);
}

/**
 * Task 10: Live countdown to opening hours
 */
function initOpeningHoursCountdown() {
  const closingTimeEl = document.getElementById('closing-time');
  if (!closingTimeEl) return;

  function updateCountdown() {
    const now = new Date();
    const day = now.getDay();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    
    let closingHour;
    let isWeekend = day === 0 || day === 6;
    
    // Determine closing time
    if (isWeekend) {
      closingHour = 23; // 11 PM weekends
    } else {
      closingHour = 22; // 10 PM weekdays
    }
    
    // Calculate minutes until closing
    let minutesUntilClosing = (closingHour - hours) * 60 - minutes;
    
    // Handle if mall is closed
    if (minutesUntilClosing <= 0) {
      // Check if it's a new day (mall about to open)
      if (isWeekend && hours < 10) {
        minutesUntilClosing = (10 - hours) * 60 - minutes;
        closingTimeEl.textContent = formatTime(minutesUntilClosing) + ' (opens)';
      } else if (!isWeekend && hours < 9) {
        minutesUntilClosing = (9 - hours) * 60 - minutes;
        closingTimeEl.textContent = formatTime(minutesUntilClosing) + ' (opens)';
      } else {
        closingTimeEl.textContent = 'Closed';
      }
    } else {
      closingTimeEl.textContent = formatTime(minutesUntilClosing);
    }
  }

  function formatTime(minutes) {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    if (h > 0) {
      return h + 'h ' + m + 'm';
    }
    return m + 'm';
  }

  // Initial update
  updateCountdown();
  
  // Update every minute
  setInterval(updateCountdown, 60000);
}

/**
 * Task 2: "Open Now" filter functionality
 * This extends the existing deals filter to handle the new "Open Now" option
 */
function initOpenNowFilter() {
  const filterButtons = document.querySelectorAll('.filter-chip');
  const dealCards = document.querySelectorAll('.promo-card[data-category]');
  
  // Mark some cards as "open now" for demo purposes
  dealCards.forEach((card, index) => {
    // First 3 cards will be "open now" for demo
    if (index < 3) {
      card.dataset.openNow = 'true';
    }
  });

  // Update the existing filter handler to include open-now
  filterButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const filter = this.dataset.filter;
      
      if (filter === 'open-now') {
        dealCards.forEach(card => {
          if (card.dataset.openNow === 'true') {
            card.style.display = '';
            card.style.opacity = '0';
            setTimeout(() => {
              card.style.transition = 'opacity 0.4s ease';
              card.style.opacity = '1';
            }, 50);
          } else {
            card.style.display = 'none';
          }
        });
      }
    });
  });
}

// Add open-now filter to the existing initDealsFilter
document.addEventListener('DOMContentLoaded', function() {
  initOpenNowFilter();
});
