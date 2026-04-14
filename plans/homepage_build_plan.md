# BANEX MALL HOMEPAGE BUILD PLAN

## Overview
Following build rules: Build one page at a time, max 2 files per task, finish structure before polish.

## Current State
✅ Hero Section (HTML + CSS)
✅ Quick Access Tiles (HTML + CSS)
✅ Navigation functionality
✅ Animation scripts

## Remaining Sections (Next Tasks)

### TASK 1: Trending Carousel & Live Status Bar
- **Files**: index.html, styles/pages/home.css
- **Components**: reuse event-card, promo-card from components.css
- **Focus**: Structure only, minimal styling
- **Validation**: Ensure card hover effects work

### TASK 2: Interactive Map & Deals Section
- **Files**: index.html, styles/pages/home.css
- **Components**: map preview, deal cards using existing card system
- **Focus**: Layout structure
- **Validation**: Verify section spacing matches design tokens

### TASK 3: Cinema Showcase & Family Moments
- **Files**: index.html, styles/pages/home.css
- **Components**: event-card for cinema, gallery layout for family
- **Focus**: Structure with proper accessibility
- **Validation**: Check responsive breakpoints

### TASK 4: Visit Us Today & Social Proof
- **Files**: index.html, styles/pages/home.css
- **Components**: utility cards, testimonial cards
- **Focus**: Information architecture
- **Validation**: Content hierarchy correct

### TASK 5: Newsletter Signup & Polish
- **Files**: index.html, styles/pages/home.css
- **Components**: form inputs, subscription form
- **Focus**: Complete visual polish
- **Validation**: All interactions smooth

## Build Rules Compliance
- [ ] Max 2 files per task
- [ ] Use tokens.css only
- [ ] Reuse component classes
- [ ] No hardcoded values
- [ ] Desktop first, then mobile
- [ ] Structure before polish

## Quality Gates
- [ ] Spacing clean (uses tokens)
- [ ] No console errors
- [ ] Images pathed correctly
- [ ] CTA visible above fold
- [ ] Mobile responsive
- [ ] Hover lifts on cards
- [ ] Fade-up reveals for sections