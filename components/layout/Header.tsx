"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import Navigation from "./Navigation";
import type { NavigationItem } from "@/lib/content";
import styles from "./Header.module.scss";

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
  const windowWidth = useSyncExternalStore(
    subscribeResize,
    getWidthSnapshot,
    getWidthServerSnapshot
  );
  const isDesktop = windowWidth >= 769;

  // Calculate font size based on device and scroll
  const baseFontSize = isDesktop ? 3 : 2;
  const fontSize = baseFontSize;

  const showHamburger = !isDesktop;
  const showHorizontalMenu = isDesktop;

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <h1 style={{ fontSize: `${fontSize}rem` }}>
            <Link href="/">{logoText}</Link>
          </h1>
        </div>
        <Navigation
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
