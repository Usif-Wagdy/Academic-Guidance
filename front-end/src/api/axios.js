import axios from "axios";
import { baseURL } from "./Api";
import Cookies from "js-cookie";

// Cookies And Token
const token = Cookies.get("authToken");

export const Axios = axios.create({
  baseURL: baseURL,
  headers: {
    Authorization: "Bearer " + token,
  },
});
