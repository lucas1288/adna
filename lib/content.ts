import fs from "node:fs/promises";
import path from "node:path";

export interface SiteSettings {
  siteName: string;
  title: string;
  description: string;
  logoText: string;
  footerText: string;
}

export interface NavigationItem {
  label: string;
  href: string;
  order?: number;
}

export interface SocialLink {
  platform: string;
  label: string;
  url: string;
}

export interface PageContent {
  title: string;
  backgroundImage: string;
  body?: string[];
}

export interface Show {
  date: string;
  venue: string;
  note?: string;
  location: string;
  ticketsUrl: string;
  ticketsLabel?: string;
  soldOut?: boolean;
}

export interface Album {
  title: string;
  type: string;
  year: number;
  coverImage: string;
  caption: string;
  link?: string;
}

export interface Single {
  title: string;
  type: string;
  year: number;
  coverImage: string;
  caption: string;
  label?: string;
  catalogNumber?: string;
  link?: string;
}

export interface Contact {
  category: string;
  email: string;
  buttonLabel: string;
}

const contentRoot = path.join(process.cwd(), "content");

const readJson = async <T>(relativePath: string): Promise<T> => {
  const filePath = path.join(contentRoot, relativePath);
  const fileContents = await fs.readFile(filePath, "utf8");
  return JSON.parse(fileContents) as T;
};

export const getSiteSettings = async (): Promise<SiteSettings> => {
  return readJson<SiteSettings>("settings/site.json");
};

export const getNavigation = async (): Promise<NavigationItem[]> => {
  const data = await readJson<{ items: NavigationItem[] }>(
    "settings/navigation.json"
  );

  return [...data.items].sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0)
  );
};

export const getSocialLinks = async (): Promise<SocialLink[]> => {
  const data = await readJson<{ links: SocialLink[] }>(
    "settings/social-links.json"
  );

  return data.links;
};

export const getPageContent = async (slug: string): Promise<PageContent> => {
  return readJson<PageContent>(`pages/${slug}.json`);
};

export const getShows = async (): Promise<Show[]> => {
  const showsDir = path.join(contentRoot, "shows");
  const entries = await fs.readdir(showsDir, { withFileTypes: true });
  const showFiles = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".json"))
    .map((entry) => entry.name);

  const shows = await Promise.all(
    showFiles.map((file) => readJson<Show>(path.join("shows", file)))
  );

  return shows.sort((a, b) => a.date.localeCompare(b.date));
};

export const getAlbums = async (): Promise<Album[]> => {
  const albumsDir = path.join(contentRoot, "albums");
  const entries = await fs.readdir(albumsDir, { withFileTypes: true });
  const albumFiles = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".json"))
    .map((entry) => entry.name);

  const albums = await Promise.all(
    albumFiles.map((file) => readJson<Album>(path.join("albums", file)))
  );

  return albums.sort((a, b) => b.year - a.year);
};

export const getSingles = async (): Promise<Single[]> => {
  const singlesDir = path.join(contentRoot, "singles");
  const entries = await fs.readdir(singlesDir, { withFileTypes: true });
  const singleFiles = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".json"))
    .map((entry) => entry.name);

  const singles = await Promise.all(
    singleFiles.map((file) => readJson<Single>(path.join("singles", file)))
  );

  return singles.sort((a, b) => b.year - a.year);
};

export const getContacts = async (): Promise<Contact[]> => {
  const contactsDir = path.join(contentRoot, "contacts");
  const entries = await fs.readdir(contactsDir, { withFileTypes: true });
  const contactFiles = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".json"))
    .map((entry) => entry.name);

  const contacts = await Promise.all(
    contactFiles.map((file) => readJson<Contact>(path.join("contacts", file)))
  );

  return contacts;
};
