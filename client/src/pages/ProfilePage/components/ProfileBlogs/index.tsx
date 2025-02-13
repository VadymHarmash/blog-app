import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import {
  deletePost,
  editPost,
  getPostsByAuthor,
} from "../../../../store/thunks/postThunk";
import styles from "./profileBlogs.module.scss";

export const ProfileBlogs = () => {
  const { authorPosts, loading, error } = useAppSelector(
    (state) => state.postReducer,
  );
  const { user } = useAppSelector((state) => state.userReducer);

  const dispatch = useAppDispatch();

  const [editMode, setEditMode] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  const handleDeletePost = (postId: string) => {
    dispatch(deletePost(postId)).then(() => {
      dispatch(getPostsByAuthor(user?.id || ""));
    });
  };

  const handleEditPost = (postId: string) => {
    if (editText.trim() !== "") {
      dispatch(editPost({ id: postId, text: editText })).then(() => {
        dispatch(getPostsByAuthor(user?.id || ""));
        setEditMode(null);
        setEditText("");
      });
    }
  };

  const enableEditMode = (postId: string, currentText: string) => {
    setEditMode(postId);
    setEditText(currentText);
  };

  return (
    <div className={styles.profileBlogs}>
      {loading && <p>Loading posts...</p>}
      {error && <p>Error: {error.message}</p>}

      <div className={styles.profileBlogs__postsContainer}>
        {authorPosts.length === 0 ? (
          <p>No posts yet</p>
        ) : (
          authorPosts
            .slice()
            .reverse()
            .map((post) => (
              <div key={post._id} className={styles.profileBlogs__post}>
                <div className={styles.profileBlogs__post__info}>
                  <p className={styles.profileBlogs__post__author}>
                    {post.author.name}
                  </p>
                  {editMode === post._id ? (
                    <div className={styles.profileBlogs__post__editMode}>
                      <textarea
                        className={styles.profileBlogs__post__textArea}
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                      />
                      {loading ? (
                        <p>Saving...</p>
                      ) : (
                        <button
                          className={styles.profileBlogs__post__saveButton}
                          onClick={() => handleEditPost(post._id)}
                        >
                          Save
                        </button>
                      )}
                    </div>
                  ) : (
                    <p className={styles.postText}>{post.text}</p>
                  )}
                </div>
                <div className={styles.profileBlogs__post__buttons}>
                  {editMode !== post._id && (
                    <button
                      onClick={() => enableEditMode(post._id, post.text)}
                      className={styles.profileBlogs__post__edit}
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDeletePost(post._id)}
                    className={styles.profileBlogs__post__delete}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
};
