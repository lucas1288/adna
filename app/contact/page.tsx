import PageLayout from "@/components/common/PageLayout";
import Markdown from "@/components/common/Markdown";
import SocialLinks from "@/components/common/SocialLinks";
import { getContacts, getPageContent } from "@/lib/content";
import styles from "./Contact.module.scss";

export default async function Contact() {
  const [content, contacts] = await Promise.all([
    getPageContent("contact"),
    getContacts(),
  ]);

  return (
    <PageLayout backgroundImage={content.backgroundImage}>
      <div className={styles.contact}>
        <header>
          <h1>{content.title}</h1>
          {content.body ? <Markdown content={content.body} /> : null}
        </header>
        <ul className={styles.contact__list}>
          {contacts.map((contact) => (
            <li key={`${contact.category}-${contact.email}`} className={styles.contact__item}>
              <div className={styles.contact__label}>
                {contact.category}: {contact.email}
              </div>
              <a
                className={styles.contact__button}
                href={`mailto:${contact.email}`}
              >
                {contact.buttonLabel} →
              </a>
            </li>
          ))}
        </ul>
        <div className={styles.contact__social}>
          <SocialLinks />
        </div>
      </div>
    </PageLayout>
  );
}
