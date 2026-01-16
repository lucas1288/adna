import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getNavigation, getSiteSettings, getSocialLinks } from "@/lib/content";
import "./globals.scss";

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettings();

  return {
    title: siteSettings.title,
    description: siteSettings.description,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [siteSettings, navigationItems, socialLinks] = await Promise.all([
    getSiteSettings(),
    getNavigation(),
    getSocialLinks(),
  ]);

  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Header logoText={siteSettings.logoText} navigationItems={navigationItems} />
        {children}
        <Footer footerText={siteSettings.footerText} socialLinks={socialLinks} />
      </body>
    </html>
  );
}
