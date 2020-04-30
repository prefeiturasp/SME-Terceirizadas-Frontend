import axios from "../_base";
import { FLUXO, AUTH_TOKEN, TIPO_SOLICITACAO } from "services/constants";
import { ENDPOINT } from "constants/shared";
import getPath from "./helper";

export const escolaIniciarSolicitacaoDeAlteracaoDeCardapio = (uuid, tipoSolicitacao) => {
  const url = `${getPath(tipoSolicitacao)}/${uuid}/${FLUXO.INICIO_PEDIDO}/`;

  let status = 0;
  return fetch(url, {
    method: "PATCH",
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
      return error.json();
    });
};


export const escolaCriarSolicitacaoDeAlteracaoCardapio = (payload, tipoSolicitacao) => {
  const url = `${getPath(tipoSolicitacao)}/`;

  if (tipoSolicitacao === TIPO_SOLICITACAO.SOLICITACAO_CEI) {
    return axios.post(`${ENDPOINT.ALTERACOES_CARDAPIO_CEI}/`, payload);
  }

  let status = 0;
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(payload),
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
      return error.json();
    });
};


export const escolaAlterarSolicitacaoDeAlteracaoCardapio = (uuid, payload, tipoSolicitacao) => {
  const url = `${getPath(tipoSolicitacao)}/${uuid}/`;

  if (tipoSolicitacao === TIPO_SOLICITACAO.SOLICITACAO_CEI) {
    return axios.patch(
      `${ENDPOINT.ALTERACOES_CARDAPIO_CEI}/${payload.uuid}/`,
      payload
    );
  }

  let status = 0;
  return fetch(url, {
    method: "PUT",
    body: payload,
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
      return error.json();
    });
};

export const escolaExcluirSolicitacaoDeAlteracaoCardapio = (uuid, tipoSolicitacao) => {
  const url = `${getPath(tipoSolicitacao)}/${uuid}/`;

  if (tipoSolicitacao) {
    return axios.delete(`${ENDPOINT.ALTERACOES_CARDAPIO_CEI}/${uuid}/`);
  }

  return fetch(url, {
    method: "DELETE",
    headers: AUTH_TOKEN
  })
    .then(result => {
      return result.status;
    })
    .catch(error => {
      return error.json();
    });
};

export const escolaListarRascunhosDeSolicitacaoDeAlteracaoCardapio = tipoSolicitacao => {
  const url = `/${getPath(tipoSolicitacao)}/${ENDPOINT.MINHAS_SOLICITACOES}/`;

  if (tipoSolicitacao) {
    return axios.get(url);
  }

  const OBJ_REQUEST = {
    headers: AUTH_TOKEN,
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

export const escolaCancelarSolicitacaoDeAlteracaoDeCardapio = (uuid, justificativa, tipoSolicitacao) => {
  const url = `${getPath(tipoSolicitacao)}/${uuid}/${FLUXO.ESCOLA_CANCELA}/`;

  let status = 0;
  return fetch(url, {
    method: "PATCH",
    headers: AUTH_TOKEN,
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

// FIXME: Revisar nome do método
export const getAlteracoesComLancheDoMesCorrente = (escola_uuid, tipoSolicitacao) => {
  const url = `${getPath(tipoSolicitacao)}/com-lanche-do-mes-corrente/${escola_uuid}/`;
  const OBJ_REQUEST = {
    headers: AUTH_TOKEN,
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

// FIXME: Revisar nome do método
export const getAlunosPorFaixaEtariaNumaData = async (
  periodoUUID,
  dataReferencia
) => {
  return await axios.get(
    `/${
      ENDPOINT.PERIODOS_ESCOLARES
    }/${periodoUUID}/alunos-por-faixa-etaria/${dataReferencia}/`
  );
};

export const getEscolaPeriodoEscolares = async () => {
  const url = `/${ENDPOINT.QUANTIDADE_ALUNOS_POR_PERIODO}/`;
  return axios.get(url);
};
