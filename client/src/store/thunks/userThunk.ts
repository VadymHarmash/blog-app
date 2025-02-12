import { createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../../services/AuthService";
import { IUserToLogin } from "../../../interfaces/users/IUserToLogin";
import { IUserToSignUp } from "../../../interfaces/users/IUserToSignUp";
import { AxiosError } from "axios";
import axios from "axios";
import { IAuthResponse } from "../../../interfaces/responses/IAuthResponse";

const url = "http://localhost:5000/api";

export const signUp = createAsyncThunk(
  "users/signUp",
  async (userData: IUserToSignUp, { rejectWithValue }) => {
    try {
      const response = await AuthService.signUp(userData);
      return response.data.user;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      return rejectWithValue(
        axiosError.response?.data || { message: axiosError.message },
      );
    }
  },
);

export const login = createAsyncThunk(
  "users/login",
  async (userData: IUserToLogin, { rejectWithValue }) => {
    try {
      const response = await AuthService.login(userData);
      localStorage.setItem("token", response.data.accessToken);
      return response.data.user;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      return rejectWithValue(
        axiosError.response?.data || { message: axiosError.message },
      );
    }
  },
);

export const logout = createAsyncThunk(
  "users/logout",
  async (_, { rejectWithValue }) => {
    try {
      await AuthService.logout();
      localStorage.removeItem("token");
      return { message: "Logged out successfully" };
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      return rejectWithValue(
        axiosError.response?.data || { message: axiosError.message },
      );
    }
  },
);

export const checkAuth = createAsyncThunk(
  "users/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<IAuthResponse>(`${url}/refresh`, {
        withCredentials: true,
      });
      localStorage.setItem("token", response.data.accessToken);
      return response.data.user;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      return rejectWithValue(
        axiosError.response?.data || { message: axiosError.message }
      );
    }
  }
);

