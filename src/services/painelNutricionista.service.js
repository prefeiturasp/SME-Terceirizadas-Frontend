import { API_URL } from "../constants/config.constants";
import { AUTH_TOKEN, SOLICITACOES, SOLICITACOES_DIETA } from "./contants";

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
    if (json.results) {
      return { results: json.results, status };
    }
    return { results: json, status };
  } catch (error) {
    console.log(error);
  }
};

export const getSolicitacaoDietaEspecial = async uuid => {
  const url = `${SOLICITACOES_DIETA}/${uuid}/`;
  return retornoBase(url);
};

export const getSolicitacoesPendentesNutricionista = async () => {
  const url = `${SOLICITACOES_DIETA}/${SOLICITACOES.PENDENTES}/`;
  return retornoBase(url);
};

export const getSolicitacoesAutorizadasNutricionista = async () => {
  const url = `${SOLICITACOES_DIETA}/${SOLICITACOES.AUTORIZADOS}/`;
  return retornoBase(url);
};

export const getSolicitacoesNegadasNutricionista = async () => {
  const url = `${SOLICITACOES_DIETA}/${SOLICITACOES.NEGADOS}/`;
  return retornoBase(url);
};

export const getTiposDietaEspecial = async () => {
  const url = `${API_URL}/tipos-dieta-especial`;
  return retornoBase(url);
};

export const getMotivosNegacaoDietaEspecial = async () => {
  const url = `${API_URL}/motivos-negacao`;
  return retornoBase(url);
};
