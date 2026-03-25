import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getLanguageStrings, getNavigation, getSiteSettings, getSocialLinks } from "@/lib/content";
import { withBasePath } from "@/lib/base-path";
import "./globals.scss";

export async function generateMetadata(): Promise<Metadata> {
  const strings = await getLanguageStrings();

  return {
    title: strings.seo_title,
    description: strings.seo_description,
    icons: {
      icon: withBasePath("/favicon.ico"),
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [siteSettings, navigationItems, socialLinks, strings] =
    await Promise.all([
      getSiteSettings(),
      getNavigation(),
      getSocialLinks(),
      getLanguageStrings(),
    ]);

  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Header logoText={strings.logo_text} navigationItems={navigationItems} />
        {children}
        <Footer footerText={strings.footer_text} socialLinks={socialLinks} />
      </body>
    </html>
  );
}
