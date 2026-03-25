import Markdown from "@/components/common/Markdown";
import PageLayout from "@/components/common/PageLayout";
import styles from "./Music.module.scss";
import { getAllReleases, getPageBySlug } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

export const revalidate = 30;

const formatReleaseMeta = (releaseType: string, releaseDate: string) => {
  const date = new Date(`${releaseDate}T00:00:00Z`);
  const year = Number.isNaN(date.getTime()) ? "" : date.getUTCFullYear();
  return year ? `${releaseType} (${year})` : releaseType;
};

export default async function Music() {
  const [content, releases] = await Promise.all([
    getPageBySlug("music"),
    getAllReleases(),
  ]);

  // Convert Sanity image reference to URL
  const backgroundImageUrl = content?.backgroundImage
    ? urlFor(content.backgroundImage).url()
    : null;

  const albums = releases.filter((release) => release.release_type === "album");
  const singles = releases.filter(
    (release) => release.release_type !== "album",
  );

  return (
    <PageLayout
      backgroundImage={backgroundImageUrl || "/images/contact-bg.png"}
    >
      <div className={styles.music}>
        <header>
          <h1 className={styles.music__heading}>{content?.title || "Music"}</h1>
          {content?.body ? <Markdown content={content.body} /> : null}
        </header>
        <section className={styles.music__section}>
          <h2 className={styles.music__heading}>Albums</h2>
          <ul className={styles.music__grid}>
            {albums.map((album) => (
              <li key={`${album.title}`} className={styles.music__item}>
                {album.link ? (
                  <a
                    href={album.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      className={styles.music__cover}
                      src={
                        album.coverImage ? urlFor(album.coverImage).url() : ""
                      }
                      alt={album.caption || album.title}
                    />
                  </a>
                ) : (
                  <img
                    className={styles.music__cover}
                    src={album.coverImage ? urlFor(album.coverImage).url() : ""}
                    alt={album.caption || album.title}
                  />
                )}
                <div className={styles.music__caption}>{album.title}</div>
                <div className={styles.music__meta}>
                  {formatReleaseMeta(album.release_type, album.releaseDate)}
                </div>
              </li>
            ))}
          </ul>
        </section>
        {singles.length > 0 ? (
          <section className={styles.music__section}>
            <h2 className={styles.music__heading}>Singles & EPs</h2>
            <ul className={styles.music__grid}>
              {singles.map((single) => (
                <li key={`${single.title}`} className={styles.music__item}>
                  {single.link ? (
                    <a
                      href={single.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        className={styles.music__cover}
                        src={
                          single.coverImage
                            ? urlFor(single.coverImage).url()
                            : ""
                        }
                        alt={single.caption || single.title}
                      />
                    </a>
                  ) : (
                    <img
                      className={styles.music__cover}
                      src={
                        single.coverImage ? urlFor(single.coverImage).url() : ""
                      }
                      alt={single.caption || single.title}
                    />
                  )}
                  <div className={styles.music__caption}>{single.title}</div>
                  <div className={styles.music__meta}>
                    {formatReleaseMeta(single.release_type, single.releaseDate)}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </PageLayout>
  );
}
