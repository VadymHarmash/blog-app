import React, { useEffect } from "react";
import { getPosts } from "../../../../store/thunks/postThunk";
import { BlogPost } from "../BlogPost";
import { useAppSelector, useAppDispatch } from "../../../../hooks/redux";
import { IPost } from "../../../../../interfaces/ui/IPost";
import styles from "./blogsContainer.module.scss";

export const BlogsContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const { posts, loading, error } = useAppSelector((state) => state.postReducer);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className={styles.blogsContainer}>
      {posts && posts.slice().reverse().map((post: IPost) => (
        <BlogPost key={post._id} post={post} />
      ))}
    </div>
  );
};
