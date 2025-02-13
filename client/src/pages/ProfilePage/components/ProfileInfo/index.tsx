import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { getPostsByAuthor } from "../../../../store/thunks/postThunk";
import { ProfileForm } from "../ProfileForm";
import { ProfileBlogs } from "../ProfileBlogs";
import styles from "./profileInfo.module.scss";

export const ProfileInfo: React.FC = () => {
  const { user } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    user && dispatch(getPostsByAuthor(user?.id));
  }, [user, dispatch]);

  if (!user) return null;

  return (
    <div className="container">
      <div className={styles.profileInfo}>
        <ProfileForm />
        <ProfileBlogs />
      </div>
    </div>
  );
};
