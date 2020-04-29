import { FLUXO, PEDIDOS, AUTH_TOKEN } from "services/constants";
import getPath from "./helper";

export const getTerceirizadaPedidosReprovados = isCei => {
  const url = `${getPath(isCei)}/pedidos-reprovados-terceirizada/`;
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

export const TerceirizadaTomaCienciaAlteracaoCardapio = (uuid, isCei) => {
  const url = `${getPath(isCei)}/${uuid}/terceirizada-toma-ciencia/`;
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

export const terceirizadaRespondeQuestionamentoAlteracaoCardapio = async (
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

export const getTerceirizadaPedidosDeAlteracaoCardapio = (
  filtroAplicado,
  isCei
) => {
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
