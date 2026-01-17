import { remark } from "remark";
import html from "remark-html";

interface MarkdownProps {
  content: string;
  className?: string;
}

const Markdown = async ({ content, className }: MarkdownProps) => {
  const processed = await remark().use(html).process(content);
  const markup = processed.toString();

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  );
};

export default Markdown;
