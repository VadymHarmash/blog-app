import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { IAddPostRequest } from "../../../interfaces/requests/IAddPostRequest";
import { ICommentPostRequest } from "../../../interfaces/requests/ICommentPostRequest";
import PostService from "../../services/PostService";

export const getPosts = createAsyncThunk(
  "post/getPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await PostService.getPosts();
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      return rejectWithValue(
        axiosError.response?.data || { message: axiosError.message },
      );
    }
  },
);

export const getPost = createAsyncThunk(
  "post/getPost",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await PostService.getPost(id);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      return rejectWithValue(
        axiosError.response?.data || { message: axiosError.message },
      );
    }
  },
);

export const getPostsByAuthor = createAsyncThunk(
  "post/getPostsByAuthor",
  async (authorId: string, { rejectWithValue }) => {
    try {
      const response = await PostService.getPostsByAuthor(authorId);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      return rejectWithValue(
        axiosError.response?.data || { message: axiosError.message },
      );
    }
  },
);

export const addPost = createAsyncThunk(
  "post/addPost",
  async ({ text, authorId }: IAddPostRequest, { rejectWithValue }) => {
    try {
      const response = await PostService.addPost(text, authorId);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      return rejectWithValue(
        axiosError.response?.data || { message: axiosError.message },
      );
    }
  },
);

export const editPost = createAsyncThunk(
  "post/editPost",
  async ({ id, text }: { id: string; text: string }, { rejectWithValue }) => {
    try {
      const response = await PostService.editPost(id, text);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      return rejectWithValue(
        axiosError.response?.data || { message: axiosError.message },
      );
    }
  },
);

export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await PostService.deletePost(id);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      return rejectWithValue(
        axiosError.response?.data || { message: axiosError.message },
      );
    }
  },
);

export const commentPost = createAsyncThunk(
  "post/commentPost",
  async (
    { postId, author, text }: ICommentPostRequest,
    { rejectWithValue },
  ) => {
    try {
      const response = await PostService.commentPost(postId, author, text);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      return rejectWithValue(
        axiosError.response?.data || { message: axiosError.message },
      );
    }
  },
);
