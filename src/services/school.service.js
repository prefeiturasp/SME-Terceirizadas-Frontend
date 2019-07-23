import { API_URL } from "../constants/config.constants";
import authService from "./auth";

const authToken = {
  Authorization: `JWT ${authService.getToken()}`,
  "Content-Type": "application/json"
};

export const getPeriods = user_uuid => {
  // TODO: pegar periodos escolares da escola ex: escolas/periodos
  const url = `${API_URL}/periodos-escolares/`;
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

export const getSchools = () => {
  var proxyUrl = "https://cors-anywhere.herokuapp.com/",
    targetUrl = "https://pratoaberto.sme.prefeitura.sp.gov.br/api/escolas";
  return fetch(proxyUrl + targetUrl)
    .then(result => {
      return result.json();
    })
    .catch(error => {
      return error.json();
    });
};
