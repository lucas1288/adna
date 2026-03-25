import { SocialIcon, isSocialIconName } from "@/components/icons/SocialIcons";
import styles from "./SocialLinks.module.scss";

// hardcoded for now, but can be made dynamic later if needed (also used in  layout.tsx)

const links = [
  {
    platform: "spotify",
    label: "Spotify",
    url: "https://open.spotify.com/artist/1pduOlnYE5rd4VChXbeU8g",
  },
  {
    platform: "facebook",
    label: "Facebook",
    url: "https://www.facebook.com/AdnaArtistpage/",
  },
  {
    platform: "instagram",
    label: "Instagram",
    url: "https://www.instagram.com/adnakadic/",
  },
  {
    platform: "tiktok",
    label: "TikTok",
    url: "https://www.tiktok.com/@adnakadic",
  },
  {
    platform: "apple-music",
    label: "Apple Music",
    url: "https://music.apple.com/se/artist/adna/494579795",
  },
  {
    platform: "tidal",
    label: "TIDAL",
    url: "https://tidal.com/browse/artist/4457912",
  },
  {
    platform: "soundcloud",
    label: "SoundCloud",
    url: "https://soundcloud.com/adna-kadic",
  },
  {
    platform: "youtube",
    label: "YouTube",
    url: "https://www.youtube.com/@adna_music",
  },
  {
    platform: "discogs",
    label: "Discogs",
    url: "https://www.discogs.com/artist/4076002-Adna-Kadic",
  },
  {
    platform: "bandcamp",
    label: "Bandcamp",
    url: "https://artistadna.bandcamp.com/",
  },
];

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
