import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:5001/api",
  withCredentials: true, // ✅ keeps session cookies
});

export default api;
