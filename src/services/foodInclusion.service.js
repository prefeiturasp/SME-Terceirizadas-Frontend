import { API_URL } from "../constants/config.constants";
import authService from "./auth";

const authToken = {
  Authorization: `JWT ${authService.getToken()}`,
  "Content-Type": "application/json"
};

export const criarInclusaoDeAlimentacaoNormal = payload => {
  const url = `${API_URL}/grupos-inclusao-alimentacao-normal/`;
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

export const atualizarInclusaoDeAlimentacaoNormal = (uuid, payload) => {
  const url = `${API_URL}/grupos-inclusao-alimentacao-normal/${uuid}/`;
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

export const removerInclusaoDeAlimentacaoNormal = async uuid => {
  const OBJ_REQUEST = {
    headers: authToken,
    method: "DELETE"
  };
  let status = 0;
  return await fetch(
    `${API_URL}/grupos-inclusao-alimentacao-normal/${uuid}`,
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

export const getInclusoesNormaisSalvas = () => {
  const url = `${API_URL}/grupos-inclusao-alimentacao-normal/minhas-solicitacoes/`;
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

export const inicioPedidoNormal = uuid => {
  const url = `${API_URL}/grupos-inclusao-alimentacao-normal/${uuid}/inicio_de_pedido`;
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

export const criarInclusaoDeAlimentacaoContinua = payload => {
  const url = `${API_URL}/inclusoes-alimentacao-continua/`;
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

export const atualizarInclusaoDeAlimentacaoContinua = (uuid, payload) => {
  const url = `${API_URL}/inclusoes-alimentacao-continua/${uuid}/`;
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

export const removerInclusaoDeAlimentacaoContinua = async uuid => {
  const OBJ_REQUEST = {
    headers: authToken,
    method: "DELETE"
  };
  let status = 0;
  return await fetch(
    `${API_URL}/inclusoes-alimentacao-continua/${uuid}`,
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

export const getInclusoesContinuasSalvas = () => {
  const url = `${API_URL}/inclusoes-alimentacao-continua/minhas-solicitacoes/`;
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

export const inicioPedidoContinua = uuid => {
  const url = `${API_URL}/inclusoes-alimentacao-continua/${uuid}/inicio_de_pedido`;
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

export const getMotivosInclusaoNormal = () => {
  const url = `${API_URL}/motivos-inclusao-normal/`;
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
