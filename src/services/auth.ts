import axios from "axios";

const AUTH_API = "http://localhost:8081/auth";

export const register = async (username: string, password: string) => {
  return axios.post(`${AUTH_API}/register`, { username, password });
};

export const login = async (username: string, password: string) => {
  const response = await axios.post(`${AUTH_API}/login`, { username, password });
  localStorage.setItem("token", response.data); // ✅ Store JWT in localStorage
};

export const logout = () => {
  localStorage.removeItem("token"); // ✅ Clear JWT on logout
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const isAuthenticated = () => {
  return !!getToken();
};
