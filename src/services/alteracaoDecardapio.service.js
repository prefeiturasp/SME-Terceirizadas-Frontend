import { API_URL } from "../constants/config.constants";
import { FLUXO, PEDIDOS } from "./contants";
import authService from "./auth";

const authToken = {
  Authorization: `JWT ${authService.getToken()}`,
  "Content-Type": "application/json"
};
const API_URL_ALTERACOES_CARDAPIO = `${API_URL}/alteracoes-cardapio`;

export const createAlteracaoCardapio = payload => {
  const url = `${API_URL_ALTERACOES_CARDAPIO}/`;

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
  const url = `${API_URL_ALTERACOES_CARDAPIO}/${uuid}/`;
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

export const deleteAlteracaoCardapio = uuid => {
  const url = `${API_URL_ALTERACOES_CARDAPIO}/${uuid}/`;
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
  const url = `${API_URL}/alteracoes-cardapio-rascunho/`;

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
  const url = `${API_URL}/motivos-alteracao-cardapio/`;
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

export const enviarAlteracaoCardapio = (uuid, payload) => {
  const url = `${API_URL_ALTERACOES_CARDAPIO}/${uuid}/${FLUXO.INICIO_PEDIDO}/`;
  let status = 0;
  return fetch(url, {
    method: "PATCH",
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

export const getDiretoriaRegionalPedidosAutorizados = () => {
  const url = `${API_URL_ALTERACOES_CARDAPIO}/pedidos-autorizados-diretoria-regional/`;
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

export const getDiretoriaRegionalPedidosReprovados = () => {
  const url = `${API_URL_ALTERACOES_CARDAPIO}/pedidos-reprovados-diretoria-regional/`;
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

export const getDiretoriaRegionalPedidosPrioritarios = filtroAplicado => {
  const url = `${API_URL_ALTERACOES_CARDAPIO}/pedidos-prioritarios-diretoria-regional/${filtroAplicado}/`;
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

export const getDiretoriaRegionalPedidosNoPrazoLimite = filtroAplicado => {
  const url = `${API_URL_ALTERACOES_CARDAPIO}/pedidos-no-limite-diretoria-regional/${filtroAplicado}/`;
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

export const getDiretoriaRegionalPedidosNoPrazoRegular = filtroAplicado => {
  const url = `${API_URL_ALTERACOES_CARDAPIO}/pedidos-no-prazo-diretoria-regional/${filtroAplicado}/`;
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

// TODO Rever métodos get por prioridade. Esse já consolida todos em um consulta única.
export const getDiretoriaRegionalPedidosDeAlteracaoCardapio = filtroAplicado => {
  const url = `${API_URL_ALTERACOES_CARDAPIO}/${
    PEDIDOS.DRE
  }/${filtroAplicado}/`;
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

export const DREConfirmaAlteracaoCardapio = uuid => {
  const url = `${API_URL_ALTERACOES_CARDAPIO}/${uuid}/${FLUXO.DRE_VALIDA}/`;
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

export const DRENegaAlteracaoCardapio = (uuid, justificativa) => {
  const url = `${API_URL_ALTERACOES_CARDAPIO}/${uuid}/${FLUXO.DRE_NAO_VALIDA}/`;
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

export const EscolaCancelaAlteracaoCardapio = (uuid, justificativa) => {
  const url = `${API_URL_ALTERACOES_CARDAPIO}/${uuid}/${FLUXO.ESCOLA_CANCELA}/`;
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

export const getAlteracaoCardapio = uuid => {
  const url = `${API_URL_ALTERACOES_CARDAPIO}/${uuid}/`;
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

export const getCodaePedidosPrioritarios = filtroAplicado => {
  const url = `${API_URL_ALTERACOES_CARDAPIO}/pedidos-prioritarios-codae/${filtroAplicado}/`;
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

export const getCodaePedidosNoPrazoLimite = filtroAplicado => {
  const url = `${API_URL_ALTERACOES_CARDAPIO}/pedidos-no-limite-codae/${filtroAplicado}/`;
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

export const getCodaePedidosNoPrazoRegular = filtroAplicado => {
  const url = `${API_URL_ALTERACOES_CARDAPIO}/pedidos-no-prazo-codae/${filtroAplicado}/`;
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

export const getCodaePedidosAutorizados = () => {
  const url = `${API_URL_ALTERACOES_CARDAPIO}/pedidos-autorizados-codae/`;
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

export const getCodaePedidosReprovados = () => {
  const url = `${API_URL_ALTERACOES_CARDAPIO}/pedidos-reprovados-codae/`;
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

export const CODAEConfirmaAlteracaoDeCardapio = uuid => {
  const url = `${API_URL_ALTERACOES_CARDAPIO}/${uuid}/codae-autoriza-pedido/`;
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

export const CODAENegaAlteracaoCardapio = (uuid, justificativa) => {
  const url = `${API_URL_ALTERACOES_CARDAPIO}/${uuid}/${FLUXO.CODAE_NEGA}/`;
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

export const getTerceirizadaPedidosPrioritarios = filtroAplicado => {
  const url = `${API_URL_ALTERACOES_CARDAPIO}/pedidos-prioritarios-terceirizada/${filtroAplicado}/`;
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

export const getTerceirizadaPedidosNoPrazoLimite = filtroAplicado => {
  const url = `${API_URL_ALTERACOES_CARDAPIO}/pedidos-no-limite-terceirizada/${filtroAplicado}/`;
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

export const getTerceirizadaPedidosNoPrazoRegular = filtroAplicado => {
  const url = `${API_URL_ALTERACOES_CARDAPIO}/pedidos-no-prazo-terceirizada/${filtroAplicado}/`;
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

export const getTerceirizadaPedidosAutorizados = () => {
  const url = `${API_URL_ALTERACOES_CARDAPIO}/pedidos-autorizados-terceirizada/`;
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

export const getTerceirizadaPedidosReprovados = () => {
  const url = `${API_URL_ALTERACOES_CARDAPIO}/pedidos-reprovados-terceirizada/`;
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

export const TerceirizadaTomaCiencia = uuid => {
  const url = `${API_URL_ALTERACOES_CARDAPIO}/${uuid}/terceirizada-toma-ciencia/`;
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

export const getCODAEPedidosAlteracaoCardapio = filtroAplicado => {
  const url = `${API_URL_ALTERACOES_CARDAPIO}/${
    PEDIDOS.CODAE
  }/${filtroAplicado}/`;
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

export const getTerceirizadaPedidosDeAlteracaoCardapio = filtroAplicado => {
  const url = `${API_URL_ALTERACOES_CARDAPIO}/${
    PEDIDOS.TERCEIRIZADA
  }/${filtroAplicado}/`;
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
