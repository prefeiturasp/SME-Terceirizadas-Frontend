import { API_URL } from "../../constants/config";
import { FLUXO, AUTH_TOKEN } from "services/constants";
import { getPath } from "./helper";
import { ErrorHandlerFunction } from "services/service-helpers";
import axios from "../_base";

export const escolaCriarSolicitacaoDeInclusaoDeAlimentacao = (
  payload,
  tipoSolicitacao
) => {
  const url = `${getPath(tipoSolicitacao)}/`;
  let status = 0;
  return fetch(url, {
    method: "POST",
    body: payload,
    headers: AUTH_TOKEN
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

export const escolaIniciarSolicitacaoDeInclusaoDeAlimentacao = (
  uuid,
  tipoSolicitacao
) => {
  const url = `${getPath(tipoSolicitacao)}/${uuid}/${FLUXO.INICIO_PEDIDO}/`;

  let status = 0;
  return fetch(url, {
    method: "PATCH",
    headers: AUTH_TOKEN
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

export const escolaAlterarSolicitacaoDeInclusaoDeAlimentacao = (
  uuid,
  payload,
  tipoSolicitacao
) => {
  const url = `${getPath(tipoSolicitacao)}/${uuid}/`;
  let status = 0;
  return fetch(url, {
    method: "PUT",
    body: payload,
    headers: AUTH_TOKEN
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

export const escolaExcluirSolicitacaoDeInclusaoDeAlimentacao = async (
  uuid,
  tipoSolicitacao
) => {
  const OBJ_REQUEST = {
    headers: AUTH_TOKEN,
    method: "DELETE"
  };
  let status = 0;
  return await fetch(`${getPath(tipoSolicitacao)}/${uuid}/`, OBJ_REQUEST)
    .then(res => {
      status = res.status;
      return res.json();
    })
    .then(data => {
      return { data: data, status: status };
    })
    .catch(error => {
      return { data: error, status: status };
    });
};

export const escolaCancelarSolicitacaoDeInclusaoDeAlimentacao = async (
  uuid,
  payload,
  tipoSolicitacao
) => {
  const url = `${getPath(tipoSolicitacao)}/${uuid}/${FLUXO.ESCOLA_CANCELA}/`;
  const OBJ_REQUEST = {
    headers: AUTH_TOKEN,
    method: "PATCH",
    body: JSON.stringify(payload)
  };
  let status = 0;
  try {
    const res = await fetch(url, OBJ_REQUEST);
    const data = await res.json();
    status = res.status;
    return { ...data, status: status };
  } catch (error) {
    return error.json();
  }
};

export const getMotivosInclusaoNormal = async () => {
  const url = `${API_URL}/motivos-inclusao-normal/`;
  const response = await axios.get(url).catch(ErrorHandlerFunction);
  if (response) {
    const data = { data: response.data, status: response.status };
    return data;
  }
};

export const getMotivosInclusaoContinua = async () => {
  const url = `${API_URL}/motivos-inclusao-continua/`;
  const response = await axios.get(url).catch(ErrorHandlerFunction);
  if (response) {
    const data = { data: response.data, status: response.status };
    return data;
  }
};
