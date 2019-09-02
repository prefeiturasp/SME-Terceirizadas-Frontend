import { API_URL } from "../constants/config.constants";
import authService from "./auth";

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
  return await fetch(`${API_URL}/solicitacoes-kit-lanche-avulsa/`, OBJ_REQUEST)
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

export const solicitarKitsLanche = async values => {
  const OBJ_REQUEST = {
    headers: authToken,
    method: "POST",
    body: JSON.stringify({ ids: values })
  };
  return await fetch(`${URL_SOLICITAR}/solicitacoes/`, OBJ_REQUEST)
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log("Salvar Kit Lanche: ", error);
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
  const url = `${URL_SOLICITACOES_AVULSAS}/${uuid}/inicio-pedido/`;
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
    `${URL_SOLICITACOES_AVULSAS}/minhas-solicitacoes/`,
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
  const url = `${URL_SOLICITACOES_AVULSAS}/pedidos-codae/${filtroAplicado}/`;
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
  const url = `${API_URL}/solicitacoes-kit-lanche-avulsa/pedidos-diretoria-regional/${filtroAplicado}/`;
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
  const url = `${API_URL}/solicitacoes-kit-lanche-avulsa/pedidos-codae/${filtroAplicado}/`;
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
  const url = `${API_URL}/solicitacoes-kit-lanche-avulsa/pedidos-terceirizadas/${filtroAplicado}/`;
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
  const url = `${API_URL}/solicitacoes-kit-lanche-avulsa/${uuid}/`;
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
  const url = `${API_URL}/solicitacoes-kit-lanche-avulsa/${uuid}/diretoria-regional-aprova-pedido/`;
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

export const aprovaDeKitLancheAvulsoCodae = uuid => {
  const url = `${API_URL}/solicitacoes-kit-lanche-avulsa/${uuid}/codae-aprova-pedido/`;
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
  const url = `${API_URL}/solicitacoes-kit-lanche-avulsa/${uuid}/terceirizada-toma-ciencia/`;
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
