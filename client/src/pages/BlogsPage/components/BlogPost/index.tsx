import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./blogPost.module.scss";

type BlogPostProps = {
  post: any;
};

export const BlogPost: React.FC<BlogPostProps> = ({ post }) => {
  const navigate = useNavigate();

  const handlePostClick = () => {
    navigate(`/blog/${post._id}`);
  };

  return (
    <div className={styles.blogsContainer__post} onClick={handlePostClick}>
      <div
        className={styles.blogsContainer__post__image}
        style={{ backgroundColor: post.image }}
      />
      <div className={styles.blogsContainer__post__content}>
        <h3 className={styles.blogsContainer__post__author}>
          {post.author.name}
        </h3>
        <p className={styles.blogsContainer__post__text}>{post.text}</p>
        <div className={styles.blogsContainer__post__comments}>
          <h4>Comments: {post.comments.length}</h4>
        </div>
      </div>
    </div>
  );
};
