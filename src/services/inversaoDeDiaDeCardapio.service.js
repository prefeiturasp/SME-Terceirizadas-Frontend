import { API_URL } from "../constants/config.constants";
import { FLUXO } from "./constants";
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

export const getInversaoDeDiaDeCardapio = uuid => {
  const url = `${API_URL}/inversoes-dia-cardapio/${uuid}/`;
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

export const dreValidaPedidoEscola = uuid => {
  const url = `${API_URL}/inversoes-dia-cardapio/${uuid}/diretoria-regional-valida-pedido/`;
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

export const DRENegaInversaoDeDiaDeCardapio = (uuid, justificativa) => {
  const url = `${API_URL}/inversoes-dia-cardapio/${uuid}/${
    FLUXO.DRE_NAO_VALIDA
  }/`;
  let status = 0;
  return fetch(url, {
    method: "PATCH",
    headers: authToken,
    body: JSON.stringify({ justificativa })
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

export const CODAEAutorizaPedidoDRE = (uuid, justificativa = {}) => {
  const url = `${API_URL}/inversoes-dia-cardapio/${uuid}/${
    FLUXO.CODAE_AUTORIZA
  }/`;
  let status = 0;
  return fetch(url, {
    method: "PATCH",
    body: JSON.stringify(justificativa),
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

export const CODAENegaInversaoDeDiaDeCardapio = (uuid, justificativa) => {
  const url = `${API_URL}/inversoes-dia-cardapio/${uuid}/${FLUXO.CODAE_NEGA}/`;
  let status = 0;
  return fetch(url, {
    method: "PATCH",
    headers: authToken,
    body: JSON.stringify({ justificativa })
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

export const CODAEQuestionaInversaoDeDiaDeCardapio = (uuid, justificativa) => {
  const url = `${API_URL}/inversoes-dia-cardapio/${uuid}/${
    FLUXO.CODAE_QUESTIONA
  }/`;
  let status = 0;
  return fetch(url, {
    method: "PATCH",
    headers: authToken,
    body: JSON.stringify({ justificativa })
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

export const TerceirizadaRespondeQuestionamentoInversaoDeDiaDeCardapio = (
  uuid,
  payload
) => {
  const url = `${API_URL}/inversoes-dia-cardapio/${uuid}/${
    FLUXO.TERCEIRIZADA_RESPONDE_QUESTIONAMENTO
  }/`;
  let status = 0;
  return fetch(url, {
    method: "PATCH",
    headers: authToken,
    body: JSON.stringify(payload)
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

export const terceirizadaTomaCiencia = uuid => {
  const url = `${API_URL}/inversoes-dia-cardapio/${uuid}/terceirizada-toma-ciencia/`;
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

export const getDREPedidosDeInversoes = filtroAplicado => {
  const url = `${API_URL}/inversoes-dia-cardapio/pedidos-diretoria-regional/${filtroAplicado}/`;
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

export const getCODAEPedidosDeInversoes = filtroAplicado => {
  const url = `${API_URL}/inversoes-dia-cardapio/pedidos-codae/${filtroAplicado}/`;
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

export const getTerceirizadaPedidosDeInversoes = filtroAplicado => {
  const url = `${API_URL}/inversoes-dia-cardapio/pedidos-terceirizadas/${filtroAplicado}/`;
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

export const escolaCancelaInversaoDiaCardapio = (uuid, payload) => {
  const url = `${API_URL}/inversoes-dia-cardapio/${uuid}/${
    FLUXO.ESCOLA_CANCELA
  }/`;
  let status = 0;
  return fetch(url, {
    method: "PATCH",
    headers: authToken,
    body: JSON.stringify({ justificativa: payload })
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
