import { API_URL } from "../constants/config.constants";
import authService from "./auth";
import { PEDIDOS, FLUXO } from "./contants";

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
const URL_INCLUSAO_CONTINUA = `${API_URL}/inclusoes-alimentacao-continua`;

export const criarInclusaoDeAlimentacaoContinua = payload => {
  const url = `${URL_INCLUSAO_CONTINUA}/`;
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
  const url = `${URL_INCLUSAO_CONTINUA}/${uuid}/`;
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
  return await fetch(`${URL_INCLUSAO_CONTINUA}/${uuid}/`, OBJ_REQUEST)
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
  const url = `${URL_INCLUSAO_CONTINUA}/minhas-solicitacoes/`;
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

export const getInclusaoDeAlimentacaoContinua = uuid => {
  const url = `${URL_INCLUSAO_CONTINUA}/${uuid}/`;
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
  const url = `${URL_INCLUSAO_CONTINUA}/pedidos-prioritarios-diretoria-regional/${filtroAplicado}/`;
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
export const getDiretoriaRegionalPedidosDeInclusaoAlimentacaoContinua = filtroAplicado => {
  const url = `${URL_INCLUSAO_CONTINUA}/pedidos-diretoria-regional/${filtroAplicado}/`;
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

export const getDiretoriaRegionalPedidosAutorizados = () => {
  const url = `${URL_INCLUSAO_CONTINUA}/pedidos-autorizados-diretoria-regional/`;
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
  const url = `${URL_INCLUSAO_CONTINUA}/pedidos-reprovados-diretoria-regional/`;
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
  const url = `${URL_INCLUSAO_CONTINUA}/pedidos-prioritarios-codae/${filtroAplicado}/`;
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
  const url = `${URL_INCLUSAO_CONTINUA}/pedidos-no-limite-codae/${filtroAplicado}/`;
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
  const url = `${URL_INCLUSAO_CONTINUA}/pedidos-no-prazo-codae/${filtroAplicado}/`;
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
  const url = `${URL_INCLUSAO_CONTINUA}/pedidos-autorizados-codae/`;
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
  const url = `${URL_INCLUSAO_CONTINUA}/pedidos-reprovados-codae/`;
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

export const getTerceirizadaPedidosPrioritarios = filtroAplicado => {
  const url = `${URL_INCLUSAO_CONTINUA}/pedidos-prioritarios-terceirizada/${filtroAplicado}/`;
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
  const url = `${URL_INCLUSAO_CONTINUA}/pedidos-no-limite-terceirizada/${filtroAplicado}/`;
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
  const url = `${URL_INCLUSAO_CONTINUA}/pedidos-no-prazo-terceirizada/${filtroAplicado}/`;
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
  const url = `${URL_INCLUSAO_CONTINUA}/pedidos-autorizados-terceirizada/`;
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
  const url = `${URL_INCLUSAO_CONTINUA}/pedidos-reprovados-terceirizada/`;
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
  const url = `${URL_INCLUSAO_CONTINUA}/${uuid}/inicio-pedido/`;
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
  const url = `${URL_INCLUSAO_CONTINUA}/${uuid}/diretoria-regional-aprova-pedido/`;
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

export const CODAEConfirmaInclusaoDeAlimentacaoContinua = uuid => {
  const url = `${URL_INCLUSAO_CONTINUA}/${uuid}/codae-aprova-pedido/`;
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

export const escolaCancelaInclusaoDeAlimentacaoContinua = async (
  uuid,
  justificativa
) => {
  const url = `${URL_INCLUSAO_CONTINUA}/${uuid}/${FLUXO.ESCOLA_CANCELA}/`;
  const OBJ_REQUEST = {
    headers: authToken,
    method: "PATCH",
    body: JSON.stringify({ justificativa })
  };
  let status = 0;
  try {
    const res = await fetch(url, OBJ_REQUEST);
    const data = await res.json();
    status = res.status;
    return { ...data, status: status };
  } catch (error) {
    return error.json();
  }
};

export const TerceirizadaTomaCienciaInclusaoDeAlimentacaoContinua = uuid => {
  const url = `${URL_INCLUSAO_CONTINUA}/${uuid}/terceirizada-toma-ciencia/`;
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

export const getCODAEPedidosInclusaoContinuosPendentes = filtroAplicado => {
  const url = `${URL_INCLUSAO_CONTINUA}/${PEDIDOS.CODAE}/${filtroAplicado}/`;
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

export const getDREPedidosInclusaoContinuosPendentes = filtroAplicado => {
  const url = `${URL_INCLUSAO_CONTINUA}/${PEDIDOS.DRE}/${filtroAplicado}/`;
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

export const getTerceirizadaPedidosDeInclusaoAlimentacaoContinua = filtroAplicado => {
  const url = `${URL_INCLUSAO_CONTINUA}/${
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
