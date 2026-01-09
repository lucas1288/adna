# ADNA Artist Website - Project Context

## Tech Stack

- **Framework:** Next.js 16 (App Router, no src directory)
- **Language:** TypeScript
- **Styling:** SCSS Modules (mobile-first approach)
- **State Management:** Zustand (not yet implemented)
- **Routing:** Next.js file-based routing
- **Package Manager:** Yarn

## Project Structure

```
adna/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with Header/Footer
│   ├── page.tsx           # Home page
│   ├── music/page.tsx
│   ├── tours/page.tsx
│   ├── contact/page.tsx
│   └── newsletter/page.tsx
├── components/
│   ├── common/
│   │   ├── PageLayout.tsx       # Shared page wrapper with background
│   │   └── SocialLinks.tsx      # Social media icons
│   ├── layout/
│   │   ├── Header.tsx           # Scroll-based animated header
│   │   ├── Navigation.tsx       # Hamburger menu with overlay
│   │   └── Footer.tsx
│   └── icons/
│       └── SocialIcons.tsx      # All social media icon components
├── public/images/         # Background images (.png files)
└── styles/                # Global SCSS variables and mixins
```

## Key Features & Implementation Details

### Header Component (`components/layout/Header.tsx`)

- **Scroll Animation:** Logo moves from center to left, font-size reduces
- **Desktop:** Shows horizontal menu before scroll, hamburger after (scrollProgress >= 0.9)
- **Mobile:** Always shows hamburger menu
- **Uses:** `'use client'`, `useLayoutEffect` for SSR compatibility
- **Important:** Logo positioning uses Math.max() to prevent going off-screen

### Navigation Component (`components/layout/Navigation.tsx`)

- **Menu Overlay:** Full-screen with blur effect and dark background
- **Animation:** Staggered menu items fade in with 0.1s delays
- **Links:** Uses Next.js `<Link href="">` (not React Router)
- **No backdrop-filter blur effects** (removed per project requirements)

### PageLayout Component (`components/common/PageLayout.tsx`)

- Wraps all pages with consistent structure
- Background images via inline style: `style={{ backgroundImage: url(...) }}`
- Includes SocialLinks component
- Padding-top accounts for fixed header height (6rem mobile, 11rem desktop)

## Styling Conventions

- **Mobile-first:** Base styles for mobile, desktop uses `@media (min-width: 769px)`
- **No backdrop-filter:** All blur effects removed
- **SCSS Modules:** Component-scoped styles (`.module.scss`)
- **Color:** White text (#ffffff), transparent backgrounds
- **No blur anywhere**

## Important Constraints

1. ❌ NO backdrop-filter CSS properties
2. ✅ Background images must be .png files in `/public/images/`
3. ✅ All interactive components need `'use client'` directive
4. ✅ Use `useLayoutEffect` for window-dependent initial state (SSR compatibility)
5. ✅ Suppress hydration warnings with `suppressHydrationWarning` on html/body

## Current Status

- ✅ Next.js migration complete
- ✅ All pages working with background images
- ✅ Header/navigation fully functional
- ✅ Social icons implemented (8 icons: Spotify, Facebook, Instagram, TikTok, Apple Music, Tidal, SoundCloud, YouTube)
- ⏳ Headless CMS integration - Next step
- ⏳ Actual content for pages (Music player, tour dates, forms)
- ⏳ Zustand state management - Not yet implemented

## Next Steps

1. Integrate Sanity CMS
2. Create content schemas (Albums, Tours, etc.)
3. Build Music page with discography
4. Build Tours page with dates
5. Build Contact form
6. Build Newsletter signup

## Commands

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn start` - Start production server
