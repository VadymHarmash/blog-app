import axios from "axios";

export const apiUrl = "http://localhost:5000/api";

export const $axios = axios.create({
  withCredentials: true,
  baseURL: apiUrl,
});

$axios.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config;
})

// $axios.interceptors.response.use
