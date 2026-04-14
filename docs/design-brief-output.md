# BANEX MALL — MASTER AI DESIGN SYSTEM + COMPONENT + UI LIBRARY

**Version:** 1.0
**Purpose:** Single source of truth for AI coding agents (Roo, Cline, Cursor, Copilot, Deepseek, Claude Code, MiniMax) to build Banex Mall at premium production quality.
**Positioning:** *Westfield polish × Bluewater friendliness × Lakeside energy × Lagos cultural vibrancy*

---

# 1) DESIGN NORTH STAR

Banex Mall must feel like:

* **Premium but accessible**
* **Luxury meets lifestyle**
* **A full-day destination, not just a store directory**
* **Lagos-native confidence**
* **Fast, intuitive, mobile-first discovery**

The experience hierarchy across all pages:
**Discover → Compare → Plan → Visit → Share → Return**

Every UI decision must optimize for:

1. fast discovery
2. high trust
3. emotional excitement
4. easy visit planning
5. repeat visits

---

# 2) FOUNDATION TOKENS

## 2.1 Color Tokens

```css
:root {
  --color-brand-primary: #2E3192;
  --color-brand-primary-hover: #1F2268;
  --color-brand-primary-soft: #EEF0FF;

  --color-brand-accent: #F7941D;
  --color-brand-accent-hover: #E07B00;
  --color-brand-accent-soft: #FFF7ED;

  --color-brand-support: #00A86B;
  --color-brand-support-soft: #ECFDF5;

  --color-premium-navy: #000040;
  --color-premium-gold: #FFD700;

  --color-surface: #FFFFFF;
  --color-surface-alt: #F9FAFB;
  --color-surface-muted: #F3F4F6;

  --color-text: #1F2937;
  --color-text-muted: #6B7280;
  --color-text-subtle: #9CA3AF;
  --color-text-inverse: #FFFFFF;

  --color-border: #E5E7EB;
  --color-border-strong: #D1D5DB;

  --color-success: #10B981;
  --color-warning: #F59E0B;
  --color-error: #EF4444;
  --color-info: #3B82F6;
}
```

## 2.2 Typography

```css
:root {
  --font-body: 'Plus Jakarta Sans', system-ui, sans-serif;
  --font-display: 'Sora', 'Plus Jakarta Sans', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  --text-xs: 12px;
  --text-sm: 14px;
  --text-base: 16px;
  --text-lg: 18px;
  --text-xl: 20px;
  --text-2xl: 24px;
  --text-3xl: 30px;
  --text-4xl: 36px;
  --text-5xl: 48px;
  --text-6xl: 60px;
}
```

## 2.3 Spacing (8pt)

```css
:root {
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
}
```

## 2.4 Radius + Shadows + Motion

```css
:root {
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-pill: 9999px;

  --shadow-sm: 0 1px 3px rgba(0,0,0,.08);
  --shadow-md: 0 8px 24px rgba(0,0,0,.08);
  --shadow-lg: 0 20px 40px rgba(0,0,0,.12);
  --shadow-brand: 0 16px 40px rgba(46,49,146,.22);
  --shadow-accent: 0 16px 40px rgba(247,148,29,.24);

  --ease-standard: cubic-bezier(0.4,0,0.2,1);
  --ease-premium: cubic-bezier(0.25,0.46,0.45,0.94);
  --dur-fast: 150ms;
  --dur-base: 220ms;
  --dur-slow: 420ms;
}
```

---

# 3) LAYOUT SYSTEM

## Breakpoints

* mobile: 0–767
* tablet: 768–1023
* laptop: 1024–1439
* desktop: 1440+

## Grid

* 4 cols mobile
* 8 cols tablet
* 12 cols desktop
* max width: 1440px
* content safe width: 1280px

## Section rhythm

* hero: 96–160px vertical padding
* standard section: 80–120px
* compact: 48–64px

---

# 4) INFORMATION ARCHITECTURE UI MODULES

Every AI build must support these top-level modules:

* Header / mega nav
* Hero carousel
* Category discovery
* Shop directory
* Eat directory
* Events / what’s on
* Offers & flash deals
* Plan my visit
* Centre map
* Guest services
* Loyalty / VIP / newsletter
* Footer ecosystem

---

# 5) CORE COMPONENT LIBRARY

## 5.1 Buttons

Variants:

* primary
* secondary
* outline
* ghost
* premium gold
* danger
* icon button

States:

* default
* hover
* active
* disabled
* loading

Rule:

* primary CTAs use amber
* trust utilities use royal blue
* luxury campaign CTAs use gold/navy

## 5.2 Navigation

Components:

* sticky header
* mega menu
* mobile drawer
* breadcrumb
* quick utility bar
* search command bar

Top nav taxonomy:

* Shop
* Eat
* Play
* What’s On
* Offers
* Plan Visit
* Centre Map
* Services

## 5.3 Cards

### Store Card

Fields:

* image
* logo
* store name
* category
* floor
* status
* open/close time
* CTA
* save icon
* directions
* WhatsApp/call

### Event Card

Fields:

* banner
* date badge
* title
* time
* venue
* ticket price
* CTA
* countdown

### Promo Card

Fields:

* image
* ribbon
* discount
* timer
* store
* CTA

### Category Card

Used for:

* Shop
* Eat
* Play
* Services
* Family
* Luxury

## 5.4 Search + Filter System

Must include:

* predictive search
* quick suggestions
* recent searches
* trending brands
* chips
* multi-select filters
* sort
* open now toggle
* luxury toggle
* kids friendly toggle

## 5.5 Forms

Reusable:

* newsletter
* event RSVP
* booking
* customer support
* gift card
* lost & found

States:

* empty
* focused
* valid
* invalid
* loading
* success

## 5.6 Badges + Chips

Types:

* New
* Featured
* 50% Off
* Closing Soon
* VIP
* Free Parking
* Family Friendly
* Luxury

## 5.7 Alerts / Toasts

* success
* warning
* info
* error
* parking full
* event sold out
* store closed

## 5.8 Skeletons + Empty States

Required for AI builds:

* store loading card
* event loading card
* search loading row
* no results state
* offline map state

---

# 6) PAGE-LEVEL UI LIBRARY

## Homepage Modules

1. immersive hero carousel
2. Shop/Eat/Play discovery tiles
3. featured brands marquee
4. curated luxury grid
5. today’s offers strip
6. upcoming events
7. plan your visit tools
8. map preview
9. services strip
10. newsletter/VIP

## Directory Page Modules

* sticky filter bar
* search header
* category pills
* result count
* responsive grid
* floor grouping
* alphabetical mode
* map sync

## Store Detail Modules

* hero banner
* brand logo
* opening hours
* location
* promotions
* contact
* nearby stores
* similar brands
* route CTA

## Visit Planning Modules

* parking status
* traffic route
* map preview
* family services
* accessibility
* concierge
* opening hours

## Event Modules

* calendar strip
* featured event hero
* ticket CTA
* reminder CTA
* share CTA

---

# 7) AI BUILD RULES (VERY IMPORTANT)

Use these rules so the AI consistently outputs premium quality:

## Visual Rules

* never use flat generic cards
* always use depth, gradients, hover motion
* prioritize large premium imagery
* use rounded-xl minimum on premium surfaces
* maintain generous whitespace
* strong typographic hierarchy
* every section needs one visual focal point

## Interaction Rules

* hover = elevation + scale + shadow
* CTA hover = slight upward motion
* cards = image zoom + content reveal
* nav = underline + color shift
* filters = active chips
* mobile = thumb reachable CTA placement

## Accessibility Rules

* contrast AA minimum
* visible focus ring
* keyboard nav support
* 44px tap targets
* semantic landmarks

## Performance Rules

* lazy load media
* skeleton loaders
* motion reduced fallback
* defer non-critical scripts

---

# 8) TAILWIND MAPPING FOR AI AGENTS

If building in Tailwind, map tokens like this:

```js
colors: {
  brand: '#2E3192',
  accent: '#F7941D',
  success: '#10B981',
  premium: '#000040',
  gold: '#FFD700'
}
```

Recommended utilities:

* rounded-3xl
* shadow-xl
* transition-all duration-300
* hover:-translate-y-1
* hover:scale-[1.02]
* backdrop-blur-xl
* bg-gradient-to-r

---

# 9) AI PROMPT CONTRACT

Use this exact instruction with any AI builder:

> Build every Banex Mall interface using the Banex Master Design System. Use premium destination-mall aesthetics, large immersive imagery, luxurious spacing, smooth motion, crystal-clear hierarchy, and world-class conversion-focused discovery UX. Reuse existing components before inventing new ones. Every section must feel editorial, high-end, and Lagos culturally relevant.

---

# 10) GOLD STANDARD QUALITY CHECKLIST

Before any AI output is accepted, validate:

* token compliant
* spacing rhythm consistent
* hierarchy premium
* mobile polished
* hover states present
* empty states present
* loading states present
* CTA hierarchy clear
* visit-planning UX included
* luxury storytelling included
* culturally localized tone

This document is now the **single canonical build source** for all Banex AI-generated interfaces.
