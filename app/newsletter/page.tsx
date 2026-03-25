import Markdown from "@/components/common/Markdown";
import PageLayout from "@/components/common/PageLayout";
import { urlFor } from "@/sanity/lib/image";
import { getPageBySlug } from "@/sanity/lib/queries";

export default async function Newsletter() {
  const [content] = await Promise.all([getPageBySlug("newsletter")]);

  // Convert Sanity image reference to URL
  const backgroundImageUrl = content?.backgroundImage
    ? urlFor(content.backgroundImage).url()
    : null;

  return (
    <PageLayout
      backgroundImage={backgroundImageUrl || "/images/contact-bg.png"}
    >
      <h1>{content?.title || "Newsletter"}</h1>
      {content?.body ? <Markdown content={content.body} /> : null}
    </PageLayout>
  );
}
