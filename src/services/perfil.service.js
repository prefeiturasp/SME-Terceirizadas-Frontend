import { API_URL } from "../constants/config.constants";
import authService from "./auth";

const authToken = {
  Authorization: `JWT ${authService.getToken()}`,
  "Content-Type": "application/json"
};

export const meusDados = () => {
  const url = `${API_URL}/usuarios/meus-dados/`;
  return fetch(url, {
    method: "GET",
    headers: authToken
  })
    .then(result => {
      return result.json();
    })
    .catch(error => {
      return error.json();
    });
};
