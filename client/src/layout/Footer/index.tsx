import React from "react";
import { useAppSelector } from "../../hooks/redux";

export const Footer = () => {
  const { isAuthenticated } = useAppSelector((state) => state.userReducer);

  return isAuthenticated ? <footer>Footer</footer> : null;
};
