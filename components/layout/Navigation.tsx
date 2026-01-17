"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./Navigation.module.scss";
import type { NavigationItem } from "@/lib/content";

interface NavigationProps {
  isDesktop?: boolean;
  showHamburger?: boolean;
  showHorizontalMenu?: boolean;
  items: NavigationItem[];
}

const Navigation = ({
  isDesktop = false,
  showHamburger = true,
  showHorizontalMenu = false,
  items,
}: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  // Calculate position for desktop hamburger (appears at right when visible)
  const navStyle =
    isDesktop && showHamburger
      ? {
          position: "absolute" as const,
          right: "2rem",
        }
      : {};

  return (
    <nav
      className={`${styles.nav} ${
        !showHamburger && !showHorizontalMenu ? styles.hidden : ""
      }`}
      style={navStyle}
    >
      {showHamburger && (
        <button
          className={styles.hamburger}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span
            className={`${styles.line} ${isOpen ? styles.open : ""}`}
          ></span>
          <span
            className={`${styles.line} ${isOpen ? styles.open : ""}`}
          ></span>
          <span
            className={`${styles.line} ${isOpen ? styles.open : ""}`}
          ></span>
        </button>
      )}

      {/* Full-screen blurred overlay */}
      <div
        className={`${styles.menuOverlay} ${isOpen ? styles.open : ""} ${
          showHorizontalMenu ? styles.horizontal : ""
        }`}
        onClick={closeMenu}
      >
        <ul className={styles.navList} onClick={(e) => e.stopPropagation()}>
          {items.map((item, index) => (
            <li key={`${item.href}-${item.label}`} style={{ animationDelay: `${(index + 1) * 0.1}s` }}>
              <Link href={item.href} onClick={closeMenu}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
