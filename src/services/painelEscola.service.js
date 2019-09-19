import { API_URL } from "../constants/config.constants";
import { AUTH_TOKEN, SOLICITACOES } from "./contants";

const SOLICITACOES_ESCOLA = `${API_URL}/escola-solicitacoes`;

export const getSolicitacoesPendentesEscola = async escolaUuid => {
  const url = `${SOLICITACOES_ESCOLA}/${SOLICITACOES.PENDENTES}/${escolaUuid}/`;

  const OBJ_REQUEST = {
    headers: AUTH_TOKEN,
    method: "GET"
  };
  try {
    const result = await fetch(url, OBJ_REQUEST);
    const status = result.status;
    const json = await result.json();
    return { results: json.results, status };
  } catch (error) {}
};
