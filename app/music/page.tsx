import Markdown from "@/components/common/Markdown";
import PageLayout from "@/components/common/PageLayout";
import { getPageContent, getReleases } from "@/lib/content";
import styles from "./Music.module.scss";

const formatReleaseMeta = (releaseType: string, releaseDate: string) => {
  const date = new Date(`${releaseDate}T00:00:00Z`);
  const year = Number.isNaN(date.getTime()) ? "" : date.getUTCFullYear();
  return year ? `${releaseType} (${year})` : releaseType;
};

export default async function Music() {
  const [content, releases] = await Promise.all([
    getPageContent("music"),
    getReleases(),
  ]);

  const albums = releases.filter(
    (release) => release.release_type === "album"
  );
  const singles = releases.filter(
    (release) => release.release_type !== "album"
  );

  return (
    <PageLayout backgroundImage={content.backgroundImage}>
      <div className={styles.music}>
        <header>
          <h1 className={styles.music__heading}>{content.title}</h1>
          {content.body ? <Markdown content={content.body} /> : null}
        </header>
        <section className={styles.music__section}>
          <h2 className={styles.music__heading}>Albums</h2>
          <ul className={styles.music__grid}>
            {albums.map((album) => (
              <li key={`${album.title}-${album.year}`} className={styles.music__item}>
                {album.link ? (
                  <a href={album.link} target="_blank" rel="noopener noreferrer">
                    <img
                      className={styles.music__cover}
                      src={album.coverImage}
                      alt={album.caption}
                    />
                  </a>
                ) : (
                  <img
                    className={styles.music__cover}
                    src={album.coverImage}
                    alt={album.caption}
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
                <li key={`${single.title}-${single.year}`} className={styles.music__item}>
                  {single.link ? (
                    <a href={single.link} target="_blank" rel="noopener noreferrer">
                      <img
                        className={styles.music__cover}
                        src={single.coverImage}
                        alt={single.caption}
                      />
                    </a>
                  ) : (
                    <img
                      className={styles.music__cover}
                      src={single.coverImage}
                      alt={single.caption}
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
