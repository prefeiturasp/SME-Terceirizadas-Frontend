import { API_URL } from "../constants/config.constants";
import authService from "./auth";

const authToken = {
  Authorization: `JWT ${authService.getToken()}`,
  "Content-Type": "application/json"
};

export const createAlteracaoCardapio = payload => {
  const url = API_URL + `/alteracoes-cardapio/`;

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

export const updateAlteracaoCardapio = (uuid, payload) => {
  const url = `${API_URL}/alteracoes-cardapio/${uuid}/`
  let status = 0;
  return fetch(url, {
    method: "PUT",
    body: payload,
    headers: authToken
  })
    .then(res => {
      status = res.status
      return res.json()
    })
    .then(data => {
      return { data: data, status: status }
    })
    .catch(error => {
      return error.json()
    })
}

export const deleteAlteracaoCardapio = uuid => {
  const url = `${API_URL}/alteracoes-cardapio/${uuid}/`
  return fetch(url, {
    method: "DELETE",
    headers: authToken
  })
    .then(result => {
      return result.status;
    })
    .catch(error => {
      return error.json();
    });
};

export const getAlteracoesCardapioList = () => {
  const url =
    API_URL + `/alteracoes-cardapio-rascunho/`;
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

export const getMotivosAlteracaoCardapio = () => {
  const url = API_URL + `/motivos-alteracao-cardapio/`;
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
}

export const enviarAlteracaoCardapio = (uuid, payload) => {
  const url = `${API_URL}/alteracoes-cardapio/${uuid}/inicio_de_pedido/`
  let status = 0;
  return fetch(url, {
    method: "PATCH",
    body: payload,
    headers: authToken
  })
    .then(res => {
      status = res.status
      return res.json()
    })
    .then(data => {
      return { data: data, status: status }
    })
    .catch(error => {
      return error.json()
    })
}
