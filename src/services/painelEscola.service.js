import { API_URL } from "../constants/config";
import { AUTH_TOKEN, SOLICITACOES } from "./constants";

const SOLICITACOES_ESCOLA = `${API_URL}/escola-solicitacoes`;

// TODO: colocar essa função num arquivo separado, está sendo copiada/colada
const retornoBase = async url => {
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

export const getSolicitacoesPendentesEscola = async escolaUuid => {
  const url = `${SOLICITACOES_ESCOLA}/${SOLICITACOES.PENDENTES}/${escolaUuid}/`;
  return retornoBase(url);
};

export const getSolicitacoesAutorizadasEscola = async escolaUuid => {
  const url = `${SOLICITACOES_ESCOLA}/${
    SOLICITACOES.AUTORIZADOS
  }/${escolaUuid}/`;
  return retornoBase(url);
};

export const getSolicitacoesNegadasEscola = async escolaUuid => {
  const url = `${SOLICITACOES_ESCOLA}/${SOLICITACOES.NEGADOS}/${escolaUuid}/`;
  return retornoBase(url);
};

export const getSolicitacoesCanceladasEscola = async escolaUuid => {
  const url = `${SOLICITACOES_ESCOLA}/${
    SOLICITACOES.CANCELADOS
  }/${escolaUuid}/`;
  return retornoBase(url);
};
