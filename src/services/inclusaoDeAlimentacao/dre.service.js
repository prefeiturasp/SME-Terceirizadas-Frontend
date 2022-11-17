import axios from "../_base";
import { PEDIDOS, FLUXO, AUTH_TOKEN } from "services/constants";
import { ErrorHandlerFunction } from "services/service-helpers";
import { getPath } from "./helper";

export const dreListarSolicitacoesDeInclusaoDeAlimentacao = async (
  filtroAplicado,
  tipoSolicitacao
) => {
  const url = `${getPath(tipoSolicitacao)}/${PEDIDOS.DRE}/${filtroAplicado}/`;
  const OBJ_REQUEST = {
    headers: AUTH_TOKEN,
    method: "GET"
  };
  try {
    const result = await fetch(url, OBJ_REQUEST);
    const status = result.status;
    const json = await result.json();
    return { results: json.results, status };
  } catch (error) {
    console.log(error);
  }
};

export const dreListarSolicitacoesDeInclusaoDeAlimentacaoReprovados = tipoSolicitacao => {
  const url = `${getPath(
    tipoSolicitacao
  )}/pedidos-reprovados-diretoria-regional/`;
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

export const dreValidarSolicitacaoDeInclusaoDeAlimentacao = async (
  uuid,
  payload,
  tipoSolicitacao
) => {
  const url = `${getPath(tipoSolicitacao)}/${uuid}/${FLUXO.DRE_VALIDA}/`;
  const response = await axios.patch(url, payload).catch(ErrorHandlerFunction);
  if (response) {
    const data = { data: response.data, status: response.status };
    return data;
  }
};

export const dreReprovarSolicitacaoDeInclusaoDeAlimentacao = async (
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
