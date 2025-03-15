import axios from "axios";

const API_KEY: string | undefined = process.env.URL;

const axiosInstance = axios.create({
  baseURL: API_KEY,
  headers: { "Content-Type": "application/json" },
});

export default axiosInstance;
