import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
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
        axiosError.response?.data || { message: axiosError.message }
      );
    }
  }
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
        axiosError.response?.data || { message: axiosError.message }
      );
    }
  }
);

export const addPost = createAsyncThunk(
  "post/addPost",
  async ({ text, authorId }: { text: string; authorId: string }, { rejectWithValue }) => {
    try {
      const response = await PostService.addPost(text, authorId);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      return rejectWithValue(
        axiosError.response?.data || { message: axiosError.message }
      );
    }
  }
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
        axiosError.response?.data || { message: axiosError.message }
      );
    }
  }
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
        axiosError.response?.data || { message: axiosError.message }
      );
    }
  }
);
