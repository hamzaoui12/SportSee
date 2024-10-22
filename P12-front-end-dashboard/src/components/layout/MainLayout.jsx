import styles from "@/styles/components/MainLayout.module.scss";

import NavBar from "@/components/ui/NavBar";

const MainLayout = ({ children }) => {
  return (
    <div className={styles.mainLayoutContainer}>
      <NavBar />
      <main>{children}</main>
    </div>
  );
};

export default MainLayout;
