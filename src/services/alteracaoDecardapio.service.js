import { API_URL } from "../constants/config.constants";
import authService from "./auth";

const authToken = {
  Authorization: `JWT ${authService.getToken()}`,
  "Content-Type": "application/json"
};

export const createAlteracaoCardapio = payload => {
  const url = `${API_URL}/alteracoes-cardapio/`;

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
  const url = `${API_URL}/alteracoes-cardapio/${uuid}/`;
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
  const url = `${API_URL}/alteracoes-cardapio/${uuid}/`;
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
  const url = `${API_URL}/alteracoes-cardapio/${uuid}/inicio-pedido/`;
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

export const getDiretoriaRegionalPedidosAprovados = () => {
  const url = `${API_URL}/alteracoes-cardapio/pedidos-aprovados-diretoria-regional/`;
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
  const url = `${API_URL}/alteracoes-cardapio/pedidos-reprovados-diretoria-regional/`;
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
  const url = `${API_URL}/alteracoes-cardapio/pedidos-prioritarios-diretoria-regional/${filtroAplicado}/`;
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
  const url = `${API_URL}/alteracoes-cardapio/pedidos-no-limite-diretoria-regional/${filtroAplicado}/`;
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
  const url = `${API_URL}/alteracoes-cardapio/pedidos-no-prazo-diretoria-regional/${filtroAplicado}/`;
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
  const url = `${API_URL}/alteracoes-cardapio/pedidos-diretoria-regional/${filtroAplicado}/`;
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
  const url = `${API_URL}/alteracoes-cardapio/${uuid}/diretoria-regional-aprova/`;
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

export const getAlteracaoCardapio = uuid => {
  const url = `${API_URL}/alteracoes-cardapio/${uuid}/`;
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
  const url = `${API_URL}/alteracoes-cardapio/pedidos-prioritarios-codae/${filtroAplicado}/`;
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
  const url = `${API_URL}/alteracoes-cardapio/pedidos-no-limite-codae/${filtroAplicado}/`;
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
  const url = `${API_URL}/alteracoes-cardapio/pedidos-no-prazo-codae/${filtroAplicado}/`;
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

export const getCodaePedidosAprovados = () => {
  const url = `${API_URL}/alteracoes-cardapio/pedidos-aprovados-codae/`;
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
  const url = `${API_URL}/alteracoes-cardapio/pedidos-reprovados-codae/`;
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
  const url = `${API_URL}/alteracoes-cardapio/${uuid}/codae-aprova-pedido/`;
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

export const getTerceirizadaPedidosPrioritarios = filtroAplicado => {
  const url = `${API_URL}/alteracoes-cardapio/pedidos-prioritarios-terceirizada/${filtroAplicado}/`;
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
  const url = `${API_URL}/alteracoes-cardapio/pedidos-no-limite-terceirizada/${filtroAplicado}/`;
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
  const url = `${API_URL}/alteracoes-cardapio/pedidos-no-prazo-terceirizada/${filtroAplicado}/`;
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

export const getTerceirizadaPedidosAprovados = () => {
  const url = `${API_URL}/alteracoes-cardapio/pedidos-aprovados-terceirizada/`;
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
  const url = `${API_URL}/alteracoes-cardapio/pedidos-reprovados-terceirizada/`;
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
  const url = `${API_URL}/alteracoes-cardapio/${uuid}/terceirizada-toma-ciencia/`;
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
  const url = `${API_URL}/alteracoes-cardapio/pedidos-codae/${filtroAplicado}/`;
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
