import { API_URL } from "../constants/config.constants";
import authService from "./auth";

const authToken = {
  Authorization: `JWT ${authService.getToken()}`,
  "Content-Type": "application/json"
};

export const createOrUpdateUnifiedSolicitationForm = payload => {
  const url = API_URL + `/solicitacao-unificada-formulario/salvar/`;
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

export const getUnifiedSolicitationsForm = async () => {
  const OBJ_REQUEST = {
    headers: authToken,
    method: "GET"
  };
  const url = API_URL + "/solicitacao-unificada-formulario/";
  return await fetch(url, OBJ_REQUEST)
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log("Error Kit Lanche: ", error);
      return {};
    });
};

export const removeUnifiedSolicitationForm = async uuid => {
  const OBJ_REQUEST = {
    headers: authToken,
    method: "DELETE"
  };
  let status = 0;
  return await fetch(API_URL + "/solicitacao-unificada-formulario/" + uuid, OBJ_REQUEST)
  .then(res => {
      status = res.status;
      return res.json();
    })
    .then(data => {
      return { data: data, status: status };
    })
    .catch(error => {
      return { data: error, status: status };
    });
};

export const getUnifiedSolicitations = async () => {
  const OBJ_REQUEST = {
    headers: authToken,
    method: "GET"
  };
  const url = API_URL + "/solicitacao-unificada/";
  return await fetch(url, OBJ_REQUEST)
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log("Error Kit Lanche: ", error);
      return {};
    });
};

export const motivosSolicitacaoUnificada = () => {
  const url = API_URL + `/motivos-solicitacao-unificada/`
  const OBJ_REQUEST = {
    headers: authToken,
    method: "GET"
  };
  return fetch(url, OBJ_REQUEST)
      .then(result => {
          return result.json()
      }).catch(error => {
          console.log(error);
      })
}
