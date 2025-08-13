import React from "react";
import styles from "./layout.module.css";
import CartPanel from "./CartPanel";
import Images from "./images";

const Layout = () => {
  return (
    <div className={styles.layout}>
      <div className={styles.mainContent}>
        <Images />
      </div>
      <div className={styles.cartPanelWrapper}>
        <CartPanel />
      </div>
    </div>
  );
};

export default Layout;
