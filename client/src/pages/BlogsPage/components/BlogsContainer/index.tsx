import React, { useEffect } from "react";
import styles from "./blogsContainer.module.scss";
import { BlogPost } from "../BlogPost";
import { IPost } from "../../../../../interfaces/ui/IPost";
import { useAppSelector, useAppDispatch } from "../../../../hooks/redux";
import { getPosts } from "../../../../store/thunks/postThunk";

export const BlogsContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const { posts, loading, error } = useAppSelector((state) => state.postReducer);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className={styles.blogsContainer}>
      {posts.slice().reverse().map((post: IPost) => (
        <BlogPost key={post._id} post={post} />
      ))}
    </div>
  );
};
