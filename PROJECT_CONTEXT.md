# ADNA Artist Website - Project Context

## Tech Stack

- **Framework:** Next.js 16 (App Router, no src directory)
- **Language:** TypeScript
- **CMS:** Sanity (project ID: jvulwqq0, dataset: production)
- **Styling:** SCSS Modules (mobile-first approach)
- **Deployment:** Vercel
- **Routing:** Next.js file-based routing
- **Package Manager:** npm

## Project Structure

```
adna/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with Header/Footer
│   ├── page.tsx           # Home page (with featured release)
│   ├── music/page.tsx     # Discography
│   ├── shows/page.tsx     # Tour dates
│   ├── contact/page.tsx   # Contact with email
│   ├── newsletter/page.tsx
│   └── studio/            # Embedded Sanity Studio
├── components/
│   ├── common/
│   │   ├── PageLayout.tsx       # Shared page wrapper with background
│   │   ├── SocialLinks.tsx      # Social media icons
│   │   └── Markdown.tsx         # Markdown renderer
│   ├── layout/
│   │   ├── Header.tsx           # Scroll-based animated header
│   │   ├── Navigation.tsx       # Hamburger menu with overlay
│   │   └── Footer.tsx
│   └── icons/
│       └── SocialIcons.tsx      # All social media icon components
├── sanity/                # Sanity CMS configuration
│   ├── lib/
│   │   ├── client.ts     # Sanity client
│   │   ├── image.ts      # Image URL helpers
│   │   └── queries.ts    # Data fetching queries
│   ├── schemaTypes/
│   │   ├── page.ts       # Page content type
│   │   ├── release.ts    # Music releases
│   │   ├── contact.ts    # Booking contacts
│   │   ├── show.ts       # Tour dates/shows
│   │   └── index.ts      # Schema registry
│   └── env.ts            # Environment config
├── public/images/         # Background images (.png files)
└── styles/                # Global SCSS variables and mixins
```

## Sanity CMS

### Content Types

**Page** - Flexible pages (home, contact, music, newsletter)

- Fields: slug, title, backgroundImage, body, email
- Used for all main pages
- Email field for contact page mailto link

**Release** - Albums/EPs/Singles

- Fields: title, release_type, releaseDate, coverImage, caption, link, is_featured
- `is_featured` flag for homepage display
- Images uploaded to Sanity CDN

**Contact** - Booking agents and contacts

- Fields: name, role, email, phone, company, region
- For displaying booking/management contacts

**Show** - Tour dates and shows

- Fields: date, venue, location, lineup, ticketUrl, time
- Automatically sorted by date
- Query filter for upcoming shows only

### Data Fetching

All pages fetch data from Sanity using GROQ queries:

- `getPageBySlug(slug)` - Fetch individual pages
- `getAllReleases()` - Fetch all releases (sorted by date)
- `getAllContacts()` - Fetch booking contacts
- `getAllShows()` - Fetch all shows
- `getUpcomingShows()` - Fetch only future shows

**Revalidation:** Pages revalidate every 30 seconds (balance between freshness and performance)

```typescript
export const revalidate = 30;
```

**Images:** Sanity image references converted to URLs using `urlFor()` helper:

```typescript
const imageUrl = urlFor(image).width(800).url();
```

### Studio Access

- **Local:** `http://localhost:3000/studio`
- **Production:** `[your-site].vercel.app/studio`
- Artists can edit all content without touching code
- Changes appear on site within 30 seconds

## Key Features & Implementation Details

### Header Component (`components/layout/Header.tsx`)

- **Scroll Animation:** Logo moves from center to left, font-size reduces
- **Desktop:** Shows horizontal menu before scroll, hamburger after (scrollProgress >= 0.9)
- **Mobile:** Always shows hamburger menu
- **Uses:** `'use client'`, `useLayoutEffect` for SSR compatibility
- **Important:** Logo positioning uses Math.max() to prevent going off-screen

### Navigation Component (`components/layout/Navigation.tsx`)

- **Menu Overlay:** Full-screen with dark background
- **Animation:** Staggered menu items fade in with 0.1s delays
- **Links:** Uses Next.js `<Link href="">` (not React Router)
- **No backdrop-filter blur effects** (removed per project requirements)

### PageLayout Component (`components/common/PageLayout.tsx`)

- Wraps all pages with consistent structure
- Background images from Sanity or fallback to `/public/images/`
- Includes SocialLinks component
- Padding-top accounts for fixed header height (6rem mobile, 11rem desktop)

### Home Page Features

- Displays page content from Sanity
- Shows featured release (marked with `is_featured` flag)
- Featured release includes cover art, title, and "Watch/Listen" link
- Background image from Sanity

### Music Page

- Grid display of all releases
- Sorted by release date (newest first)
- Each release shows: cover image, title, caption, link
- Images optimized via Sanity CDN

### Contact Page

- Displays page content from Sanity
- Email address with mailto link (opens user's email client)
- Optional: Displays booking contacts

### Shows Page

- Lists upcoming shows only
- Shows: date, venue, location, lineup, ticket link
- Automatically filters out past shows
- Sorted by date (earliest first)

## Styling Conventions

- **Mobile-first:** Base styles for mobile, desktop uses `@media (min-width: 769px)`
- **No backdrop-filter:** All blur effects removed
- **SCSS Modules:** Component-scoped styles (`.module.scss`)
- **Color:** White text (#ffffff), transparent backgrounds
- **No blur anywhere**

## Important Constraints

1. ❌ NO backdrop-filter CSS properties
2. ✅ Background images can be from Sanity CDN or `/public/images/` as fallback
3. ✅ All interactive components need `'use client'` directive
4. ✅ Use `useLayoutEffect` for window-dependent initial state (SSR compatibility)
5. ✅ Suppress hydration warnings with `suppressHydrationWarning` on html/body
6. ✅ Images from Sanity must be converted using `urlFor()` helper

## Deployment

- **Platform:** Vercel
- **URL:** [your-vercel-url].vercel.app (free tier)
- **Auto-deploy:** Pushes to main branch trigger automatic deployment

### Environment Variables Required

```
NEXT_PUBLIC_SANITY_PROJECT_ID=jvulwqq0
NEXT_PUBLIC_SANITY_DATASET=production
```

Set in:

- Local: `.env.local` file
- Vercel: Project Settings → Environment Variables (all environments)

## Current Status

### ✅ Completed

- Next.js setup and configuration
- All pages working with Sanity data integration
- Header/navigation fully functional
- Social icons implemented (8 icons: Spotify, Facebook, Instagram, TikTok, Apple Music, Tidal, SoundCloud, YouTube)
- Sanity CMS fully integrated
- Content schemas created (Page, Release, Contact, Show)
- All existing content migrated to Sanity
- Studio accessible at `/studio`
- Deployed to Vercel
- Contact page with email mailto link
- Revalidation configured (30 seconds)

### ⏳ Pending

- Newsletter page (pending artist decision on subscription service)
- Styling polish and improvements
- Custom domain setup (when ready to replace current site)
- Training artist on Studio usage

### 💡 Nice-to-Have / Future Enhancements

- Add streaming platform links to releases (Spotify, Apple Music, Tidal buttons)
- Rich text editing for page bodies (Portable Text)
- Tour date enhancements (sold-out status, city filtering)
- SEO/meta tags optimization
- Analytics integration

## Next Steps

1. Newsletter page (awaiting artist requirements)
2. Styling improvements and polish
3. Add streaming links to releases
4. Point custom domain to Vercel (when approved by artist)
5. Invite artist to Sanity and train on Studio usage
6. Archive old content directory (no longer needed)

## Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server

## Artist Workflow

Once trained, the artist can:

1. Visit `[site].vercel.app/studio`
2. Log in with Sanity account
3. Edit any content (pages, releases, shows, contacts)
4. Upload and manage images
5. Publish changes
6. See updates on live site within 30 seconds

No developer needed for content updates!
