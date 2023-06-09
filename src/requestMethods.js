import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
const persistedData = JSON.parse(localStorage.getItem("persist:root"));
const TOKEN =
  persistedData &&
  persistedData.currentUser &&
  persistedData.currentUser.accessToken;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `${TOKEN}` },
});
