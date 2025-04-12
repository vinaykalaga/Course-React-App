// src/api/apiClient.ts
import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080",
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
