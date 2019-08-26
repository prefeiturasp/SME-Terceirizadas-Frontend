import { API_URL } from "../constants/config.constants";
import authService from "./auth";

const authToken = {
  Authorization: `JWT ${authService.getToken()}`,
  "Content-Type": "application/json"
};


export const getPendentesAprovacaoList = () => {
  const url = `${API_URL}/dre-pendentes-aprovacao/`;

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

export const getSolicitacoesAutorizadasPelaDRE = (dreUuid) => {
  const url = `${API_URL}/diretorias-regionais/${dreUuid}/solicitacoes-autorizadas-por-mim/`;

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

export const getSolicitacoesPendentesParaDRE = (dreUuid) => {
  const url = `${API_URL}/diretorias-regionais/${dreUuid}/solicitacoes-pendentes-para-mim/`;

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
