import Markdown from "@/components/common/Markdown";
import PageLayout from "@/components/common/PageLayout";
import { urlFor } from "@/sanity/lib/image";
import { getPageBySlug } from "@/sanity/lib/queries";

export const revalidate = 30;

export default async function Newsletter() {
  const content = await getPageBySlug("newsletter");

  const backgroundImageUrl = content?.backgroundImage
    ? urlFor(content.backgroundImage).url()
    : null;

  return (
    <PageLayout
      backgroundImage={backgroundImageUrl || "/images/newsletter-bg.png"}
    >
      <h1>{content?.title || "Newsletter"}</h1>
      {content?.body ? <Markdown content={content.body} /> : null}
    </PageLayout>
  );
}
