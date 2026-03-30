"use client";

import type { SocialLink } from "./types";
import styles from "./Footer.module.scss";
import { useIsDesktop } from "@/hooks/useWindowWidth";
import SocialLinks from "../common/SocialLinks";

interface FooterProps {
  footerText: string;
  socialLinks: SocialLink[];
}

const Footer = ({ footerText, socialLinks }: FooterProps) => {
  const isDesktop = useIsDesktop();
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p>{footerText}</p>
        <div className={styles.socialLinks}>
          {isDesktop ? (
            socialLinks.map((link) => (
              <a
                key={`${link.platform}-${link.url}`}
                href={link.url}
                aria-label={link.label}
              >
                {link.label}
              </a>
            ))
          ) : (
            <SocialLinks />
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
