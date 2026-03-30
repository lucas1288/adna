import type { Metadata } from "next";
import { Oswald } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { socialLinks } from "@/config/social-links";
import "./globals.scss";

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
});

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
  const navigationItems = [
    { label: "Home", href: "/" },
    { label: "Music", href: "/music" },
    { label: "Shows", href: "/shows" },
    { label: "Contact", href: "/contact" },
    { label: "Newsletter", href: "/newsletter" },
  ];

  return (
    <html lang="en" className={oswald.variable} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Header logoText="ADNA" navigationItems={navigationItems} />
        {children}
        <Footer footerText="© 2026 ADNA" socialLinks={socialLinks} />
      </body>
    </html>
  );
}
