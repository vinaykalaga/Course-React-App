import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080",
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // assuming token is saved like this
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
 // (error) => Promise.reject(error)
);

export default apiClient;
