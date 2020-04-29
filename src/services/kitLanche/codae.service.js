import { FLUXO, PEDIDOS, AUTH_TOKEN } from "services/constants";
import getPath from "./helper";

export const CODAEquestionaKitLancheAvulso = async (
  uuid,
  observacao_questionamento_codae,
  isCei
) => {
  const url = `${getPath(isCei)}/${uuid}/${FLUXO.CODAE_QUESTIONA}/`;
  const OBJ_REQUEST = {
    headers: AUTH_TOKEN,
    method: "PATCH",
    body: JSON.stringify({ observacao_questionamento_codae })
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

export const CODAENegaKitLancheAvulso = async (uuid, justificativa, isCei) => {
  const url = `${getPath(isCei)}/${uuid}/${FLUXO.CODAE_NEGA}/`;
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

export const CODAEAutorizaKitLancheAvulso = (
  uuid,
  justificativa = {},
  isCei
) => {
  const url = `${getPath(isCei)}/${uuid}/${FLUXO.CODAE_AUTORIZA}/`;
  const OBJ_REQUEST = {
    headers: AUTH_TOKEN,
    body: JSON.stringify(justificativa),
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

export const getCODAEPedidosKitLanchePendentes = (filtroAplicado, isCei) => {
  const url = `${getPath(isCei)}/${PEDIDOS.CODAE}/${filtroAplicado}/`;
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

export const getCodaePedidosDeKitLancheCei = (filtroAplicado, isCei) => {
  const url = `${getPath(isCei)}/${PEDIDOS.CODAE}/${filtroAplicado}/`;
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

export const getCodaePedidosDeKitLanche = (filtroAplicado, isCei) => {
  const url = `${getPath(isCei)}/${PEDIDOS.CODAE}/${filtroAplicado}/`;
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
