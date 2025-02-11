import React from "react";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import styles from "./navbar.module.scss";

export const Navbar = () => {
  const navLinks = [
    {
      id: 1,
      route: "/",
      label: "Blogs",
    },
    {
      id: 2,
      route: "/profile",
      label: "Profile",
    },
  ];

  const { isAuthenticated } = useAppSelector((state) => state.userReducer);

  return (
    <nav className={styles.navbar}>
      {isAuthenticated ? (
        <ul className={styles.navbar__links}>
          {navLinks.map((link) => (
            <li key={link.id} className={styles.navbar__link}>
              <NavLink to={link.route} className={styles.navbar__link__text}>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.navbar__signUp}>
          <span>Do not have profile?</span>
          <NavLink to={"/signup"} className={styles.navbar__signUp__button}>
            Sign up
          </NavLink>
          <span>here</span>
        </div>
      )}
    </nav>
  );
};
