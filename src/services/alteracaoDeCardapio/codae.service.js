import axios from "../_base";
import { FLUXO, PEDIDOS, AUTH_TOKEN } from "services/constants";
import { ErrorHandlerFunction } from "services/service-helpers";
import { getPath } from "./helper";

export const codaeListarSolicitacoesDeAlteracaoDeCardapio = async (
  filtroAplicado,
  tipoSolicitacao,
  paramsFromPrevPage
) => {
  const url = `${getPath(tipoSolicitacao)}/${PEDIDOS.CODAE}/${filtroAplicado}/`;
  const response = await axios.get(url, { params: paramsFromPrevPage });
  return response.data;
};

export const codaeListarSolicitacoesDeAlteracaoDeCardapioReprovadas = (
  tipoSolicitacao
) => {
  const url = `${getPath(tipoSolicitacao)}/pedidos-reprovados-codae/`;
  const OBJ_REQUEST = {
    headers: AUTH_TOKEN,
    method: "GET",
  };
  return fetch(url, OBJ_REQUEST)
    .then((result) => {
      return result.json();
    })
    .catch((error) => {
      console.log(error);
    });
};

export const codaeAutorizarSolicitacaoDeAlteracaoDeCardapio = async (
  uuid,
  payload,
  tipoSolicitacao
) => {
  const url = `${getPath(tipoSolicitacao)}/${uuid}/${FLUXO.CODAE_AUTORIZA}/`;
  const response = await axios.patch(url, payload).catch(ErrorHandlerFunction);
  if (response) {
    const data = { data: response.data, status: response.status };
    return data;
  }
};

export const codaeNegarSolicitacaoDeAlteracaoDeCardapio = async (
  uuid,
  payload,
  tipoSolicitacao
) => {
  const url = `${getPath(tipoSolicitacao)}/${uuid}/${FLUXO.CODAE_NEGA}/`;
  const response = await axios.patch(url, payload).catch(ErrorHandlerFunction);
  if (response) {
    const data = { data: response.data, status: response.status };
    return data;
  }
};

export const codaeQuestionarSolicitacaoDeAlteracaoDeCardapio = async (
  uuid,
  payload,
  tipoSolicitacao
) => {
  const url = `${getPath(tipoSolicitacao)}/${uuid}/${FLUXO.CODAE_QUESTIONA}/`;
  const response = await axios.patch(url, payload).catch(ErrorHandlerFunction);
  if (response) {
    const data = { data: response.data, status: response.status };
    return data;
  }
};
