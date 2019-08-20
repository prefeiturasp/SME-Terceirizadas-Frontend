import { API_URL } from "../constants/config.constants";
import authService from "./auth";

const authToken = {
  Authorization: `JWT ${authService.getToken()}`,
  "Content-Type": "application/json"
};

export const getInversoesDeDiaDeCardapio = async () => {
  const url = `${API_URL}/inversoes-dia-cardapio/minhas-solicitacoes/`;
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

export const criarInversaoDeDiaDeCardapio = async values => {
  const url = `${API_URL}/inversoes-dia-cardapio/`;
  const OBJ_REQUEST = {
    headers: authToken,
    method: "POST",
    body: JSON.stringify(values)
  };
  let status = 0;
  return await fetch(url, OBJ_REQUEST)
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

export const atualizarInversaoDeDiaDeCardapio = (uuid, payload) => {
  const url = `${API_URL}/inversoes-dia-cardapio/${uuid}/`;
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

export const removerInversaoDeDiaDeCardapio = async uuid => {
  const url = `${API_URL}/inversoes-dia-cardapio/${uuid}/`;
  const OBJ_REQUEST = {
    headers: authToken,
    method: "DELETE"
  };
  let status = 0;
  return await fetch(url, OBJ_REQUEST)
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

export const inicioPedido = uuid => {
  const url = `${API_URL}/inversoes-dia-cardapio/${uuid}/inicio-pedido/`;
  let status = 0;
  return fetch(url, {
    method: "PATCH",
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
