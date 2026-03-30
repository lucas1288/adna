"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Navigation from "./Navigation";
import styles from "./Header.module.scss";
import { NavigationItem } from "./types";
import { useIsDesktop, useWindowWidth } from "@/hooks/useWindowWidth";

interface HeaderProps {
  logoText: string;
  navigationItems: NavigationItem[];
}

const Header = ({ logoText, navigationItems }: HeaderProps) => {
  const isDesktop = useIsDesktop();
  const windowWidth = useWindowWidth();
  const [scrollProgress, setScrollProgress] = useState(0);
  const logoRef = useRef<HTMLDivElement>(null);
  const [logoWidth, setLogoWidth] = useState(0);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = 100;
      const progress = Math.min(window.scrollY / maxScroll, 1);
      setScrollProgress(progress);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Measure logo width (depends on scrollProgress since it affects font size)
  useEffect(() => {
    if (logoRef.current) {
      const updateLogoWidth = () => {
        setLogoWidth(logoRef.current?.offsetWidth || 0);
      };

      updateLogoWidth();
      // Re-measure on window resize
      window.addEventListener("resize", updateLogoWidth);
      return () => window.removeEventListener("resize", updateLogoWidth);
    }
  }, [scrollProgress]); // Re-measure when scroll changes (which changes font size)

  // Interpolate values
  const fontSize = isDesktop ? 3 : 2 - scrollProgress * 0.5; // 2rem → 1.5rem

  const headerPadding = isDesktop ? 2 : 1 - scrollProgress * 0.5; // 1rem → 0.5rem

  // Calculate distance to move logo from center to 1rem from left edge
  let logoTranslateX = 0;

  if (!isDesktop && logoWidth > 0 && windowWidth > 0) {
    // Logo is currently centered at windowWidth / 2
    const currentCenterPosition = windowWidth / 2;

    const targetCenterPosition = logoWidth / 2;

    // Distance to move (negative = move left)
    const maxDistance = currentCenterPosition - targetCenterPosition;

    logoTranslateX = -(scrollProgress * maxDistance);
  }

  const showHamburger = !isDesktop;
  const showHorizontalMenu = isDesktop;

  return (
    <header
      className={styles.header}
      style={{
        padding: `${headerPadding}rem 0`,
      }}
    >
      <div className={styles.container}>
        <div
          ref={logoRef}
          className={styles.logo}
          style={{
            transform: `translateX(${logoTranslateX}px)`,
          }}
        >
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
