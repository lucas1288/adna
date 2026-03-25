export interface SiteSettings {
  siteName: string;
}

export interface NavigationItem {
  label: string;
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
