import { API_URL } from "../constants/config.constants";
import authService from "./auth";

const authToken = {
  Authorization: `JWT ${authService.getToken()}`,
  "Content-Type": "application/json"
};

export const criarSolicitacaoUnificada = payload => {
  const url = `${API_URL}/solicitacoes-kit-lanche-unificada/`;
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

export const atualizarSolicitacaoUnificada = (uuid, payload) => {
  const url = `${API_URL}/solicitacoes-kit-lanche-unificada/${uuid}/`;
  let status = 0;
  return fetch(url, {
    method: "PUT",
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

export const inicioPedido = uuid => {
  const url = `${API_URL}/solicitacoes-kit-lanche-unificada/${uuid}/inicio-pedido/`;
  let status = 0;
  return fetch(url, {
    method: "GET",
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

export const solicitacoesUnificadasSalvas = async () => {
  const OBJ_REQUEST = {
    headers: authToken,
    method: "GET"
  };
  const url = `${API_URL}/solicitacoes-kit-lanche-unificada/minhas_solicitacoes/`;
  return await fetch(url, OBJ_REQUEST)
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log("Error Kit Lanche: ", error);
      return {};
    });
};

export const removerSolicitacaoUnificada = async uuid => {
  const OBJ_REQUEST = {
    headers: authToken,
    method: "DELETE"
  };
  let status = 0;
  return await fetch(
    `${API_URL}/solicitacoes-kit-lanche-unificada/${uuid}/`,
    OBJ_REQUEST
  )
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
  const url = `${API_URL}/solicitacao-unificada/`;
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
  const url = `${API_URL}/motivos-solicitacao-unificada/`;
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
