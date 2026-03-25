import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { createClient } from '@sanity/client';
import { readFileSync, readdirSync, existsSync } from 'fs';
import { join, basename } from 'path';

// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || '',
  token: process.env.SANITY_WRITE_TOKEN || '',
  apiVersion: '2024-03-11',
  useCdn: false,
});

/**
 * Import a show document
 */
async function importShow(jsonPath) {
  const fileName = basename(jsonPath, '.json');
  const data = JSON.parse(readFileSync(jsonPath, 'utf-8'));

  console.log(`\n🎸 Importing show: ${fileName}`);

  // Create Sanity document
  const doc = {
    _type: 'show',
    _id: `show-${fileName}`,
    date: data.date || null,
    venue: data.venue || '',
    location: data.location || '',
    lineup: data.lineup || '',
    ticketUrl: data.ticketUrl || data.ticket_url || '',
    time: data.time || '',
  };

  try {
    const result = await client.createOrReplace(doc);
    console.log(`  ✅ Show created: ${result.venue} - ${result.location}`);
    return result;
  } catch (error) {
    console.error(`  ❌ Error creating show:`, error.message);
    throw error;
  }
}

/**
 * Main import function
 */
async function importAllShows() {
  console.log('🚀 Starting shows import...\n');

  // Verify environment variables
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local');
  }
  if (!process.env.SANITY_WRITE_TOKEN) {
    throw new Error('Missing SANITY_WRITE_TOKEN in .env.local');
  }

  let stats = { shows: 0, errors: 0 };

  // Import shows from content/shows directory
  const showsDir = join(process.cwd(), 'content', 'shows');
  
  if (!existsSync(showsDir)) {
    console.error(`❌ Directory not found: ${showsDir}`);
    console.log('Please make sure your shows JSON files are in content/shows/');
    process.exit(1);
  }

  const showFiles = readdirSync(showsDir).filter((f) => f.endsWith('.json'));
  
  if (showFiles.length === 0) {
    console.log('⚠️  No JSON files found in content/shows/');
    process.exit(0);
  }

  for (const file of showFiles) {
    try {
      await importShow(join(showsDir, file));
      stats.shows++;
    } catch (error) {
      stats.errors++;
    }
  }

  // Print summary
  console.log('\n' + '='.repeat(50));
  console.log('✨ Import complete!\n');
  console.log(`🎸 Shows imported: ${stats.shows}`);
  if (stats.errors > 0) {
    console.log(`❌ Errors: ${stats.errors}`);
  }
  console.log('='.repeat(50));
}

// Run the import
importAllShows().catch((error) => {
  console.error('\n❌ Fatal error:', error.message);
  process.exit(1);
});
