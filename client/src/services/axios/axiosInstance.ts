import axios from "axios";
import { IAuthResponse } from "../../../interfaces/responses/IAuthResponse";

export const apiUrl = "http://localhost:5000/api";

export const $axios = axios.create({
  withCredentials: true,
  baseURL: apiUrl,
});

$axios.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

$axios.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const baseRequest = error.config;
    if (error.response.status === 401) {
      try {
        const response = await $axios.get<IAuthResponse>(`/refresh`, {
          withCredentials: true,
        });
        localStorage.setItem("token", response.data.accessToken);
        return $axios.request(baseRequest);
      } catch (e) {
        console.error(e);
      }
    }

    throw error;
  },
);
