import axios from "axios";

const api = axios.create({
  baseURL: "https://hotel-management-system-s7gz.onrender.com/api",
});

export function setAuthToken(token) {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
}

export default api;
