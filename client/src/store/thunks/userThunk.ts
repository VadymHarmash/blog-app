import { createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../../services/AuthService";
import { IUserToLogin } from "../../../interfaces/IUserToLogin";
import { IUserToSignUp } from "../../../interfaces/IUserToSignUp";
import { IAuthResponse } from "../../../interfaces/responses/IAuthResponse";
import { AxiosError } from "axios";

export const signUp = createAsyncThunk(
  "user/signUp",
  async (userData: IUserToSignUp, { rejectWithValue }) => {
    try {
      const response = await AuthService.signUp(userData);
      return response.data.user;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      return rejectWithValue(
        axiosError.response?.data || { message: axiosError.message }
      );
    }
  }
);

export const login = createAsyncThunk(
  "user/login",
  async (userData: IUserToLogin, { rejectWithValue }) => {
    try {
      const response = await AuthService.login(userData);
      return response.data.user;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      return rejectWithValue(
        axiosError.response?.data || { message: axiosError.message }
      );
    }
  }
);
