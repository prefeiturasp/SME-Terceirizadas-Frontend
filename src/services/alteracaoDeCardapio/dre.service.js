import axios from "../_base";
import { FLUXO, PEDIDOS, AUTH_TOKEN } from "services/constants";
import { ErrorHandlerFunction } from "services/service-helpers";
import { getPath } from "./helper";

// TODO Rever métodos get por prioridade. Esse já consolida todos em um consulta única.
export const dreListarSolicitacoesDeAlteracaoDeCardapio = (
  filtroAplicado,
  tipoSolicitacao
) => {
  const url = `${getPath(tipoSolicitacao)}/${PEDIDOS.DRE}/${filtroAplicado}/`;
  const OBJ_REQUEST = {
    headers: AUTH_TOKEN,
    method: "GET"
  };
  return fetch(url, OBJ_REQUEST)
    .then(result => {
      return result.json(); //FIXME: map results as tipoSolicitacao
    })
    .catch(error => {
      console.log(error);
    });
};

export const dreValidarSolicitacaoDeAlteracaoDeCardapio = (
  uuid,
  tipoSolicitacao
) => {
  const url = `${getPath(tipoSolicitacao)}/${uuid}/${FLUXO.DRE_VALIDA}/`;
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

export const dreReprovarSolicitacaoDeAlteracaoDeCardapio = async (
  uuid,
  payload,
  tipoSolicitacao
) => {
  const url = `${getPath(tipoSolicitacao)}/${uuid}/${FLUXO.DRE_NAO_VALIDA}/`;
  const response = await axios.patch(url, payload).catch(ErrorHandlerFunction);
  if (response) {
    const data = { data: response.data, status: response.status };
    return data;
  }
};
