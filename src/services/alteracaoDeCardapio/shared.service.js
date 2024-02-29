import axios from "../_base";
import { API_URL } from "constants/config";
import { AUTH_TOKEN } from "services/constants";
import { getPath } from "./helper";
import { ErrorHandlerFunction } from "services/service-helpers";

export const getMotivosAlteracaoCardapio = async () => {
  const url = `${API_URL}/motivos-alteracao-cardapio/`;
  const response = await axios.get(url).catch(ErrorHandlerFunction);
  if (response) {
    const data = { data: response.data, status: response.status };
    return data;
  }
};

export const getAlteracaoCardapio = (uuid, tipoSolicitacao) => {
  const url = `${getPath(tipoSolicitacao)}/${uuid}/`;
  const OBJ_REQUEST = {
    headers: AUTH_TOKEN,
    method: "GET",
  };
  let status = 0;
  return fetch(url, OBJ_REQUEST)
    .then((res) => {
      status = res.status;
      return res.json();
    })
    .then((data) => {
      return { data: data, status: status };
    })
    .catch((error) => {
      return error.json();
    });
};
