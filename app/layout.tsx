import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.scss";

export const metadata: Metadata = {
  title: "ADNA - Official Website",
  description: "Official website of ADNA - Music, Shows, and Contact",
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Hardcoded navigation items (these rarely change)
  const navigationItems = [
    { label: "Home", href: "/" },
    { label: "Music", href: "/music" },
    { label: "Shows", href: "/shows" },
    { label: "Contact", href: "/contact" },
    { label: "Newsletter", href: "/newsletter" },
  ];

  // Social media links - to change next time, as it is also used also in app/contact/page.tsx
  const socialLinks = [
    {
      platform: "spotify",
      label: "Spotify",
      url: "https://open.spotify.com/artist/1pduOlnYE5rd4VChXbeU8g",
    },
    {
      platform: "facebook",
      label: "Facebook",
      url: "https://www.facebook.com/AdnaArtistpage/",
    },
    {
      platform: "instagram",
      label: "Instagram",
      url: "https://www.instagram.com/adnakadic/",
    },
    {
      platform: "tiktok",
      label: "TikTok",
      url: "https://www.tiktok.com/@adnakadic",
    },
    {
      platform: "apple-music",
      label: "Apple Music",
      url: "https://music.apple.com/se/artist/adna/494579795",
    },
    {
      platform: "tidal",
      label: "TIDAL",
      url: "https://tidal.com/browse/artist/4457912",
    },
    {
      platform: "soundcloud",
      label: "SoundCloud",
      url: "https://soundcloud.com/adna-kadic",
    },
    {
      platform: "youtube",
      label: "YouTube",
      url: "https://www.youtube.com/@adna_music",
    },
    {
      platform: "discogs",
      label: "Discogs",
      url: "https://www.discogs.com/artist/4076002-Adna-Kadic",
    },
    {
      platform: "bandcamp",
      label: "Bandcamp",
      url: "https://artistadna.bandcamp.com/",
    },
  ];

  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Header logoText="ADNA" navigationItems={navigationItems} />
        {children}
        <Footer footerText="© 2024 ADNA" socialLinks={socialLinks} />
      </body>
    </html>
  );
}
