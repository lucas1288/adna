import { SocialIcon, isSocialIconName } from "@/components/icons/SocialIcons";
import { socialLinks as links } from "@/config/social-links";
import styles from "./SocialLinks.module.scss";

const SocialLinks = () => {
  return (
    <div className={styles.socialLinks}>
      {links.map((link) => {
        if (!isSocialIconName(link.platform)) {
          return null;
        }

        return (
          <a
            key={`${link.platform}-${link.url}`}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
          >
            <SocialIcon name={link.platform} size={28} />
          </a>
        );
      })}
    </div>
  );
};

export default SocialLinks;
