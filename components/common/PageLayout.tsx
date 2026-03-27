import styles from "./PageLayout.module.scss";

interface PageLayoutProps {
  backgroundImage: string;
  children: React.ReactNode;
}

const PageLayout = ({ backgroundImage, children }: PageLayoutProps) => {
  return (
    <div
      className={styles.page}
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className={styles.pageContent}>{children}</div>
    </div>
  );
};

export default PageLayout;
