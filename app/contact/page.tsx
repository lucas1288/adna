import PageLayout from "@/components/common/PageLayout";
import Markdown from "@/components/common/Markdown";
import SocialLinks from "@/components/common/SocialLinks";
import { getPageBySlug, getAllContacts } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import styles from "./Contact.module.scss";

export default async function Contact() {
  const [content, contacts] = await Promise.all([
    getPageBySlug("contact"),
    getAllContacts(),
  ]);

  // Convert Sanity image reference to URL
  const backgroundImageUrl = content?.backgroundImage
    ? urlFor(content.backgroundImage).url()
    : null;

  return (
    <PageLayout
      backgroundImage={backgroundImageUrl || "/images/contact-bg.png"}
    >
      <div className={styles.contact}>
        <header>
          <h1>{content?.title || "Contact"}</h1>
          {content?.body ? <Markdown content={content.body} /> : null}
        </header>
        <div className={styles.contact__social}>
          <SocialLinks />
        </div>
        <ul className={styles.contact__list}>
          {contacts.map((contact) => (
            <li
              key={`${contact._id}-${contact.email}`}
              className={styles.contact__item}
            >
              <a href={`mailto:${contact.email}`}>
                <div className={styles.contact__label}>{contact.email}</div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </PageLayout>
  );
}
