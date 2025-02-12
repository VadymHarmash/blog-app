import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import {
  addPost,
  deletePost,
  editPost,
  getPostsByAuthor,
} from "../../../../store/thunks/postThunk";
import styles from "./profileInfo.module.scss";

export const ProfileInfo: React.FC = () => {
  const { user } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();
  const { authorPosts, loading, error } = useAppSelector(
    (state) => state.postReducer
  );
  const [postText, setPostText] = useState("");
  const [editMode, setEditMode] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  const handleAddPost = () => {
    if (postText.trim() !== "") {
      dispatch(addPost({ text: postText, authorId: user?.id || "" })).then(() => {
        dispatch(getPostsByAuthor(user?.id || ""));
      });
      setPostText("");
    }
  };

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

  useEffect(() => {
    user && dispatch(getPostsByAuthor(user.id));
  }, [user, dispatch]);

  if (!user) return null;

  return (
    <div className="container">
      <div className={styles.profileInfo}>
        <div className={styles.profileInfo__form}>
          <h3 className={styles.userName}>{user.name}</h3>
          <p className={styles.userEmail}>{user.email}</p>

          <div className={styles.profileInfo__postForm}>
            <textarea
              className={styles.textArea}
              placeholder="Write a new post..."
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
            />
            <button className={styles.addButton} onClick={handleAddPost}>
              Add post
            </button>
          </div>
        </div>

        <div className={styles.profileInfo__rightSide}>
          {loading && <p>Loading posts...</p>}
          {error && <p>Error: {error.message}</p>}

          <div className={styles.profileInfo__postsContainer}>
            {authorPosts.length === 0 ? (
              <p>No posts yet</p>
            ) : (
              authorPosts
                .slice()
                .reverse()
                .map((post) => (
                  <div key={post._id} className={styles.post}>
                    <div className={styles.post__info}>
                      <p className={styles.postAuthor}>{post.author.name}</p>
                      {editMode === post._id ? (
                        <div>
                          <textarea
                            className={styles.textArea}
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                          />
                          <button
                            className={styles.saveButton}
                            onClick={() => handleEditPost(post._id)}
                          >
                            Save
                          </button>
                        </div>
                      ) : (
                        <p className={styles.postText}>{post.text}</p>
                      )}
                    </div>
                    <div className={styles.post__buttons}>
                      {editMode !== post._id && (
                        <button
                          onClick={() => enableEditMode(post._id, post.text)}
                          className={styles.post__edit}
                        >
                          Edit
                        </button>
                      )}
                      <button
                        onClick={() => handleDeletePost(post._id)}
                        className={styles.post__delete}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
