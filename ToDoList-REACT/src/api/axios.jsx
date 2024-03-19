import axios from "axios";

const BASE_URL = `https://localhost:44307/api/`;

const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export { axiosPrivate, BASE_URL };
