"use client";

import { useSyncExternalStore } from "react";
import Navigation from "./Navigation";
import type { NavigationItem } from "@/lib/content";
import styles from "./Header.module.scss";

const maxScroll = 200;

const subscribeScroll = (callback: () => void) => {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
};

const getScrollSnapshot = () => Math.min(window.scrollY / maxScroll, 1);
const getScrollServerSnapshot = () => 0;

const subscribeResize = (callback: () => void) => {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
};

const getWidthSnapshot = () => window.innerWidth;
const getWidthServerSnapshot = () => 0;

interface HeaderProps {
  logoText: string;
  navigationItems: NavigationItem[];
}

const Header = ({ logoText, navigationItems }: HeaderProps) => {
  const scrollProgress = useSyncExternalStore(
    subscribeScroll,
    getScrollSnapshot,
    getScrollServerSnapshot
  );
  const windowWidth = useSyncExternalStore(
    subscribeResize,
    getWidthSnapshot,
    getWidthServerSnapshot
  );
  const isDesktop = windowWidth >= 769;

  const isScrolled = scrollProgress !== 0;

  // Calculate font size based on device and scroll
  const baseFontSize = isDesktop ? 3 : 2;
  const fontSizeReduction = isDesktop ? 1 : 0.5;
  const fontSize = baseFontSize - scrollProgress * fontSizeReduction;

  // Calculate left position with minimum margin
  const minMargin = isDesktop ? 2 : 1;
  const calculatedLeft = 50 - scrollProgress * 45;
  const finalLeft = Math.max(minMargin, calculatedLeft);

  // Unified positioning logic
  const logoStyle =
    isDesktop && !isScrolled
      ? {}
      : {
          position: "absolute" as const,
          left: `${finalLeft}%`,
          transform: "translateX(-50%)",
          ...(isDesktop && { top: 0 }),
        };

  const showHamburger = !isDesktop || scrollProgress >= 0.9;
  const showHorizontalMenu = isDesktop && !isScrolled;

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.container}>
        <div className={styles.logo} style={logoStyle}>
          <h1 style={{ fontSize: `${fontSize}rem` }}>{logoText}</h1>
        </div>
        <Navigation
          isScrolled={isScrolled}
          isDesktop={isDesktop}
          showHamburger={showHamburger}
          showHorizontalMenu={showHorizontalMenu}
          items={navigationItems}
        />
      </div>
    </header>
  );
};

export default Header;
