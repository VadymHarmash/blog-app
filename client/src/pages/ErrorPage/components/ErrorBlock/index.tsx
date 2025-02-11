import React from "react";
import styles from "./errorBlock.module.scss";
import { NavLink } from "react-router-dom";

export const ErrorBlock = () => {
  return (
    <div className={styles.errorBlock}>
      <div className="container">
        <p>Error 404: Page Not Found.</p>
        <p>
          Check the URL or go back to the <NavLink to="/">homepage</NavLink> to
          continue browsing our site.
        </p>
      </div>
    </div>
  );
};
