import axios from "axios";

const api = axios.create({
  baseURL: "https://hotel-management-system-s7gz.onrender.com/api",
});

// Always attach JWT token before every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");  // ← Token yaha se milega
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// for login time token setting
export function setAuthToken(token) {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("token", token);
  } else {
    delete api.defaults.headers.common["Authorization"];
    localStorage.removeItem("token");
  }
}

export default api;
