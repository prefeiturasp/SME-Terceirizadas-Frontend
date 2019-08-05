import { API_URL } from "../constants/config.constants";
import authService from "./auth";

const authToken = {
  Authorization: `JWT ${authService.getToken()}`,
  "Content-Type": "application/json"
};

export const createSuspensaoDeAlimentacao = payload => {
  const url = `${API_URL}/grupos-suspensoes-alimentacao/`;

  let status = 0;
  return fetch(url, {
    method: "POST",
    body: payload,
    headers: authToken
  })
    .then(res => {
      status = res.status;
      return res.json();
    })
    .then(data => {
      return { data: data, status: status };
    })
    .catch(error => {
      return error.json();
    });
};


export const createOrUpdateFoodSuspension = payload => {
  const url = API_URL + `/suspensao-de-alimentacao/salvar/`;
  let status = 0;
  return fetch(url, {
    method: "POST",
    body: payload,
    headers: authToken
  })
    .then(res => {
      status = res.status;
      return res.json();
    })
    .then(data => {
      return { data: data, status: status };
    })
    .catch(error => {
      return error.json();
    });
};

export const deleteFoodSuspension = payload => {
  const url = API_URL + `/suspensao-de-alimentacao/remover/`;
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

export const getSuspensoesDeAlimentacaoSalvas = () => {
  const url = `${API_URL}/grupos-suspensoes-alimentacao/meus_rascunhos/`
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

export const getMotivosSuspensaoCardapio = () => {
  const url = `${API_URL}/motivos-suspensao-cardapio/`;
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
