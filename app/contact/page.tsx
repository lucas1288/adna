import PageLayout from "@/components/common/PageLayout";
import { getPageContent } from "@/lib/content";

export default async function Contact() {
  const content = await getPageContent("contact");

  return (
    <PageLayout backgroundImage={content.backgroundImage}>
      <h1>{content.title}</h1>
      {content.body?.map((line, index) => (
        <p key={`${index}-${line}`}>{line}</p>
      ))}
    </PageLayout>
  );
}
