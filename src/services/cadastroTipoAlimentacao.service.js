import CONFIG from "../constants/config.constants";
import authService from "./auth";

const authHeader = {
  "Content-Type": "application/json",
  Authorization: `JWT ${authService.getToken()}`
};

export const getTiposUnidadeEscolar = async () => {
  const OBJ_REQUEST = {
    headers: authHeader,
    method: "GET"
  };

  const url = CONFIG.API_URL + "/tipos-unidade-escolar/";
  OBJ_REQUEST["method"] = "GET";
  return await fetch(url, OBJ_REQUEST).then(response => {
    return response.json();
  });
};

export const getVinculosTipoAlimentacaoPorUnidadeEscolar = async uuid => {
  const OBJ_REQUEST = {
    headers: authHeader,
    method: "GET"
  };

  const url = `${
    CONFIG.API_URL
  }/vinculos-tipo-alimentacao-u-e-periodo-escolar/tipo_unidade_escolar/${uuid}/`;
  OBJ_REQUEST["method"] = "GET";
  return await fetch(url, OBJ_REQUEST).then(response => {
    return response.json();
  });
};

export const alteraVinculosTipoAlimentacao = async (uuid, values) => {
  try {
    const response = await fetch(
      `${
        CONFIG.API_URL
      }/vinculos-tipo-alimentacao-u-e-periodo-escolar/${uuid}/`,
      {
        method: "PUT",
        headers: authHeader,
        body: JSON.stringify(values)
      }
    );
    let json = await response.json();
    const status = await response.status;
    json.status = status;
    return json;
  } catch (err) {
    return err;
  }
};
