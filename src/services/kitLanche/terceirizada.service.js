import { PEDIDOS, FLUXO, AUTH_TOKEN } from "services/constants";
import getPath from "./helper";

export const terceirizadaRespondeQuestionamentoKitLancheAvulso = async (
  uuid,
  payload,
  isCei
) => {
  const url = `${getPath(isCei)}/${uuid}/${
    FLUXO.TERCEIRIZADA_RESPONDE_QUESTIONAMENTO
  }/`;
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

export const terceirizadaTomaCienciaKitLancheAvulso = (uuid, isCei) => {
  const url = `${getPath(isCei)}/${uuid}/${FLUXO.TERCEIRIZADA_TOMA_CIENCIA}/`;
  const OBJ_REQUEST = {
    headers: AUTH_TOKEN,
    method: "PATCH"
  };
  let status = 0;
  return fetch(url, OBJ_REQUEST)
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

export const getTerceirizadasPedidosDeKitLanche = (filtroAplicado, isCei) => {
  const url = `${getPath(isCei)}/${PEDIDOS.TERCEIRIZADA}/${filtroAplicado}/`;
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
