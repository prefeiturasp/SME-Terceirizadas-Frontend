import { API_URL } from "../constants/config.constants";
import authService from "./auth";

const authToken = {
  Authorization: `JWT ${authService.getToken()}`,
  "Content-Type": "application/json"
};

export const getSolicitacoesAprovadosCodae = async () => {
  const url = `${API_URL}/codae-solicitacoes/aprovados/`;

  const OBJ_REQUEST = {
    headers: authToken,
    method: "GET"
  };
  try {
    const result = await fetch(url, OBJ_REQUEST);
    const json = await result.json();
    return json.results;
  } catch (error) {}
};

export const getSolicitacoesCanceladasCodae = async () => {
  const url = `${API_URL}/codae-solicitacoes/cancelados/`;

  const OBJ_REQUEST = {
    headers: authToken,
    method: "GET"
  };
  try {
    const result = await fetch(url, OBJ_REQUEST);
    const json = await result.json();
    return json.results;
  } catch (error) {}
};

export const getSolicitacoesPendentesAprovacaoCodae = async () => {
  const url = `${API_URL}/codae-solicitacoes/pendentes-aprovacao/`;

  const OBJ_REQUEST = {
    headers: authToken,
    method: "GET"
  };
  try {
    const result = await fetch(url, OBJ_REQUEST);
    const json = await result.json();
    return json.results;
  } catch (error) {}
};

export const getSolicitacoesRevisaoAprovacaoCodae = async () => {
  const url = `${API_URL}/codae-solicitacoes/solicitacoes-revisao/`;

  const OBJ_REQUEST = {
    headers: authToken,
    method: "GET"
  };
  try {
    const result = await fetch(url, OBJ_REQUEST);
    const json = await result.json();
    return json.results;
  } catch (error) {}
};
