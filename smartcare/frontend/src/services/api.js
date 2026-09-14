import axios from "axios";

const API = axios.create({
  // Falls back to local backend during development. Once deployed, set
  // REACT_APP_API_URL in the frontend's .env (see DATABASE_SETUP.md).
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
});

// Add token to requests if logged in
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
