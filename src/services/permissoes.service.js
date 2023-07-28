import { API_URL } from "../constants/config";
import authService from "./auth";
import { ErrorHandlerFunction } from "./service-helpers";

import axios from "./_base";

const authToken = {
  Authorization: `JWT ${authService.getToken()}`,
  "Content-Type": "application/json"
};

const fetchPatch = (url, body) => {
  let status = 0;
  return fetch(url, {
    method: "PATCH",
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

const fetchGet = url => {
  let status = 0;
  return fetch(url, {
    method: "GET",
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

const fetchPost = (url, body) => {
  let status = 0;
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

export const getDadosUsuarioEOL = async registroFuncional =>
  axios.get(`/dados-usuario-eol/${registroFuncional}/`);

export const getDadosUsuarioEOLCompleto = async registroFuncional =>
  axios
    .get(`/dados-usuario-eol-completo/${registroFuncional}/`)
    .catch(ErrorHandlerFunction);

export const criarEquipeAdministradoraSupervisaoNutricao = (
  uuid,
  registro_funcional
) =>
  fetchPost(
    `${API_URL}/vinculos-codae-supervisao-nutricao/${uuid}/criar_equipe_administradora/`,
    { registro_funcional }
  );

export const getEquipeAdministradoraSupervisaoNutricao = uuid =>
  fetchGet(
    `${API_URL}/vinculos-codae-supervisao-nutricao/${uuid}/get_equipe_administradora/`
  );

export const finalizarVinculoSupervisaoNutricao = (uuid, vinculo_uuid) =>
  fetchPatch(
    `${API_URL}/vinculos-codae-supervisao-nutricao/${uuid}/finalizar_vinculo/`,
    {
      vinculo_uuid
    }
  );
