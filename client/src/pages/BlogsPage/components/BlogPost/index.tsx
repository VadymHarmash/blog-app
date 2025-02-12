import React from "react";
import styles from "./blogPost.module.scss";
import { IComment } from "../../../../../interfaces/ui/IComment";

type BlogPostProps = {
  post: any;
};

export const BlogPost: React.FC<BlogPostProps> = ({ post }) => {
  return (
    <div className={styles.blogsContainer__post}>
      <div
        className={styles.blogsContainer__post__image}
        style={{ backgroundColor: post.image }}
      />
      <div className={styles.blogsContainer__post__content}>
        <h3 className={styles.blogsContainer__post__author}>{post.author}</h3>
        <p className={styles.blogsContainer__post__text}>{post.text}</p>
        <div className={styles.blogsContainer__post__comments}>
          <h4>Comments:</h4>
          {post.comments.map((comment: IComment) => (
            <div
              key={comment.id}
              className={styles.blogsContainer__post__comments__comment}
            >
              <strong>{comment.author}:</strong> {comment.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
