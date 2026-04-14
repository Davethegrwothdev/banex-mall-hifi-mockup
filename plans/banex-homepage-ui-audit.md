# BANEX MALL HOMEPAGE — SURGICAL UI AUDIT & ELEVATION ROADMAP

> Generated: 2026-04-14
> Mode: Architect
> Purpose: Premium destination-mall quality elevation

---

## 1. EXECUTIVE DIAGNOSIS

### Current State Assessment

The Banex Mall homepage is a **solid foundation** with 15+ distinct sections, comprehensive utility cards, and a working component system. However, it suffers from **vertical monotony** and lacks the **premium destination feel** characteristic of world-class shopping centres like Westfield London, Bluewater, and Lakeside.

### Root Cause Analysis

| Symptom | Root Cause |
|---------|------------|
| Flat scroll experience | Uniform `section-standard` padding throughout — no breathing moments |
| Weak visual hierarchy | Every section uses identical `section-header` styling — no focal points |
| Generic card layouts | All cards use uniform grid — no staggered editorial layouts |
| Unremarkable interactions | Hover states exist but lack **premium micro-feedback** |
| Visit planning buried | Map teaser appears once at ~40% scroll — too late for planning-first visitors |

---

## 2. TOP 10 VISUAL ISSUES

1. **Hero text hierarchy inverted** — Dynamic rotating text competes with primary headline instead of supporting it
2. **Quick Access tiles undersized** — 3-column grid on desktop with 64px icons lacks visual weight against hero
3. **Equal visual weight across sections** — No section dominates; scroll feels repetitive
4. **Promo ribbon styling** — `transform: rotate(45deg)` cuts off on mobile; ribbon text unreadable
5. **Map teaser lacks floor context** — Floor switcher UI is decorative, not informative
6. **Cinema section overwhelming** — 6 horizontal movie cards + featured movie + info bar = cognitive overload
7. **Family gallery images identical size** — 3 equal columns lack editorial storytelling rhythm
8. **Utility cards lack hierarchy** — All 4 visit cards equal size/weight; parking should dominate
9. **Newsletter bleeds into footer** — No visual break between sections; boundaries unclear
10. **CTA button consistency** — Mix of `btn-primary`, `btn-accent`, `btn-outline` without clear hierarchy

---

## 3. TOP 10 UX FLOW ISSUES

1. **No "I'm Planning a Visit" entry point above fold** — visitor intent assumed, not captured
2. **Map buried at section 4** — should appear earlier for planning-first users
3. **Store directory unreachable from hero** — "Explore What's On" dominates; "Shop" is secondary nav only
4. **No quick filters for "Open Now"** — all deal cards show static timers without live status
5. **Floor switcher non-functional** — JS toggles opacity but doesn't load actual floor data
6. **Carousel auto-scroll absent** — users must manually navigate trending content
7. **Mobile nav drawer delays** — no skeleton/loading state; feels sluggish
8. **Empty filter state weak** — "No deals found" lacks retry CTA
9. **Social proof disconnected** — Instagram grid is static images, not live feed
10. **No "Save for Later" or "Favorites"** — wishlist functionality absent

---

## 4. HOMEPAGE SECTION REORDER ROADMAP

### Current Order (15 sections)

```
1. Live Status Bar
2. Header
3. Hero
4. Quick Access Tiles (6)
5. Trending Carousel
6. Map Teaser
7. Today's Best Deals
8. Cinema Showcase
9. Family Moments
10. Visit Us Today
11. Social Proof
12. Newsletter
13. Footer
```

### Recommended Reorder

```
1. Live Status Bar (KEEP)
2. Header (KEEP)
3. Hero (REFACTOR — add "Planning a Visit?" micro-CTA)
4. Quick Access Tiles (REFACTOR — reduce to 4, add "Plan Visit" tile)
5. Map Teaser + Floor Switcher (MOVE UP — critical for planning-first)
6. Opening Hours + Parking Live Status (NEW SECTION — move utility here)
7. Trending Carousel (KEEP with auto-scroll)
8. Today's Best Deals (REFACTOR — add "Open Now" filter)
9. Cinema Showcase (SIMPLIFY — reduce to 3 horizontal cards)
10. Family Moments (REFACTOR — staggered 2:1 grid)
11. Visit Us Today (MERGE with #6)
12. Social Proof (KEEP)
13. Newsletter (ADD visual separator)
14. Footer (KEEP)
```

---

## 5. COMPONENT-BY-COMPONENT PATCH LIST

### A. Header & Navigation

| Component | Current State | Fix Required |
|-----------|--------------|--------------|
| `.header` | Fixed top with 40px offset for status bar | ✅ Already correct — add `header--elevated` on scroll >200px |
| `.header__nav-link` | No active indicator | Add animated underline on active state |
| Mobile drawer | Slide from left | Add backdrop blur; implement skeleton loading |

### B. Hero Section

| Component | Current State | Fix Required |
|-----------|--------------|--------------|
| `.hero-title` | "Your Next Great Day Starts Here" | ✅ Strong — add gradient text fill |
| `.dynamic-text` | Rotating list in subtitle area | Move to **below** title as supporting text, reduce size |
| `.hero-actions` | Two equal buttons | Make "Get Directions" secondary; add **WhatsApp CTA** pill |
| **MISSING** | Planning intent capture | Add floating micro-CTA: "🚗 Planning a Visit?" → opens drawer |

### C. Quick Access Tiles

| Component | Current State | Fix Required |
|-----------|--------------|--------------|
| Grid | 3 columns on desktop | Change to **4 columns**; drop 2 tiles |
| Tile content | Icon + title + count + hover text | Reduce to **icon + title**; add floor badge |
| Tile count | "50+ Brands" generic | Replace with **"12 new this month"** (scarcity) |
| **MISSING** | Plan Visit tile | Add 5th tile: "📍 Plan Your Visit" with chevron |

### D. Map Teaser

| Component | Current State | Fix Required |
|-----------|--------------|--------------|
| Floor switcher | Decorative only | Make functional — load actual floor JSON |
| Pins | CSS animations only | Add click → opens mini-modal with store preview |
| CTA | "Open Full Interactive Map" | Change to **"Check Floor Availability"** |
| **MISSING** | Parking live count | Add "452/500 spaces" badge on hover |

### E. Deals Section

| Component | Current State | Fix Required |
|-----------|--------------|--------------|
| Filters | "All, Fashion, Food, Entertainment" | Add **"Open Now"** filter with live dot |
| Card ribbons | Static "40% OFF" | Add **"Closing in 2h"** urgency ribbon variant |
| Timer | Static countdown | Replace with **JS countdown** that ticks |
| **MISSING** | "Limited Quantity" badge | Add to 2 cards per row |

### F. Cinema Section

| Component | Current State | Fix Required |
|-----------|--------------|--------------|
| Featured movie | Full-width hero style | ✅ Keep but reduce height to 400px |
| Horizontal scroll | 6 movie cards | **Reduce to 3**; add "See All Showtimes" CTA |
| Info bar | 3 equal items | Add **"Today: 12 showings available"** live count |
| **MISSING** | Seat availability preview | Add "🎫 78% seats available" micro-badge |

### G. Visit Utility Cards

| Component | Current State | Fix Required |
|-----------|--------------|--------------|
| Grid | 4 equal cards | Make **parking card 2x width** (primary for drivers) |
| Opening hours | Static text | Add **"Closes in 3h 20m"** live countdown |
| Parking | "Free parking" text | Add **real-time counter**: "423/500 → 15 mins ago" |
| **MISSING** | Quick actions | Add "🚗 Navigate to Parking", "📞 Call Concierge" buttons |

### H. Footer

| Component | Current State | Fix Required |
|-----------|--------------|--------------|
| Layout | 4-column | ✅ Adequate — add **"Download App"** CTA in brand column |
| Social icons | Generic Material icons | Replace with **SVG brand logos** |
| **MISSING** | Back to top | Add floating "↑" button that appears after 500px scroll |

---

## 6. PREMIUMIZATION ROADMAP

### Phase A: Editorial Layouts (Week 1)

| Change | File | Impact |
|--------|------|--------|
| Stagger deals grid 4→3→2 | `home.css` | Breaks monotony |
| Add asymmetrical "spotlight" card to trending | `index.html` | Creates focal moment |
| Implement 2:1 family gallery split | `home.css` | Editorial rhythm |
| Add "ribbon divider" between heavy sections | `components.css` | Visual breathing |

### Phase B: Luxury Gradients (Week 1)

| Change | File | Impact |
|--------|------|--------|
| Hero gradient mesh (not linear) | `home.css` | Cinematic feel |
| Subtle noise texture overlay on surfaces | `base.css` | Tactile premium |
| Glassmorphism on utility cards | `home.css` | Modern depth |

### Phase C: Visual Contrast Moments (Week 2)

| Change | File | Impact |
|--------|------|--------|
| Dark mode section for cinema | `home.css` | Emotional impact |
| Invert colors for "VIP Access" strip | `home.css` | Scarcity signal |
| Add parallax to family gallery | `animations.js` | Depth perception |

---

## 7. MOTION UPGRADE ROADMAP

### Critical Fixes (2 hours)

| Animation | Current | Target |
|-----------|---------|--------|
| Card hover | `translateY(-8px)` | Add **scale(1.02)** + shadow bloom |
| Button hover | Simple lift | Add **glow ring** + slight rotation on icon |
| Section reveal | None | Add **staggered fade-up** (100ms delay between children) |
| Nav scroll | Instant bg change | Add **300ms ease-out** transition |

### Enhancement Pass (1 day)

| Animation | Implementation |
|-----------|----------------|
| Carousel auto-scroll | `animation: scroll 30s linear infinite` with pause on hover |
| Map pin pulse | Add **CSS pulse + tooltip reveal** on load |
| Countdown timers | JS `setInterval` tick with flip-card animation |
| Skeleton loading | Add shimmer to all async content areas |

---

## 8. VISIT-PLANNING PARITY ROADMAP

### Benchmark Parity Checklist

| Feature | Westfield/Bluewater | Banex Status | Implementation |
|---------|-------------------|--------------|----------------|
| Centre map | ✅ Full interactive | ⚠️ Static teaser | Move up + make functional |
| Parking live | ✅ Space count | ❌ Static | Add JS live counter |
| Opening hours | ✅ Live countdown | ⚠️ Static text | Add "Closes in X" |
| Traffic/ETA | ✅ Google Maps embed | ❌ Missing | Add iframe teaser |
| Accessibility | ✅ Dedicated section | ⚠️ Footer only | Add to Visit section |
| Prayer room | ✅ Icon + info | ❌ Missing | Add to Visit cards |
| ATM locations | ✅ Floor-by-floor | ❌ Missing | Add to Map teaser |
| Guest services | ✅ Prominent CTA | ⚠️ Footer only | Add sticky mobile CTA |
| Wi-Fi free | ✅ Badge on hero | ❌ Missing | Add to status bar |
| Lost & Found | ✅ Quick access | ❌ Footer only | Add to Visit section |

### Quick Wins (Visit Planning)

1. **Add "Parking: 423/500" live counter** to Map teaser
2. **Add "Opens in X hours" countdown** to opening hours card
3. **Add 2 new utility cards**: Prayer Room + ATM Locations
4. **Add "Accessibility" badge** to Visit section header
5. **Make map floor switcher functional** with mock floor data

---

## 9. MOBILE-FIRST REFACTOR ROADMAP

### Current Mobile Gaps

| Issue | Impact | Fix |
|-------|--------|-----|
| Hero text 4xl on mobile | Truncates | Clamp to `2.5rem` |
| Quick access 3-col → 1-col | Too tall | Keep 2-col with smaller icons |
| Filter chips overflow | Horizontal scroll ugly | Add `scroll-snap` |
| CTA buttons full-width | Hard to tap secondary | Make secondary `btn-outline` 50% width |
| Map teaser unreadable | Tiny pins | Convert to **list view** on mobile |
| Sticky header 40px + nav = 80px | Too tall | Reduce to **56px combined** |

### Mobile Navigation

| Component | Current | Fix |
|-----------|---------|-----|
| Drawer | Slide left | Add **backdrop blur** + swipe gesture support |
| Header height | 64px + 40px = 104px | **Reduce to 56px** — merge status into header |
| Search | Opens page | Add **expandable inline** search in nav |

---

## 10. QUICK WINS (2 HOURS)

| # | Task | Files |
|---|------|-------|
| 1 | Add gradient text fill to hero title | `home.css` |
| 2 | Add "Open Now" filter chip to deals | `index.html`, `home.js` |
| 3 | Add parking live counter to utility card | `index.html` |
| 4 | Enable carousel auto-scroll | `home.css`, `animations.js` |
| 5 | Add staggered reveal to section children | `animations.js` |
| 6 | Reduce header height on mobile | `home.css` |
| 7 | Add "Planning a Visit?" micro-CTA to hero | `index.html` |
| 8 | Add glassmorphism to utility cards | `home.css` |
| 9 | Add footer "Back to Top" button | `index.html`, `home.js` |
| 10 | Add live countdown to opening hours | `index.html`, `home.js` |

---

## 11. MEDIUM WINS (1 DAY)

| # | Task | Files |
|---|------|-------|
| 1 | Make floor switcher functional | `index.html`, `home.js` |
| 2 | Refactor deals grid to staggered layout | `home.css` |
| 3 | Add dark cinema section variant | `home.css` |
| 4 | Implement skeleton loading states | `components.css`, `animations.js` |
| 5 | Add parallax to family gallery | `animations.js` |
| 6 | Implement map pin click → modal | `index.html`, `home.js` |
| 7 | Add WhatsApp quick chat floating button | `index.html`, `home.css` |
| 8 | Create "VIP Access" premium strip | `index.html`, `home.css` |
| 9 | Refactor cinema section to 3 cards | `index.html` |
| 10 | Add noise texture overlay | `base.css` |

---

## 12. MAJOR UPLIFT WINS (3 DAYS)

| # | Task | Files |
|---|------|-------|
| 1 | Full editorial redesign — staggered grid system | `home.css`, `components.css` |
| 2 | Implement real-time parking API mock | `data/`, `home.js` |
| 3 | Build complete mobile drawer with skeleton | `mobile-drawer.html`, `nav.js` |
| 4 | Add WebGL hero particle system | `home.css`, `animations.js` |
| 5 | Build "Store Coming Soon" carousel strip | `index.html`, `home.js` |
| 6 | Implement personalized "For You" recommendations | `home.js` |
| 7 | Add AR wayfinding teaser (WebXR mock) | `index.html` |
| 8 | Build complete map floor navigation | `data/floors.json`, `home.js` |
| 9 | Implement loyalty tier showcase | `index.html`, `home.css` |
| 10 | Add event ticketing mini-cart | `index.html`, `home.js` |

---

## 13. IMPLEMENTATION PHASES

### Phase 1: Quick Wins (2 Hours)
- Hero gradient text + micro-CTA
- "Open Now" deal filter
- Carousel auto-scroll
- Glassmorphism cards
- Staggered reveal animations

### Phase 2: Medium Wins (1 Day)
- Floor switcher functionality
- Staggered grid layouts
- Skeleton loading states
- Parallax effects
- Dark section variants

### Phase 3: Major Uplift (3 Days)
- Full editorial redesign
- Real-time parking API
- Mobile drawer overhaul
- WebGL hero
- AR wayfinding teaser

---

## FILE MODIFICATION SUMMARY

| Phase | Files to Modify |
|-------|-----------------|
| 1 | `index.html`, `styles/pages/home.css`, `scripts/animations.js`, `scripts/page/home.js` |
| 2 | `styles/components.css`, `styles/pages/home.css`, `scripts/animations.js`, `data/` |
| 3 | Full codebase including new components and data files |

---

*End of Audit Document*
