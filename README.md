# ADNA Artist Website

Official website for ADNA built with Next.js 16 and Sanity CMS.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **CMS:** Sanity
- **Language:** TypeScript
- **Styling:** SCSS Modules
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
# Install dependencies
npm install

# Create .env.local file
cp .env.example .env.local
```

Add your Sanity credentials to `.env.local`:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=jvulwqq0
NEXT_PUBLIC_SANITY_DATASET=production
```

### Development

```bash
# Start dev server
npm run dev
```

- **Website:** http://localhost:3000
- **Sanity Studio:** http://localhost:3000/studio

### Build

```bash
# Production build
npm run build

# Start production server
npm start
```

## Sanity CMS

### Content Types

- **Pages** - Home, Contact, Music, Newsletter, Shows
- **Releases** - Albums, EPs, Singles
- **Contacts** - Booking agents and management
- **Shows** - Tour dates and venues

### Studio Access

**Local:** http://localhost:3000/studio  
**Production:** https://[your-site].vercel.app/studio

Login with your Sanity account to manage content.

### Data Revalidation

Pages revalidate every 30 seconds, ensuring content changes appear quickly while maintaining performance.

## Project Structure

```
adna/
├── app/                    # Next.js App Router pages
├── components/             # React components
├── sanity/                 # Sanity CMS configuration
│   ├── lib/               # Client, queries, image helpers
│   └── schemaTypes/       # Content type definitions
├── public/                 # Static assets
└── styles/                 # Global SCSS
```

## Deployment

The project is deployed on Vercel with automatic deployments from the `main` branch.

### Environment Variables

Set these in Vercel project settings:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=jvulwqq0
NEXT_PUBLIC_SANITY_DATASET=production
```

## Features

- ✅ Dynamic content management via Sanity Studio
- ✅ Responsive design (mobile-first)
- ✅ Image optimization via Sanity CDN
- ✅ Featured release on homepage
- ✅ Tour dates with upcoming filter
- ✅ Social media integration
- ✅ Contact with email link

## Content Management

Artists can manage all content through the Studio:

1. Visit `/studio`
2. Edit pages, releases, shows, or contacts
3. Upload and crop images
4. Publish changes
5. See updates on site within 30 seconds

No code changes required!

## License

All rights reserved © 2024 ADNA
