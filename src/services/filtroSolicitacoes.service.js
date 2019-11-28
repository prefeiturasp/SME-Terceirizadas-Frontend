import { API_URL } from "../constants/config.constants";
import authService from "./auth";

const authToken = {
  Authorization: `JWT ${authService.getToken()}`,
  "Content-Type": "application/json"
};

export const getPedidosESolicitacoesFiltro = (valores, dataDe, dataAte) => {
  const url = `${API_URL}/escola-solicitacoes/pesquisa/${
    valores.unidade_escolar
  }/?tipo_solicitacao=${valores.tipo_de__solicitacao}&status_solicitacao=${
    valores.status_solicitacao
  }&data_inicial=${dataDe}&data_final=${dataAte}`;

  const OBJ_REQUEST = {
    headers: authToken,
    method: "GET"
  };
  return fetch(url, OBJ_REQUEST)
    .then(result => {
      return result.json();
    })
    .catch(error => {
      return error.json();
    });
};
