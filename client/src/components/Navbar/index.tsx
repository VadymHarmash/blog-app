import React from "react";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import styles from "./navbar.module.scss";
import { logout } from "../../store/reducers/userSlice";

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
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className={styles.navbar}>
      {isAuthenticated ? (
        <div className={styles.navbar__signed}>
          <ul className={styles.navbar__links}>
            {navLinks.map((link) => (
              <li key={link.id} className={styles.navbar__link}>
                <NavLink to={link.route} className={styles.navbar__link__text}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <button className={styles.navbar__logout} onClick={handleLogout}>Logout</button>
        </div>
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
