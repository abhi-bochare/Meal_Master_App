import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const get = (url) => API.get(url);
export const post = (url, data) => API.post(url, data).then((res) => res.data);

export const put = (url, data) => API.put(url, data);
export const del = (url) => API.delete(url);
