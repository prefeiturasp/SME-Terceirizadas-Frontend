import { API_URL } from "../constants/config.constants";
import authService from "./auth";

const authToken = {
  Authorization: `JWT ${authService.getToken()}`,
  "Content-Type": "application/json"
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
    `${API_URL}/inclusoes-alimentacao-continua/${uuid}/`,
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

export const confirmaPedidoContinua = uuid => {
  const url = `${API_URL}/inclusoes-alimentacao-continua/${uuid}/confirma_pedido`;
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

export const getInclusaoDeAlimentacaoContinua = uuid => {
  const url = `${API_URL}/inclusoes-alimentacao-continua/${uuid}/`;
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

export const getDiretoriaRegionalPedidosPrioritarios = () => {
  const url = `${API_URL}/inclusoes-alimentacao-continua/pedidos-prioritarios-diretoria-regional/`;
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

export const getDiretoriaRegionalPedidosNoPrazoLimite = () => {
  const url = `${API_URL}/inclusoes-alimentacao-continua/pedidos-no-limite-diretoria-regional/`;
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

export const getDiretoriaRegionalPedidosNoPrazoRegular = () => {
  const url = `${API_URL}/inclusoes-alimentacao-continua/pedidos-no-prazo-diretoria-regional/`;
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
  const url = `${API_URL}/inclusoes-alimentacao-continua/${uuid}/inicio_de_pedido/`;
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

export const DREConfirmaInclusaoDeAlimentacaoContinua = uuid => {
  const url = `${API_URL}/inclusoes-alimentacao-continua/${uuid}/confirma_pedido/`;
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
