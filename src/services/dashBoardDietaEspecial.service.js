import { API_URL } from "../constants/config.constants";
import authService from "./auth";

const authToken = {
  Authorization: `JWT ${authService.getToken()}`,
  "Content-Type": "application/json"
};

export const getDietaEspecialPendenteAutorizacaoEscola = uuid => {
  const url = `${API_URL}/escola-solicitacoes/pendentes-autorizacao-dieta/${uuid}/`;

  const OBJ_REQUEST = {
    headers: authToken,
    method: "GET"
  };
  return fetch(url, OBJ_REQUEST)
    .then(result => {
      return result.json();
    })
    .catch(error => {
      console.log(error);
    });
};

export const getDietaEspecialAutorizadasEscola = uuid => {
  const url = `${API_URL}/escola-solicitacoes/autorizados-dieta/${uuid}/`;

  const OBJ_REQUEST = {
    headers: authToken,
    method: "GET"
  };
  return fetch(url, OBJ_REQUEST)
    .then(result => {
      return result.json();
    })
    .catch(error => {
      console.log(error);
    });
};

export const getDietaEspecialNegadasEscola = uuid => {
  const url = `${API_URL}/escola-solicitacoes/negados-dieta/${uuid}/`;

  const OBJ_REQUEST = {
    headers: authToken,
    method: "GET"
  };
  return fetch(url, OBJ_REQUEST)
    .then(result => {
      return result.json();
    })
    .catch(error => {
      console.log(error);
    });
};
