import { API_URL } from "../constants/config";
import authService from "./auth";
import axios from "services/_base";
import { ErrorHandlerFunction } from "./service-helpers";

const authToken = {
  Authorization: `JWT ${authService.getToken()}`,
  "Content-Type": "application/json",
};

export const criarEditalEContrato = async (payload) => {
  const url = `${API_URL}/editais-contratos/`;
  const response = await axios.post(url, payload).catch(ErrorHandlerFunction);
  if (response) {
    const data = { data: response.data, status: response.status };
    return data;
  }
};

export const atualizarEditalEContrato = (payload, uuid) => {
  const url = `${API_URL}/editais-contratos/${uuid}/`;
  let status = 0;
  return fetch(url, {
    method: "PUT",
    body: payload,
    headers: authToken,
  })
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

export const getEditaisContratos = async (params) => {
  const url = `${API_URL}/editais-contratos/`;
  const response = await axios.get(url, { params }).catch(ErrorHandlerFunction);
  if (response) {
    const data = { data: response.data, status: response.status };
    return data;
  }
};

export const obtemEdital = (uuid) => {
  const url = `${API_URL}/editais-contratos/${uuid}/`;
  let status = 0;
  return fetch(url, {
    method: "GET",
    headers: authToken,
  })
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

export const excluirEdital = async (uuid) => {
  const OBJ_REQUEST = {
    headers: authToken,
    method: "DELETE",
  };
  let status = 0;
  return await fetch(`${API_URL}/editais-contratos/${uuid}/`, OBJ_REQUEST)
    .then((res) => {
      status = res.status;
      return res.json();
    })
    .then((data) => {
      return { data: data, status: status };
    })
    .catch((error) => {
      return { data: error, status: status };
    });
};

export const getNumerosEditais = async () => {
  const url = `/editais/lista-numeros/`;
  return await axios.get(url);
};
