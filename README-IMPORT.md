# Sanity Import Script

This script imports your existing JSON content into Sanity CMS.

## What It Does

1. Reads all JSON files from:
   - `content/pages/` → Creates **Page** documents
   - `content/releases/` → Creates **Release** documents
   - `content/contacts/` → Creates **Contact** documents

2. For each file:
   - Uploads referenced images to Sanity CDN
   - Creates/updates the document in Sanity
   - Uses consistent IDs so you can run it multiple times safely

## Prerequisites

✅ You should have already:
- Created Sanity schemas (page.ts, release.ts, contact.ts)
- Added `SANITY_WRITE_TOKEN` to your `.env.local` file
- Installed `@sanity/client` package

## Running the Script

### Step 1: Place the script in your project root

Copy `import-to-sanity.mjs` to your project's root directory (same level as `package.json`)

### Step 2: Run it

```bash
node import-to-sanity.mjs
```

### Step 3: Check the results

- Watch the console output for success/error messages
- Visit `http://localhost:3000/studio` to see your imported content
- Images should be uploaded and visible in the Studio

## Expected Output

```
🚀 Starting Sanity import...

📄 Importing page: home
  📤 Uploading image: home-bg.png
  ✅ Page created: ADNA

💿 Importing release: adna
  📤 Uploading image: adna.jpg
  ✅ Release created: Adna

👤 Importing contact: booking-christopher-brosch
  ✅ Contact created: Christopher Brosch

==================================================
✨ Import complete!

📄 Pages imported: 5
💿 Releases imported: 13
👤 Contacts imported: 3
==================================================
```

## Troubleshooting

**Error: "Missing SANITY_WRITE_TOKEN"**
- Make sure you added the token to `.env.local`
- Restart your terminal/IDE to reload environment variables

**Error: "Image not found"**
- Check that images exist in `public/images/` directory
- Verify the paths in your JSON files match actual file locations

**Error: "Unauthorized"**
- Verify your write token has "Editor" permissions
- Check that project ID and dataset are correct in `.env.local`

## Re-running the Script

It's safe to run this script multiple times! It uses `createOrReplace` which means:
- Existing documents with the same ID will be updated
- No duplicates will be created
- New files will be imported

## After Import

Once the import is complete:
- Delete or archive the `content/` directory (no longer needed)
- Start fetching data from Sanity in your Next.js pages
- Your artist can now manage content through the Studio UI
