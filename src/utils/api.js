import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Add the token to headers
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Only these functions are available to import:
export const get = (url) => API.get(url);
export const post = (url, data) => API.post(url, data).then((res) => res.data);

// ❌ No 'put' exported unless you do this:
export const put = (url, data) => API.put(url, data);
export const del = (url) => API.delete(url);
