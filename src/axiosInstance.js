import axios from "axios";

const baseURL =
  import.meta.env.VITE_REACT_APP_API_BASE || "https://octane-limousine-backend.vercel.app";

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

export default axiosInstance;
