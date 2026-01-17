import BackgroundSetter from "./BackgroundSetter";
import styles from "./PageLayout.module.scss";

interface PageLayoutProps {
  backgroundImage: string;
  children: React.ReactNode;
}

const PageLayout = ({ backgroundImage, children }: PageLayoutProps) => {
  return (
    <div className={styles.page}>
      <BackgroundSetter image={backgroundImage} />
      <div className={styles.pageContent}>{children}</div>
    </div>
  );
};

export default PageLayout;
