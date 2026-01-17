import type { SocialLink } from "@/lib/content";
import styles from "./Footer.module.scss";

interface FooterProps {
  footerText: string;
  socialLinks: SocialLink[];
}

const Footer = ({ footerText, socialLinks }: FooterProps) => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p>{footerText}</p>
        <div className={styles.socialLinks}>
          {socialLinks.map((link) => (
            <a key={`${link.platform}-${link.url}`} href={link.url} aria-label={link.label}>
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
