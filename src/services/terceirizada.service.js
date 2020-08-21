import { saveAs } from "file-saver";

import { API_URL } from "../constants/config";
import authService from "./auth";

import axios from "./_base";
import { ENDPOINT_RELATORIO_QUANTITATIVO } from "constants/shared";

const authToken = {
  Authorization: `JWT ${authService.getToken()}`,
  "Content-Type": "application/json"
};

export const getTerceirizada = () => {
  const url = `${API_URL}/terceirizadas/`;
  let status = 0;
  return fetch(url, {
    headers: authToken,
    method: "GET"
  })
    .then(response => {
      status = response.status;
      return response.json();
    })
    .then(data => {
      return { data: data, status: status };
    })
    .catch(error => {
      return error.json();
    });
};

export const getTerceirizadaUUID = uuid => {
  const url = `${API_URL}/terceirizadas/${uuid}/`;
  let status = 0;
  return fetch(url, {
    headers: authToken,
    method: "GET"
  })
    .then(response => {
      status = response.status;
      return response.json();
    })
    .then(data => {
      return { data: data, status: status };
    })
    .catch(error => {
      return error.json();
    });
};

export const createTerceirizada = payload => {
  const url = `${API_URL}/terceirizadas/`;

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

export const updateTerceirizada = (uuid, payload) => {
  const url = `${API_URL}/terceirizadas/${uuid}/`;

  let status = 0;
  return fetch(url, {
    method: "PUT",
    body: JSON.stringify(payload),
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

export const getRelatorioQuantitativo = async params => {
  if (params) {
    return await axios.get(ENDPOINT_RELATORIO_QUANTITATIVO, { params });
  }
  return await axios.get(ENDPOINT_RELATORIO_QUANTITATIVO);
};

export const getPdfRelatorioQuantitativo = async params => {
  const { data } = await axios.get(
    "/terceirizadas/imprimir-relatorio-quantitativo/",
    {
      responseType: "blob",
      params
    }
  );
  saveAs(data, "relatorio_quantitativo_por_terceirizada.pdf");
};
