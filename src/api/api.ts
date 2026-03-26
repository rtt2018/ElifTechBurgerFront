import axios from "axios";

const api = axios.create({
  // baseURL: "https://eliftechburger.onrender.com/",
  baseURL: "http://localhost:4325/",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default api;
