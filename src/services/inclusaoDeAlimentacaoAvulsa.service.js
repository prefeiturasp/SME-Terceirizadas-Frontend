import { API_URL } from "../constants/config.constants";
import authService from "./auth";
import { PEDIDOS, FLUXO } from "./constants";

const authToken = {
  Authorization: `JWT ${authService.getToken()}`,
  "Content-Type": "application/json"
};

const URL_INCLUSAO_AVULSA = `${API_URL}/grupos-inclusao-alimentacao-normal`;
const URL_INCLUSAO_CEI = `${API_URL}/inclusoes-alimentacao-da-cei`;

export const getInclusaoDeAlimentacaoAvulsa = uuid => {
  const url = `${URL_INCLUSAO_AVULSA}/${uuid}/`;
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

export const criarInclusaoDeAlimentacaoNormal = payload => {
  const url = `${URL_INCLUSAO_AVULSA}/`;
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
  const url = `${URL_INCLUSAO_AVULSA}/${uuid}/`;
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
  return await fetch(`${URL_INCLUSAO_AVULSA}/${uuid}/`, OBJ_REQUEST)
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
  const url = `${URL_INCLUSAO_AVULSA}/minhas-solicitacoes/`;
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
  const url = `${URL_INCLUSAO_AVULSA}/${uuid}/${FLUXO.INICIO_PEDIDO}/`;
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

// TODO Rever métodos get por prioridade. Esse já consolida todos em um consulta única.
export const getDiretoriaRegionalPedidosDeInclusaoAlimentacaoAvulsa = async filtroAplicado => {
  const url = `${URL_INCLUSAO_AVULSA}/${PEDIDOS.DRE}/${filtroAplicado}/`;
  const OBJ_REQUEST = {
    headers: authToken,
    method: "GET"
  };
  try {
    const result = await fetch(url, OBJ_REQUEST);
    const status = result.status;
    const json = await result.json();
    return { results: json.results, status };
  } catch (error) {
    console.log(error);
  }
};

export const getDiretoriaRegionalPedidosReprovados = () => {
  const url = `${URL_INCLUSAO_AVULSA}/pedidos-reprovados-diretoria-regional/`;
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

export const getCODAEPedidosDeInclusaoAlimentacaoAvulsa = async filtroAplicado => {
  const url = `${URL_INCLUSAO_AVULSA}/${PEDIDOS.CODAE}/${filtroAplicado}/`;
  const OBJ_REQUEST = {
    headers: authToken,
    method: "GET"
  };
  try {
    const result = await fetch(url, OBJ_REQUEST);
    const status = result.status;
    const json = await result.json();
    return { results: json.results, status };
  } catch (error) {
    console.log(error);
  }
};

export const getTerceirizadaPedidosDeInclusaoAlimentacaoAvulsa = async filtroAplicado => {
  const url = `${URL_INCLUSAO_AVULSA}/${
    PEDIDOS.TERCEIRIZADA
  }/${filtroAplicado}/`;
  const OBJ_REQUEST = {
    headers: authToken,
    method: "GET"
  };
  try {
    const result = await fetch(url, OBJ_REQUEST);
    const status = result.status;
    const json = await result.json();
    return { results: json.results, status };
  } catch (error) {
    console.log(error);
  }
};

export const getTerceirizadaPedidosReprovados = () => {
  const url = `${URL_INCLUSAO_AVULSA}/pedidos-reprovados-terceirizada/`;
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

export const escolaCancelaInclusaoDeAlimentacaoAvulsa = async (
  uuid,
  justificativa
) => {
  const url = `${URL_INCLUSAO_AVULSA}/${uuid}/${FLUXO.ESCOLA_CANCELA}/`;
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

export const DREValidaInclusaoDeAlimentacaoAvulsa = (uuid, isCei) => {
  const path = isCei ? URL_INCLUSAO_CEI : URL_INCLUSAO_AVULSA;
  const url = `${path}/${uuid}/${FLUXO.DRE_VALIDA}/`;
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

export const DRENaoValidaInclusaoDeAlimentacaoAvulsa = (
  uuid,
  justificativa,
  isCei
) => {
  const path = isCei ? URL_INCLUSAO_CEI : URL_INCLUSAO_AVULSA;
  const url = `${path}/${uuid}/${FLUXO.DRE_NAO_VALIDA}/`;
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

export const CODAEAutorizaInclusaoDeAlimentacaoAvulsa = (
  uuid,
  justificativa = {},
  isCei
) => {
  const path = isCei ? URL_INCLUSAO_CEI : URL_INCLUSAO_AVULSA;
  const url = `${path}/${uuid}/${FLUXO.CODAE_AUTORIZA}/`;
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

export const CODAENegaInclusaoDeAlimentacaoAvulsa = (uuid, justificativa, isCei) => {
  const path = isCei ? URL_INCLUSAO_CEI : URL_INCLUSAO_AVULSA;
  const url = `${path}/${uuid}/${FLUXO.CODAE_NEGA}/`;
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

export const CODAEQuestionaInclusaoDeAlimentacaoAvulsa = async (
  uuid,
  observacao_questionamento_codae,
  isCei
) => {
  const path = isCei ? URL_INCLUSAO_CEI : URL_INCLUSAO_AVULSA;
  const url = `${path}/${uuid}/${FLUXO.CODAE_QUESTIONA}/`;
  const OBJ_REQUEST = {
    headers: authToken,
    method: "PATCH",
    body: JSON.stringify({ observacao_questionamento_codae })
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

export const TerceirizadaTomaCienciaInclusaoDeAlimentacaoAvulsa = uuid => {
  const url = `${URL_INCLUSAO_AVULSA}/${uuid}/${
    FLUXO.TERCEIRIZADA_TOMA_CIENCIA
  }/`;
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

export const terceirizadaRespondeQuestionamentoInclusaoDeAlimentacaoAvulsa = async (
  uuid,
  payload
) => {
  const url = `${URL_INCLUSAO_AVULSA}/${uuid}/${
    FLUXO.TERCEIRIZADA_RESPONDE_QUESTIONAMENTO
  }/`;
  const OBJ_REQUEST = {
    headers: authToken,
    method: "PATCH",
    body: JSON.stringify(payload)
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

export const getCODAEPedidosInclusaoAvulsoPendentes = filtroAplicado => {
  const url = `${URL_INCLUSAO_AVULSA}/pedidos-codae/${filtroAplicado}/`;
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

export const naoValidarInclusaoNormalDRE = uuid => {
  const url = `${API_URL}/grupos-inclusao-alimentacao-normal/${uuid}/${
    FLUXO.DRE_NAO_VALIDA
  }/`;
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

export const negarInclusaoNormalCodae = uuid => {
  const url = `${API_URL}/grupos-inclusao-alimentacao-normal/${uuid}/${
    FLUXO.CODAE_NEGA
  }/`;
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

export const naoValidarInclusaoContinuaDRE = uuid => {
  const url = `${API_URL}/inclusoes-alimentacao-continua/${uuid}/${
    FLUXO.DRE_NAO_VALIDA
  }/`;
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

export const negarInclusaoContinuaCodae = uuid => {
  const url = `${API_URL}/inclusoes-alimentacao-continua/${uuid}/${
    FLUXO.CODAE_NEGA
  }/`;
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
