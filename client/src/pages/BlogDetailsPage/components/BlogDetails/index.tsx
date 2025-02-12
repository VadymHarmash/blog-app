import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { getPost, commentPost } from "../../../../store/thunks/postThunk";
import { IComment } from "../../../../../interfaces/ui/IComment";
import styles from "./blogDetails.module.scss";

export const BlogDetails = () => {
  const postId = useParams().id;
  const dispatch = useAppDispatch();
  const { post } = useAppSelector((state) => state.postReducer);
  const { user } = useAppSelector((state) => state.userReducer);
  const [commentText, setCommentText] = useState("");
  const [localComments, setLocalComments] = useState(post?.comments || []);

  useEffect(() => {
    if (postId) {
      dispatch(getPost(postId));
    }
  }, [dispatch, postId]);

  useEffect(() => {
    if (post) {
      setLocalComments(post.comments);
    }
  }, [post]);

  const handleComment = () => {
    if (postId && commentText.trim() && user) {
      const newComment: IComment = {
        _id: Date.now().toString(),
        author: user.name,
        text: commentText,
      };
      setLocalComments((prevComments) => [newComment, ...prevComments]);
      dispatch(commentPost({ postId, author: user.name, text: commentText }));
      setCommentText("");
    }
  };

  return (
    <div className={styles.blogDetails}>
      <div className="container">
        {post && (
          <div className={styles.blogDetails__post}>
            <h2>{post.author.name}</h2>
            <p>{post.text}</p>
            <div className={styles.blogDetails__post__comments}>
              {localComments.map((comment) => (
                <div
                  key={comment._id}
                  className={styles.blogDetails__post__comment}
                >
                  <h3>{comment.author}</h3>
                  <span>{comment.text}</span>
                </div>
              ))}
            </div>
            <div className={styles.blogDetails__commentBox}>
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write a comment..."
              />
              <button onClick={handleComment}>Comment post</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
