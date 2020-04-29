import { API_URL } from "../../constants/config.constants";
import { FLUXO, AUTH_TOKEN } from "services/constants";
import { getPath } from "./helper";

export const criarInclusaoDeAlimentacao = (payload, tipoSolicitacao) => {
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

export const atualizarInclusaoDeAlimentacao = (uuid, payload, tipoSolicitacao) => {
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

  export const removerInclusaoDeAlimentacao = async (uuid, tipoSolicitacao) => {
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

export const cancelarInclusaoDeAlimentacao = async (
  uuid,
  justificativa,
  tipoSolicitacao
) => {
  const url = `${getPath(tipoSolicitacao)}/${uuid}/${FLUXO.ESCOLA_CANCELA}/`;
  const OBJ_REQUEST = {
    headers: AUTH_TOKEN,
    method: "PATCH",
    body: JSON.stringify({ justificativa })
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

export const getMotivosInclusao = tipoMotivo => {
  const url = `${API_URL}/${tipoMotivo}/`;
  const OBJ_REQUEST = {
    headers: AUTH_TOKEN,
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
