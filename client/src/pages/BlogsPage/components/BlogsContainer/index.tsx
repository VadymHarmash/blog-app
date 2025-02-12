import React from "react";
import styles from "./blogsContainer.module.scss";
import { BlogPost } from "../BlogPost";
import { IPost } from "../../../../../interfaces/ui/IPost";

const posts: IPost[] = [
  {
    id: "1",
    author: "John Doe",
    image: "#3498db",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    comments: [
      { id: "c1", author: "Jane Smith", text: "Great post!" },
      { id: "c2", author: "Alice Johnson", text: "Interesting thoughts." },
    ],
  },
  {
    id: "2",
    author: "Emily White",
    image: "#e74c3c",
    text: "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere.",
    comments: [{ id: "c3", author: "Bob Brown", text: "Nice article!" }],
  },
];

export const BlogsContainer: React.FC = () => {
  return (
    <div className={styles.blogsContainer}>
      {posts.map((post) => (
        <BlogPost key={post.id} post={post} />
      ))}
    </div>
  );
};
