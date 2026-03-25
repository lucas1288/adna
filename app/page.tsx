import Markdown from "@/components/common/Markdown";
import PageLayout from "@/components/common/PageLayout";
import { getPageBySlug, getAllReleases } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import styles from "./Home.module.scss";

export default async function Home() {
  const [content, releases] = await Promise.all([
    getPageBySlug("home"),
    getAllReleases(),
  ]);
  const featured = releases.find(
    (release: { is_featured: boolean }) => release.is_featured,
  );

  // Convert Sanity image reference to URL
  const backgroundImageUrl = content?.backgroundImage
    ? urlFor(content.backgroundImage).url()
    : null;

  return (
    <PageLayout backgroundImage={backgroundImageUrl || "/images/home-bg.png"}>
      <div className={styles.home}>
        {content?.body ? <Markdown content={content.body} /> : null}
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
              src={featured.coverImage ? urlFor(featured.coverImage).url() : ""}
              alt={featured.caption || featured.title}
            />
          </section>
        ) : null}
      </div>
    </PageLayout>
  );
}
