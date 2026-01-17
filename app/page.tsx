import Markdown from "@/components/common/Markdown";
import PageLayout from "@/components/common/PageLayout";
import { getPageContent, getReleases } from "@/lib/content";
import styles from "./Home.module.scss";

export default async function Home() {
  const [content, releases] = await Promise.all([
    getPageContent("home"),
    getReleases(),
  ]);
  const featured = releases.find((release) => release.is_featured);

  return (
    <PageLayout backgroundImage={content.backgroundImage}>
      <div className={styles.home}>
        {content.body ? <Markdown content={content.body} /> : null}
        {featured ? (
          <section className={styles.home__featured}>
            <div className={styles.home__featuredTitle}>
              {featured.title} {featured.release_type}
            </div>
            <div className={styles.home__featuredSub}>out now</div>
            {featured.link ? (
              <a
                className={styles.home__featuredLink}
                href={featured.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Watch / Listen
              </a>
            ) : null}
            <img
              className={styles.home__featuredArt}
              src={featured.coverImage}
              alt={featured.caption}
            />
          </section>
        ) : null}
      </div>
    </PageLayout>
  );
}
