import { API_URL } from "../constants/config.constants";
import authService from "./auth";
import { FLUXO, PEDIDOS } from "./contants";

export const URL_SOLICITAR = `${API_URL}/kit-lanches`;
export const URL_SOLICITACOES_AVULSAS = `${API_URL}/solicitacoes-kit-lanche-avulsa`;

const authToken = {
  Authorization: `JWT ${authService.getToken()}`,
  "Content-Type": "application/json"
};

export const getKitsByApi = async () => {
  const OBJ_REQUEST = {
    headers: authToken,
    method: "GET"
  };

  const url = `${API_URL}/solicitar-kit-lanche/`;
  OBJ_REQUEST["method"] = "GET";
  return await fetch(url, OBJ_REQUEST)
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log("Error Kit Lanche: ", error);
      return {};
    });
};

export const solicitarKitLanche = async values => {
  let status = 0;
  const OBJ_REQUEST = {
    headers: authToken,
    method: "POST",
    body: JSON.stringify(values)
  };
  return await fetch(`${URL_SOLICITACOES_AVULSAS}/`, OBJ_REQUEST)
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

export const registroAtualizaKitLanche = (payload, uuid) => {
  const url = `${URL_SOLICITACOES_AVULSAS}/${uuid}/`;
  let status = 0;
  return fetch(url, {
    method: "PUT",
    body: JSON.stringify(payload),
    headers: authToken
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

export const atualizarKitLanche = async values => {
  const OBJ_REQUEST = {
    headers: authToken,
    method: "PUT",
    body: JSON.stringify(values)
  };

  return await fetch(`${URL_SOLICITAR}/${values.id}/`, OBJ_REQUEST)
    .then(response => {
      return response.json();
    })
    .catch(erro => {
      console.log("Atualizar Kit Lanche: ", erro);
    });
};

export const removeKitLanche = async uuid => {
  const OBJ_REQUEST = {
    headers: authToken,
    method: "DELETE"
  };
  let status = 0;
  return await fetch(`${URL_SOLICITACOES_AVULSAS}/${uuid}/`, OBJ_REQUEST)
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
  const url = `${URL_SOLICITACOES_AVULSAS}/${uuid}/${FLUXO.INICIO_PEDIDO}/`;
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

export const getSolicitacoesKitLancheApi = async () => {
  const OBJ_REQUEST = {
    headers: authToken,
    method: "GET"
  };

  return await fetch(
    `${URL_SOLICITACOES_AVULSAS}/${PEDIDOS.MEUS}/`,
    OBJ_REQUEST
  )
    .then(response => {
      const resp = response.json();
      return resp;
    })
    .catch(erro => {
      console.log("Pega Kit Lanches: ", erro);
    });
};

export const getRefeicoesApi = async () => {
  const OBJ_REQUEST = {
    headers: authToken,
    method: "GET"
  };

  return await fetch(`${API_URL}/kit-lanches/`, OBJ_REQUEST)
    .then(response => {
      return response.json();
    })
    .catch(erro => {
      return erro;
    });
};

export const kitLanches = async () => {
  const OBJ_REQUEST = {
    headers: authToken,
    method: "GET"
  };

  return await fetch(`${API_URL}/kit-lanches/`, OBJ_REQUEST)
    .then(response => {
      return response.json();
    })
    .catch(erro => {
      return erro;
    });
};

export const getCODAEPedidosKitLanchePendentes = filtroAplicado => {
  const url = `${URL_SOLICITACOES_AVULSAS}/${PEDIDOS.CODAE}/${filtroAplicado}/`;
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

export const getDiretoriaRegionalPedidosDeKitLanche = filtroAplicado => {
  const url = `${URL_SOLICITACOES_AVULSAS}/${PEDIDOS.DRE}/${filtroAplicado}/`;
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

export const getDiretoriaRegionalPedidosDeKitLancheAprovados = () => {
  //TODO TIRAR
  const url = `${URL_SOLICITACOES_AVULSAS}/pedidos-aprovados-diretoria-regional/`;
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

export const getDiretoriaRegionalPedidosDeKitLancheReprovados = () => {
  //TODO: TIRAR
  const url = `${URL_SOLICITACOES_AVULSAS}/pedidos-reprovados-diretoria-regional/`;
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

export const getCodaePedidosDeKitLanche = filtroAplicado => {
  const url = `${URL_SOLICITACOES_AVULSAS}/${PEDIDOS.CODAE}/${filtroAplicado}/`;
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

export const getCodaePedidosDeKitLancheAprovados = () => {
  //TODO: tirar
  const url = `${URL_SOLICITACOES_AVULSAS}/pedidos-aprovados-codae/`;
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

export const getCodaePedidosDeKitLancheReprovados = () => {
  //TODO: tirar
  const url = `${URL_SOLICITACOES_AVULSAS}/pedidos-reprovados-codae/`;
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

export const getDrePedidosDeKitLancheAprovados = () => {
  //TODO: tirar
  const url = `${URL_SOLICITACOES_AVULSAS}/pedidos-aprovados-dre/`;
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

export const getPedidosDeKitLancheAprovadosTerceirizada = () => {
  //TODO tirar
  const url = `${URL_SOLICITACOES_AVULSAS}/pedidos-aprovados-terceirizadas/`;
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

export const getTerceirizadasPedidosDeKitLanche = filtroAplicado => {
  const url = `${URL_SOLICITACOES_AVULSAS}/${
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

export const getDetalheKitLancheAvulsa = uuid => {
  const url = `${URL_SOLICITACOES_AVULSAS}/${uuid}/`;
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

export const aprovaDeKitLancheAvulsoDiretoriaRegional = uuid => {
  const url = `${URL_SOLICITACOES_AVULSAS}/${uuid}/${FLUXO.DRE_VALIDA}/`;
  const OBJ_REQUEST = {
    headers: authToken,
    method: "PATCH"
  };
  let status = 0;
  return fetch(url, OBJ_REQUEST)
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

export const cancelaKitLancheAvulsoEscola = async (uuid, justificativa) => {
  const url = `${URL_SOLICITACOES_AVULSAS}/${uuid}/${FLUXO.ESCOLA_CANCELA}/`;
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

export const aprovaDeKitLancheAvulsoCodae = uuid => {
  const url = `${URL_SOLICITACOES_AVULSAS}/${uuid}/${FLUXO.CODAE_AUTORIZA}/`;
  const OBJ_REQUEST = {
    headers: authToken,
    method: "PATCH"
  };
  let status = 0;
  return fetch(url, OBJ_REQUEST)
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

export const aprovaDeKitLancheAvulsoTerceirizadas = uuid => {
  const url = `${URL_SOLICITACOES_AVULSAS}/${uuid}/${
    FLUXO.TERCEIRIZADA_TOMA_CIENCIA
  }/`;
  const OBJ_REQUEST = {
    headers: authToken,
    method: "PATCH"
  };
  let status = 0;
  return fetch(url, OBJ_REQUEST)
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
