import { API_URL } from '../constants/config.constants'
import authService from "./auth";

const authToken = {
  Authorization: `JWT ${authService.getToken()}`,
  "Content-Type": "application/json"
};

export const getPeriods = (user_uuid) => {
  const url = API_URL + `/school/get_periods/`;
  const OBJ_REQUEST = {
    headers: authToken,
    method: "GET"
  };
  return fetch(url, OBJ_REQUEST)
      .then(result => {
          return result.json()
      }).catch(error => {
          return error.json()
      })
}

export const getSchools = () => {
  var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
      targetUrl = 'https://pratoaberto.sme.prefeitura.sp.gov.br/api/escolas'
  return fetch(proxyUrl + targetUrl)
      .then(result => {
          return result.json()
      }).catch(error => {
          return error.json()
      })
  }
