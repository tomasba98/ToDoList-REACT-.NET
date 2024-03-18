import axios from "axios";

const BASE_URL = "https://localhost:44307/api";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export { axiosInstance, axiosPrivate, BASE_URL }; // Dando nombre a las exportaciones
