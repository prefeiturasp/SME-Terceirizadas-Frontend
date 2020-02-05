import { API_URL } from "../constants/config.constants";
import authService from "./auth";

import getAxios from "./_base";

const authToken = {
  Authorization: `JWT ${authService.getToken()}`,
  "Content-Type": "application/json"
};

const URL_DIETA_ESPECIAL = `${API_URL}/solicitacoes-dieta-especial`;

const retornoBase = async url => {
  const OBJ_REQUEST = {
    headers: authToken,
    method: "GET"
  };
  try {
    const result = await fetch(url, OBJ_REQUEST);
    const status = result.status;
    const json = await result.json();
    if (json.results) {
      return { results: json.results, status };
    }
    return { results: json, status };
  } catch (error) {
    console.log(error);
  }
};

export const criaDietaEspecial = async payload => {
  const url = `${URL_DIETA_ESPECIAL}/`;
  const OBJ_REQUEST = {
    headers: authToken,
    method: "POST",
    body: JSON.stringify(payload)
  };
  try {
    const response = await fetch(url, OBJ_REQUEST);
    const status = await response.status;
    const json = await response.json();
    return { data: json, status: status };
  } catch (error) {
    console.log(error);
  }
};

export const getDietaEspecial = async uuid => {
  const url = `${URL_DIETA_ESPECIAL}/${uuid}/`;
  const OBJ_REQUEST = {
    headers: authToken,
    method: "GET"
  };
  try {
    const response = await fetch(url, OBJ_REQUEST);
    const status = response.status;
    const json = await response.json();
    return { data: json, status: status };
  } catch (error) {
    console.log(error);
  }
};

export const getDietasEspeciaisVigentesDeUmAluno = async codigo_eol_aluno => {
  const url = `${URL_DIETA_ESPECIAL}/solicitacoes-aluno/${codigo_eol_aluno}/`;
  const OBJ_REQUEST = {
    headers: authToken,
    method: "GET"
  };
  try {
    const response = await fetch(url, OBJ_REQUEST);
    const status = response.status;
    const json = await response.json();
    return { data: json, status: status };
  } catch (error) {
    console.log(error);
  }
};

export const CODAEAutorizaDietaEspecial = async ({
  uuid,
  classificacaoDieta,
  diagnosticosSelecionados,
  identificacaoNutricionista,
  protocolos
}) => {
  const url = `${API_URL}/solicitacoes-dieta-especial/${uuid}/autorizar/`;
  let status = 0;
  return fetch(url, {
    method: "POST",
    body: JSON.stringify({
      classificacao: classificacaoDieta,
      alergias_intolerancias: diagnosticosSelecionados,
      registro_funcional_nutricionista: identificacaoNutricionista,
      protocolos
    }),
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
      return error;
    });
};

export const CODAENegaDietaEspecial = async (uuid, payload) => {
  // TODO: Incluir identificação do nutricionista na negação da dieta
  const url = `${API_URL}/solicitacoes-dieta-especial/${uuid}/negar/`;
  let status = 0;
  return fetch(url, {
    method: "POST",
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
      return error;
    });
};

export const terceirizadaTomaCienciaDietaEspecial = async uuid => {
  const url = `${API_URL}/solicitacoes-dieta-especial/${uuid}/tomar_ciencia/`;
  let status = 0;
  return fetch(url, {
    method: "POST",
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
      return error;
    });
};

export const getAlergiasIntolerancias = async () => {
  const url = `${API_URL}/alergias-intolerancias/`;
  const response = await retornoBase(url);
  return {
    status: response.status,
    results: response.results.map(r => {
      return {
        uuid: r.id.toString(),
        nome: r.descricao
      };
    })
  };
};

export const getClassificacoesDietaEspecial = async () => {
  const url = `${API_URL}/classificacoes-dieta/`;
  return retornoBase(url);
};

export const escolaCancelaSolicitacao = async (uuid, payload) => {
  const url = `${API_URL}/solicitacoes-dieta-especial/${uuid}/escola-cancela-dieta-especial/`;
  let status = 0;
  return fetch(url, {
    method: "POST",
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
      return error;
    });
};

export const escolaInativaDietaEspecial = async (uuid, payload) => {
  const url = `${API_URL}/solicitacoes-dieta-especial/${uuid}/escola-solicita-inativacao/`;
  let status = 0;
  return fetch(url, {
    method: "PATCH",
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
      return error;
    });
};

export const CODAEAutorizaInativacaoDietaEspecial = async uuid => {
  const url = `${API_URL}/solicitacoes-dieta-especial/${uuid}/codae-autoriza-inativacao/`;
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
      return error;
    });
};

export const CODAENegaInativacaoDietaEspecial = async uuid => {
  const url = `${API_URL}/solicitacoes-dieta-especial/${uuid}/codae-nega-inativacao/`;
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
      return error;
    });
};

export const getDietasAtivasInativasPorAluno = async (params = {}) => {
  const axios = getAxios();
  const response = await axios.get(
    "solicitacoes-dieta-especial-ativas-inativas/",
    { params }
  );
  return response;
};
