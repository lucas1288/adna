import Markdown from "@/components/common/Markdown";
import PageLayout from "@/components/common/PageLayout";
import { getLanguageStrings, getPageContent, getShows } from "@/lib/content";
import styles from "./Shows.module.scss";

const formatShowDate = (value: string) => {
  const datePart = value.split("T")[0];
  const date = new Date(`${datePart}T00:00:00Z`);
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

const formatShowTime = (value: string) => {
  const match = value.match(/T(\d{2}):(\d{2})/);
  if (!match) {
    return null;
  }

  const hours = Number(match[1]);
  const minutes = match[2];
  if (Number.isNaN(hours)) {
    return null;
  }

  const period = hours >= 12 ? "PM" : "AM";
  const displayHour = hours % 12 === 0 ? 12 : hours % 12;

  return `${displayHour}:${minutes} ${period}`;
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
          shows.map((show) => {
            const showTime = formatShowTime(show.date);

            return (
              <li key={`${show.date}-${show.venue}`} className={styles["shows__item"]}>
              <div className={styles["shows__meta"]}>
                <span className={styles["shows__date"]}>
                  {formatShowDate(show.date)}
                </span>
                {show.venue ? (
                  <span className={styles["shows__venue"]}>{show.venue}</span>
                ) : null}
                {show.lineup ? (
                  <span className={styles["shows__note"]}>{show.lineup}</span>
                ) : null}
                {show.note ? (
                  <span className={styles["shows__note"]}>{show.note}</span>
                ) : null}
              </div>
              {show.location ? (
                <div className={styles["shows__location"]}>{show.location}</div>
              ) : null}
              {showTime ? (
                <div className={styles["shows__location"]}>
                  {showTime}
                </div>
              ) : null}
              {show.ticketsUrl && show.ticketsLabel ? (
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
              ) : null}
            </li>
            );
          })
        )}
      </ul>
    </PageLayout>
  );
}
