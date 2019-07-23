import { API_URL } from "../constants/config.constants";
import authService from "./auth";

const authToken = {
  Authorization: `JWT ${authService.getToken()}`,
  "Content-Type": "application/json"
};

export const createOrUpdateFoodInclusion = payload => {
  const url = API_URL + `/food_inclusion/create_or_update/`;
  return fetch(url, {
    method: "POST",
    body: payload,
    headers: authToken
  })
    .then(result => {
      return result.json();
    })
    .catch(error => {
      return error.json();
    });
};

export const deleteFoodInclusion = payload => {
  const url = API_URL + `/food_inclusion/delete/`;
  return fetch(url, {
    method: "DELETE",
    body: payload,
    headers: authToken
  })
    .then(result => {
      return result.json();
    })
    .catch(error => {
      return error.json();
    });
};

export const getInclusoesContinuasSalvas = uuid => {
  const url = `${API_URL}/escolas/${uuid}/minhas_inclusoes_alimentacao_continua/`;
  const OBJ_REQUEST = {
    headers: authToken,
    method: "GET"
  };
  return fetch(url, OBJ_REQUEST)
    .then(result => {
      return result.json();
    })
    .catch(error => {
      console.log(error);
    });
};

export const getMotivosInclusaoContinua = () => {
  const url = `${API_URL}/motivos-inclusao-continua/`;
  const OBJ_REQUEST = {
    headers: authToken,
    method: "GET"
  };
  return fetch(url, OBJ_REQUEST)
    .then(result => {
      return result.json();
    })
    .catch(error => {
      console.log(error);
    });
};
