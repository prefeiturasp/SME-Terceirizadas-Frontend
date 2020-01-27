import { API_URL } from "../constants/config.constants";
import authService from "./auth";

import getAxios from "./_base";

const authToken = {
  Authorization: `JWT ${authService.getToken()}`,
  "Content-Type": "application/json"
};

const URL_DIETA_ESPECIAL = `${API_URL}/solicitacoes-dieta-especial`;

export const criaDietaEspecial = async payload => {
  const url = `${URL_DIETA_ESPECIAL}/`;
  const OBJ_REQUEST = {
    headers: authToken,
    method: "POST",
    body: JSON.stringify(payload)
  };
  try {
    const response = await fetch(url, OBJ_REQUEST);
    const status = await response.status;
    const json = await response.json();
    return { data: json, status: status };
  } catch (error) {
    console.log(error);
  }
};

export const getDietaEspecial = async uuid => {
  const url = `${URL_DIETA_ESPECIAL}/${uuid}/`;
  const OBJ_REQUEST = {
    headers: authToken,
    method: "GET"
  };
  try {
    const response = await fetch(url, OBJ_REQUEST);
    const status = response.status;
    const json = await response.json();
    return { data: json, status: status };
  } catch (error) {
    console.log(error);
  }
};

export const getDietasAtivasInativasPorAluno = async (params = {}) => {
  const axios = getAxios();
  const response = await axios.get(
    "solicitacoes-dieta-especial-ativas-inativas/",
    { params }
  );
  return response;
};
