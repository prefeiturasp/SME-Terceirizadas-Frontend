import { API_URL } from "../constants/config.constants";
import authService from "./auth";

const authToken = {
  Authorization: `JWT ${authService.getToken()}`,
  "Content-Type": "application/json"
};

export const getDadosUsuarioEOL = registroFuncional => {
  const url = `${API_URL}/dados-usuario-eol/${registroFuncional}`;
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

export const criarEquipeAdministradoraEscola = (uuid, registroFuncional) => {
  const url = `${API_URL}/vinculos-escolas/${uuid}/criar_equipe_administradora/`;
  let status = 0;
  const body = {
    registro_funcional: registroFuncional
  }
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: authToken
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
