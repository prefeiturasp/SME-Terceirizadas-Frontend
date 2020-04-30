import axios from "../_base";
import { FLUXO, AUTH_TOKEN } from "services/constants";
import getPath from "./helper";

export const solicitarKitLanche = async (values, tipoSolicitacao) => {
  const url = getPath(tipoSolicitacao);

  if (tipoSolicitacao) {
    return axios.post(url, values);
  }

  let status = 0;
  const OBJ_REQUEST = {
    headers: AUTH_TOKEN,
    method: "POST",
    body: JSON.stringify(values)
  };
  return await fetch(`${url}/`, OBJ_REQUEST)
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

export const registroAtualizaKitLanche = (payload, uuid, tipoSolicitacao) => {
  const url = `${getPath(tipoSolicitacao)}/${uuid}/`;

  if (tipoSolicitacao) {
    return axios.patch(url, payload);
  }

  let status = 0;
  return fetch(url, {
    method: "PUT",
    body: JSON.stringify(payload),
    headers: AUTH_TOKEN
  })
    .then(response => {
      status = response.status;
      return response.json();
    })
    .then(data => {
      return { data: data, status: status };
    })
    .catch(error => {
      return error.json();
    });
};

export const cancelaKitLancheAvulsoEscola = async (
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
