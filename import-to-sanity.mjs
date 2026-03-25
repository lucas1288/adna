import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { createClient } from "@sanity/client";
import { readFileSync, readdirSync, existsSync } from "fs";
import { join, basename } from "path";

// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "",
  token: process.env.SANITY_WRITE_TOKEN || "",
  apiVersion: "2024-03-11",
  useCdn: false, // Must be false for write operations
});

/**
 * Upload an image file to Sanity
 * @param {string} imagePath - Path to image relative to public/ (e.g., "/images/home-bg.png")
 * @returns {Promise<object>} - Sanity image reference object
 */
async function uploadImage(imagePath) {
  try {
    // Remove leading slash and construct full path
    const cleanPath = imagePath.startsWith("/")
      ? imagePath.slice(1)
      : imagePath;
    const fullPath = join(process.cwd(), "public", cleanPath);

    if (!existsSync(fullPath)) {
      console.warn(`⚠️  Image not found: ${fullPath}`);
      return null;
    }

    const imageBuffer = readFileSync(fullPath);
    const fileName = basename(fullPath);

    console.log(`  📤 Uploading image: ${fileName}`);

    const asset = await client.assets.upload("image", imageBuffer, {
      filename: fileName,
    });

    return {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: asset._id,
      },
    };
  } catch (error) {
    console.error(`  ❌ Error uploading image ${imagePath}:`, error.message);
    return null;
  }
}

/**
 * Import a page document
 */
async function importPage(jsonPath) {
  const fileName = basename(jsonPath, ".json");
  const data = JSON.parse(readFileSync(jsonPath, "utf-8"));

  console.log(`\n📄 Importing page: ${fileName}`);

  // Upload background image if present
  let backgroundImage = null;
  if (data.backgroundImage) {
    backgroundImage = await uploadImage(data.backgroundImage);
  }

  // Create Sanity document
  const doc = {
    _type: "page",
    _id: `page-${fileName}`, // Use consistent ID for idempotency
    slug: {
      _type: "slug",
      current: data.slug || fileName,
    },
    title: data.title || "",
    backgroundImage,
    body: data.body || "",
  };

  try {
    const result = await client.createOrReplace(doc);
    console.log(`  ✅ Page created: ${result.title}`);
    return result;
  } catch (error) {
    console.error(`  ❌ Error creating page:`, error.message);
    throw error;
  }
}

/**
 * Import a release document
 */
async function importRelease(jsonPath) {
  const fileName = basename(jsonPath, ".json");
  const data = JSON.parse(readFileSync(jsonPath, "utf-8"));

  console.log(`\n💿 Importing release: ${fileName}`);

  // Upload cover image if present
  let coverImage = null;
  if (data.coverImage) {
    coverImage = await uploadImage(data.coverImage);
  }

  // Create Sanity document
  const doc = {
    _type: "release",
    _id: `release-${fileName}`, // Use consistent ID for idempotency
    title: data.title || "",
    release_type: data.release_type || "album",
    releaseDate: data.releaseDate || null,
    coverImage,
    caption: data.caption || "",
    link: data.link || "",
  };

  try {
    const result = await client.createOrReplace(doc);
    console.log(`  ✅ Release created: ${result.title}`);
    return result;
  } catch (error) {
    console.error(`  ❌ Error creating release:`, error.message);
    throw error;
  }
}

/**
 * Import a contact document
 */
async function importContact(jsonPath) {
  const fileName = basename(jsonPath, ".json");
  const data = JSON.parse(readFileSync(jsonPath, "utf-8"));

  console.log(`\n👤 Importing contact: ${fileName}`);

  // Create Sanity document
  const doc = {
    _type: "contact",
    _id: `contact-${fileName}`, // Use consistent ID for idempotency
    name: data.name || "",
    role: data.role || "",
    email: data.email || "",
    phone: data.phone || "",
    company: data.company || "",
    region: data.region || "",
  };

  try {
    const result = await client.createOrReplace(doc);
    console.log(`  ✅ Contact created: ${result.name}`);
    return result;
  } catch (error) {
    console.error(`  ❌ Error creating contact:`, error.message);
    throw error;
  }
}

/**
 * Main import function
 */
async function importAll() {
  console.log("🚀 Starting Sanity import...\n");

  // Verify environment variables
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local");
  }
  if (!process.env.NEXT_PUBLIC_SANITY_DATASET) {
    throw new Error("Missing NEXT_PUBLIC_SANITY_DATASET in .env.local");
  }
  if (!process.env.SANITY_WRITE_TOKEN) {
    throw new Error("Missing SANITY_WRITE_TOKEN in .env.local");
  }

  const stats = {
    pages: 0,
    releases: 0,
    contacts: 0,
    errors: 0,
  };

  // Import pages
  const pagesDir = join(process.cwd(), "content", "pages");
  if (existsSync(pagesDir)) {
    const pageFiles = readdirSync(pagesDir).filter((f) => f.endsWith(".json"));
    for (const file of pageFiles) {
      try {
        await importPage(join(pagesDir, file));
        stats.pages++;
      } catch (error) {
        stats.errors++;
      }
    }
  }

  // Import releases
  const releasesDir = join(process.cwd(), "content", "releases");
  if (existsSync(releasesDir)) {
    const releaseFiles = readdirSync(releasesDir).filter((f) =>
      f.endsWith(".json"),
    );
    for (const file of releaseFiles) {
      try {
        await importRelease(join(releasesDir, file));
        stats.releases++;
      } catch (error) {
        stats.errors++;
      }
    }
  }

  // Import contacts
  const contactsDir = join(process.cwd(), "content", "contacts");
  if (existsSync(contactsDir)) {
    const contactFiles = readdirSync(contactsDir).filter((f) =>
      f.endsWith(".json"),
    );
    for (const file of contactFiles) {
      try {
        await importContact(join(contactsDir, file));
        stats.contacts++;
      } catch (error) {
        stats.errors++;
      }
    }
  }

  // Print summary
  console.log("\n" + "=".repeat(50));
  console.log("✨ Import complete!\n");
  console.log(`📄 Pages imported: ${stats.pages}`);
  console.log(`💿 Releases imported: ${stats.releases}`);
  console.log(`👤 Contacts imported: ${stats.contacts}`);
  if (stats.errors > 0) {
    console.log(`❌ Errors: ${stats.errors}`);
  }
  console.log("=".repeat(50));
}

// Run the import
importAll().catch((error) => {
  console.error("\n❌ Fatal error:", error.message);
  process.exit(1);
});
