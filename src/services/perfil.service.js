import { API_URL } from "../constants/config.constants";
import authService from "./auth";

const authToken = {
  Authorization: `JWT ${authService.getToken()}`,
  "Content-Type": "application/json"
};

export const setUsuario = () => {
  const url = `${API_URL}/usuarios/`;
  return fetch(url, {
    method: "POST",
    headers: authToken
  })
    .then(result => {
      return result.json();
    })
    .catch(error => {
      return error.json();
    });
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

export const confirmarEmail = (uuid, confirmationKey) => {
  const url = `${API_URL}/confirmar_email/${uuid}/${confirmationKey}/`;
  let status = 0;
  return fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  })
    .then(res => {
      status = res.status;
      return res.json();
    })
    .then(data => {
      return { data: data, status: status };
    })
    .catch(error => {
      return error.json();
    });
};
