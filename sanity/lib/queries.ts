import { client } from "./client";

type Contact = {
  _id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  company: string;
  region: string;
};

type Release = {
  _id: string;
  title: string;
  release_type: string;
  releaseDate: string;
  coverImage: string; // Sanity image reference
  caption: string;
  link?: string;
  is_featured: boolean;
};

type Show = {
  _id: string;
  date: string;
  venue?: string;
  location: string;
  lineup: string;
  ticketUrl?: string;
  time?: string;
};

type PageContent = {
  _id: string;
  title: string;
  slug: { current: string };
  backgroundImage: string; // Sanity image reference
  body: string; // Portable Text content
};

/**
 * GROQ Queries for fetching Sanity data
 */

// Get a single page by slug
export async function getPageBySlug(slug: string): Promise<PageContent | null> {
  const query = `*[_type == "page" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    backgroundImage,
    body
  }`;

  return await client.fetch(query, { slug });
}

// Get all releases, sorted by release date (newest first)
export async function getAllReleases(): Promise<Release[]> {
  const query = `*[_type == "release"] | order(releaseDate desc) {
    _id,
    title,
    release_type,
    releaseDate,
    coverImage,
    caption,
    link,
    is_featured
  }`;

  return await client.fetch(query);
}

// Get all contacts
export async function getAllContacts(): Promise<Contact[]> {
  const query = `*[_type == "contact"] | order(name asc) {
    _id,
    name,
    role,
    email,
    phone,
    company,
    region
  }`;

  return await client.fetch(query);
}

// Get upcoming shows only (date >= today)
export async function getUpcomingShows(): Promise<Show[]> {
  const today = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD

  const query = `*[_type == "show" && date >= $today] | order(date asc) {
    _id,
    date,
    venue,
    location,
    lineup,
    ticketUrl,
    time
  }`;

  return await client.fetch(query, { today });
}
