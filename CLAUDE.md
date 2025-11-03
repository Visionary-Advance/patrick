# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 website for Patrick Environmental, a wildfire suppression and environmental services company. The site showcases their services, displays active wildfire data from NASA FIRMS API, includes a memorial page for fallen firefighters, and provides employment/contact information.

## Development Commands

```bash
# Development server (default port 3000)
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint the codebase
npm run lint
```

## Tech Stack

- **Framework**: Next.js 15.3.4 (App Router)
- **React**: 19.0.0
- **Styling**: Tailwind CSS v4 (using @tailwindcss/postcss)
- **Animations**: Framer Motion 12.23.0, GSAP 3.13.0
- **Forms**: React Hook Form 7.59.0 with Zod validation
- **Icons**: Lucide React, React Icons
- **Caching**: LRU Cache for API responses

## Architecture

### App Router Structure

The project uses Next.js App Router with the following key pages:

- `/` - Homepage (app/page.js)
- `/about` - About page
- `/services` - Services overview
- `/services/[id]` - Dynamic service detail pages (6 services defined in lib/servicesData.js)
- `/wildfires` - Wildfire information
- `/wildfires/map` - Interactive wildfire map
- `/memorial` - Memorial gallery
- `/memorial/[id]` - Individual memorial pages (memorialData embedded in page component)
- `/gallery` - Photo gallery
- `/employment` - Employment information
- `/contact` - Contact form
- `/submit-experience` - User experience submission form

### API Routes

**`/api/fires/[...params]/route.js`** - Comprehensive wildfire data proxy that:
- Fetches fire data from NASA FIRMS API
- Uses catch-all route: `/api/fires/{sensor}/{country}/{days}`
- For USA requests: Queries 5 regional areas (West, Central, East, Southeast, Alaska) to work around NASA API limitations
- Implements LRU caching (10 min TTL, 100 max entries)
- Handles multiple sensors: VIIRS_SNPP_NRT, MODIS_A, MODIS_T, VIIRS_NOAA20_NRT
- Returns CSV format data
- Deduplicates fire entries across multiple sources

### Key Data Files

**`lib/servicesData.js`** - Central data for all services:
- 6 service objects: wildland-fire-suppression, emergency-services, tree-brush-trimming, consulting, prescribed-burning, snow-removal
- Each service includes: id, title, shortTitle, shortDesc, content (heading, description, image), and stats array
- Used for both service listing and dynamic service detail pages

**`lib/memorialData.js`** - Central data for memorial entries:
- Array of 7 memorial objects with id, name, dateRange, wildfireName, imageUrl, biography
- Used by both `/memorial` (listing) and `/memorial/[id]` (detail) pages
- Currently uses placeholder content

### Component Architecture

Components are located in `/components` directory:

**Layout Components:**
- `Header.jsx` - Fixed header with transparent-to-solid transition on homepage scroll, dropdown menu for "More" section, animated mobile menu using Framer Motion
- `Footer.jsx` - Site footer

**Homepage Sections:**
- `About.jsx` - Company overview section
- `Services.jsx` - Services grid/overview
- `ServiceCards.jsx` - Individual service cards
- `Servicessections.jsx` - Service sections
- `Stats.jsx` - Animated statistics counter
- `FirstSteps.jsx` - Call-to-action section
- `ShareExp.jsx` - Experience sharing section
- `WFF.jsx` - Wildfire-related section
- `LaFire.jsx` - LA fire information section

**Interactive Components:**
- `TimelineScroll.jsx` - Scroll-based timeline animation
- `SplitText.jsx` - Text animation utility
- `ContactForm.jsx` - Contact form with validation

**Utility Components:**
- `Button.jsx` - Reusable button component

### Styling Approach

- **Tailwind CSS v4** with PostCSS plugin (`@tailwindcss/postcss`)
- Custom font: Jomolhari (applied via `.jomol` class)
- Custom fonts loaded via Next.js font optimization (Geist Sans, Geist Mono)
- Primary brand color: `#E84D2F` (orange-red)
- Global styles in `app/globals.css`

### Important Patterns

**Dynamic Routes with Use Hook:**
- Service pages use `use(params)` to unwrap params in client components
- Memorial pages directly destructure params (server components)

**Animation Patterns:**
- Intersection Observer used for scroll-triggered animations (see ServiceStats in services/[id]/page.jsx)
- Framer Motion for page transitions and mobile menu
- GSAP for complex timeline animations
- Custom animation timings: 2000ms for counters, ease-out cubic bezier

**Image Handling:**
- Images stored in `/public/Img/` directory
- Direct `<img>` tags used (not Next.js Image component)
- Named with descriptive names: Services_Pic.jpg, Emergency.jpg, Tree_Brush.jpg, etc.

**Client vs Server Components:**
- Most interactive components use `'use client'` directive
- Forms, animations, and state management require client components
- API routes are server-side only

### Service Tab Navigation Pattern

The service detail pages feature a unique tab system:
- Uses sessionStorage to track previous tab for animation direction
- Sliding underline indicator animates between tabs
- Grid layout: 2 cols mobile, 6 cols desktop
- Stats animate on scroll into viewport using Intersection Observer

### NASA FIRMS API Integration

**Environment Variable:**
- `NASA_FIRMS_API_KEY` - API key for NASA FIRMS
- Fallback key hardcoded: `189eab2d38f449abfe5ce4a50870c25a`

**Regional Bounds (for USA):**
- USA_WEST: `-125,30,-102,49`
- USA_CENTRAL: `-107,25,-90,49`
- USA_EAST: `-95,24,-66,47`
- USA_SOUTHEAST: `-95,24,-75,37`
- USA_ALASKA: `-180,54,-125,72`

**API Endpoints Used:**
- Area API: `https://firms.modaps.eosdis.nasa.gov/api/area/csv/{key}/{sensor}/{bounds}/{days}/{date}`
- Country API: `https://firms.modaps.eosdis.nasa.gov/api/country/csv/{key}/{sensor}/{country}/{days}`

## Common Development Patterns

### Adding a New Service

1. Add service object to `lib/servicesData.js` with required fields
2. Ensure image exists in `/public/Img/`
3. Service will automatically appear in navigation and detail pages

### Adding a New Memorial Entry

1. Add memorial object to `memorialData` array in `lib/memorialData.js`
2. Ensure unique `id` slug (kebab-case)
3. Update biography content and image URL
4. Memorial will automatically appear in both listing and detail pages

### Form Handling

Forms use React Hook Form + Zod for validation:
```jsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
```

## Important Notes

- Component imports use `@/Components/` alias (capital C)
- Lib imports use `@/lib/` alias
- The codebase uses both `.js` and `.jsx` extensions inconsistently
- Suppress hydration warnings in layout with `suppressHydrationWarning={true}`
- Case sensitivity issue: Components folder may be referenced as both `Components` and `components`
