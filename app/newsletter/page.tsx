import PageLayout from "@/components/common/PageLayout";
import { getPageContent } from "@/lib/content";

export default async function Newsletter() {
  const content = await getPageContent("newsletter");

  return (
    <PageLayout backgroundImage={content.backgroundImage}>
      <h1>{content.title}</h1>
      {content.body?.map((line, index) => (
        <p key={`${index}-${line}`}>{line}</p>
      ))}
    </PageLayout>
  );
}
