import Markdown from "@/components/common/Markdown";
import PageLayout from "@/components/common/PageLayout";
import { getLanguageStrings, getPageContent, getShows } from "@/lib/content";
import styles from "./Shows.module.scss";

const formatShowDate = (value: string) => {
  const date = new Date(`${value}T00:00:00Z`);
  const parts = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  }).formatToParts(date);
  const month = parts.find((part) => part.type === "month")?.value ?? "";
  const day = parts.find((part) => part.type === "day")?.value ?? "";
  const year = parts.find((part) => part.type === "year")?.value ?? "";

  return `${month.toUpperCase()} ${day}, ${year}`;
};

export default async function Shows() {
  const [content, shows, strings] = await Promise.all([
    getPageContent("shows"),
    getShows(),
    getLanguageStrings(),
  ]);

  return (
    <PageLayout backgroundImage={content.backgroundImage}>
      <header className={styles["shows__header"]}>
        <h1 className={styles["shows__title"]}>{content.title}</h1>
        {content.body ? (
          <Markdown content={content.body} className={styles["shows__intro"]} />
        ) : null}
      </header>
      <ul className={styles.shows}>
        {shows.length === 0 ? (
          <li className={styles["shows__item"]}>
            <div className={styles["shows__meta"]}>
              <span className={styles["shows__date"]}>{strings.no_shows}</span>
            </div>
          </li>
        ) : (
          shows.map((show) => (
            <li key={`${show.date}-${show.venue}`} className={styles["shows__item"]}>
              <div className={styles["shows__meta"]}>
                <span className={styles["shows__date"]}>
                  {formatShowDate(show.date)}
                </span>
                <span className={styles["shows__venue"]}>{show.venue}</span>
                {show.note ? (
                  <span className={styles["shows__note"]}>{show.note}</span>
                ) : null}
              </div>
              <div className={styles["shows__location"]}>{show.location}</div>
              <div className={styles["shows__action"]}>
                <a
                  className={styles["shows__tickets"]}
                  href={show.ticketsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {show.ticketsLabel}
                </a>
              </div>
            </li>
          ))
        )}
      </ul>
    </PageLayout>
  );
}
