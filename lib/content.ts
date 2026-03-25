import fs from "node:fs/promises";
import path from "node:path";
import { withBasePath } from "./base-path";

export interface SiteSettings {
  siteName: string;
}

export interface NavigationItem {
  label: string;
  page: string;
  href?: string;
}

export interface SocialLink {
  platform: string;
  label: string;
  url: string;
}

export interface PageContent {
  title: string;
  backgroundImage: string;
  body?: string;
}

export interface Show {
  date: string;
  venue?: string;
  lineup?: string;
  note?: string;
  location?: string;
  ticketsUrl?: string;
  ticketsLabel?: string;
  soldOut?: boolean;
}

export interface Release {
  title: string;
  release_type: "album" | "single" | "ep";
  is_featured?: boolean;
  releaseDate: string;
  coverImage: string;
  caption: string;
  link?: string;
  label?: string;
  catalogNumber?: string;
}

export interface Contact {
  category: string;
  email: string;
  buttonLabel: string;
}

export interface LanguageStrings {
  no_shows: string;
  seo_title: string;
  seo_description: string;
  logo_text: string;
  footer_text: string;
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

  return data.items.map((item) => ({
    ...item,
    href: item.page === "home" ? "/" : `/${item.page}`,
  }));
};

export const getSocialLinks = async (): Promise<SocialLink[]> => {
  const data = await readJson<{ links: SocialLink[] }>(
    "settings/social-links.json"
  );

  return data.links;
};

export const getPageContent = async (slug: string): Promise<PageContent> => {
  const data = await readJson<PageContent>(`pages/${slug}.json`);

  return {
    ...data,
    backgroundImage: withBasePath(data.backgroundImage),
  };
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

  return shows.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
};

export const getReleases = async (): Promise<Release[]> => {
  const releasesDir = path.join(contentRoot, "releases");
  const entries = await fs.readdir(releasesDir, { withFileTypes: true });
  const releaseFiles = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".json"))
    .map((entry) => entry.name);

  const releases = await Promise.all(
    releaseFiles.map((file) => readJson<Release>(path.join("releases", file)))
  );

  const normalized = releases.map((release) => ({
    ...release,
    coverImage: withBasePath(release.coverImage),
  }));

  return normalized.sort(
    (a, b) =>
      Date.parse(`${b.releaseDate}T00:00:00Z`) -
      Date.parse(`${a.releaseDate}T00:00:00Z`)
  );
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

export const getLanguageStrings = async (): Promise<LanguageStrings> => {
  return readJson<LanguageStrings>("settings/strings.json");
};
