import axios from "../_base";
import { FLUXO, AUTH_TOKEN } from "services/constants";
import { ENDPOINT } from "constants/shared";
import getPath from "./helper";

export const createAlteracaoCardapio = (payload, isCei) => {
  const url = `${getPath(isCei)}/`;

  if (isCei) {
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

export const updateAlteracaoCardapio = (uuid, payload, isCei) => {
  const url = `${getPath(isCei)}/${uuid}/`;

  if (isCei) {
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

export const deleteAlteracaoCardapio = (uuid, isCei) => {
  const url = `${getPath(isCei)}/${uuid}/`;

  if (isCei) {
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

export const getMeusRascunhosAlteracoesCardapio = isCei => {
  const url = `/${getPath(isCei)}/${ENDPOINT.MINHAS_SOLICITACOES}/`;

  if (isCei) {
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

// enviarAlteracaoCardapio
export const iniciarFluxoAlteracaoCardapio = (uuid, isCei) => {
  const url = `${getPath(isCei)}/${uuid}/${FLUXO.INICIO_PEDIDO}/`;

  if (isCei) {
    return axios.patch(url);
  }

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

export const escolaCancelaAlteracaoCardapio = (uuid, justificativa, isCei) => {
  const url = `${getPath(isCei)}/${uuid}/${FLUXO.ESCOLA_CANCELA}/`;

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

export const getAlteracoesComLancheDoMesCorrente = (escola_uuid, isCei) => {
  const url = `${getPath(isCei)}/com-lanche-do-mes-corrente/${escola_uuid}/`;
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
