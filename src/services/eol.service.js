import { EOL_API_URL, EOL_API_TOKEN } from "../constants/config.constants";

const authToken = {
  Authorization: `Token ${EOL_API_TOKEN}`,
  "Content-Type": "application/json"
};

export const getCargo = codigoEol => {
  // TODO: pegar periodos escolares da escola ex: escolas/periodos
  const url = `${EOL_API_URL}/cargos/${codigoEol}`;
  const OBJ_REQUEST = {
    headers: authToken,
    method: "GET"
  };
  return fetch(url, OBJ_REQUEST)
    .then(result => {
      return result.json();
    })
    .catch(error => {
      return error.json();
    });
};
