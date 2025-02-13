import React, { useState } from "react";
import { addPost, getPostsByAuthor } from "../../../../store/thunks/postThunk";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import styles from "./profileForm.module.scss";

export const ProfileForm = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.userReducer);
  const [postText, setPostText] = useState("");
  const handleAddPost = () => {
    if (postText.trim() !== "") {
      dispatch(addPost({ text: postText, authorId: user?.id || "" })).then(
        () => {
          dispatch(getPostsByAuthor(user?.id || ""));
        },
      );
      setPostText("");
    }
  };

  return (
    <div className={styles.profileInfo}>
      {user && (
        <>
          <h3 className={styles.userName}>{user.name}</h3>
          <p className={styles.userEmail}>{user.email}</p>
        </>
      )}
      <div className={styles.profileInfo__form}>
        <textarea
          className={styles.profileInfo__form__textArea}
          placeholder="Write a new post..."
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
        />
        <button className={styles.profileInfo__form__addButton} onClick={handleAddPost}>
          Add post
        </button>
      </div>
    </div>
  );
};
