import { createSlice } from "@reduxjs/toolkit";
import { IPost } from "../../../interfaces/ui/IPost";
import { IError } from "../../../interfaces/errors/IError";
import {
  addPost,
  commentPost,
  deletePost,
  editPost,
  getPost,
  getPosts,
  getPostsByAuthor,
} from "../thunks/postThunk";

interface PostState {
  posts: IPost[];
  post: IPost | null;
  authorPosts: IPost[];
  loading: boolean;
  error: IError | null;
}

const initialState: PostState = {
  posts: [],
  post: null,
  authorPosts: [],
  loading: false,
  error: null,
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as IError;
      })

      .addCase(getPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPost.fulfilled, (state, action) => {
        state.loading = false;
        state.post = action.payload;
      })
      .addCase(getPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as IError;
      })

      .addCase(getPostsByAuthor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPostsByAuthor.fulfilled, (state, action) => {
        state.loading = false;
        state.authorPosts = action.payload;
      })
      .addCase(getPostsByAuthor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as IError;
      })

      .addCase(addPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.loading = false;
        state.authorPosts = [action.payload, ...state.authorPosts];
      })
      .addCase(addPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as IError;
      })

      .addCase(editPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editPost.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(editPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as IError;
      })

      .addCase(deletePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        state.authorPosts = state.authorPosts.filter(
          (post) => post._id !== action.payload.id,
        );
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as IError;
      })

      .addCase(commentPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(commentPost.fulfilled, (state, action) => {
        state.loading = false;

        if (state.post && state.post._id === action.payload.postId) {
          state.post = {
            ...state.post,
            comments: [...state.post.comments, action.payload],
          };
        }

        state.authorPosts = state.authorPosts.map((post) =>
          post._id === action.payload.postId
            ? { ...post, comments: [...post.comments, action.payload] }
            : post,
        );
      })

      .addCase(commentPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as IError;
      });
  },
});

export default postSlice.reducer;
