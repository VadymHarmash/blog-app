import { createSlice } from "@reduxjs/toolkit";
import { IPost } from "../../../interfaces/ui/IPost";
import { IError } from "../../../interfaces/IError";
import {addPost, deletePost, getPosts, getPostsByAuthor} from "../thunks/postThunk";

interface PostState {
  posts: IPost[];
  authorPosts: IPost[];
  loading: boolean;
  error: IError | null;
}

const initialState: PostState = {
  posts: [],
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
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        state.authorPosts = state.authorPosts.filter(post => post._id !== action.payload.id);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as IError;
      });
  },
});

export default postSlice.reducer;
