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
