import axios from "axios";

import { AUTH_TOKEN } from "./constants";
import { API_URL } from "../constants/config.constants";

const instance = axios.create({
  baseURL: API_URL,
  headers: AUTH_TOKEN
});
instance.interceptors.request.use(function(config) {
  if (!config.url.endsWith("/")) {
    throw new Error(
      "URLs devem obrigatoriamente terminar em '/': " + config.url
    );
  }
  return config;
});

export default instance;
