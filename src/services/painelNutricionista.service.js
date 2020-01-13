import { API_URL } from "../constants/config.constants";
import { AUTH_TOKEN, SOLICITACOES, SOLICITACOES_DIETA } from "./contants";

// TODO: colocar essa função num arquivo separado, está sendo copiada/colada
const retornoBase = async url => {
  const OBJ_REQUEST = {
    headers: AUTH_TOKEN,
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

export const getSolicitacaoDietaEspecial = async uuid => {
  const url = `${SOLICITACOES_DIETA}/${uuid}/`;
  return retornoBase(url);
};

export const getSolicitacoesPendentesNutricionista = async () => {
  const url = `${SOLICITACOES_DIETA}/${SOLICITACOES.PENDENTES}/`;
  return retornoBase(url);
};

export const getSolicitacoesAutorizadasNutricionista = async () => {
  const url = `${SOLICITACOES_DIETA}/${SOLICITACOES.AUTORIZADOS}/`;
  return retornoBase(url);
};

export const getSolicitacoesNegadasNutricionista = async () => {
  const url = `${SOLICITACOES_DIETA}/${SOLICITACOES.NEGADOS}/`;
  return retornoBase(url);
};

export const getAlergiasIntolerancias = async () => {
  const url = `${API_URL}/alergias-intolerancias`;
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

export const getTiposDietaEspecial = async () => {
  const url = `${API_URL}/tipos-dieta-especial`;
  return retornoBase(url);
};

export const getClassificacoesDietaEspecial = async () => {
  const url = `${API_URL}/classificacoes-dieta`;
  return retornoBase(url);
};

export const getMotivosNegacaoDietaEspecial = async () => {
  const url = `${API_URL}/motivos-negacao`;
  return retornoBase(url);
};

export const autorizaSolicitacaoDietaEspecial = async ({
  uuid,
  classificacaoDieta,
  diagnosticosSelecionados,
  identificacaoNutricionista,
  protocolos
}) => {
  const url = `${API_URL}/solicitacoes-dieta-especial/${uuid}/autoriza/`;
  let status = 0;
  return fetch(url, {
    method: "POST",
    body: JSON.stringify({
      classificacaoDieta,
      diagnosticosSelecionados,
      identificacaoNutricionista,
      protocolos
    }),
    headers: AUTH_TOKEN
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

export const negaSolicitacaoDietaEspecial = async ({
  uuid,
  motivo,
  justificativa
}) => {
  const url = `${API_URL}/solicitacoes-dieta-especial/${uuid}/negar/`;
  let status = 0;
  return fetch(url, {
    method: "POST",
    body: JSON.stringify({ motivo, justificativa }),
    headers: AUTH_TOKEN
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
