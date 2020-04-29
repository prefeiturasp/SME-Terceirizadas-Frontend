import axios from "../_base";
import { API_URL } from "../../constants/config.constants";
import authService from "../auth";
import { PEDIDOS, FLUXO, TIPO_SOLICITACAO } from "../constants";
import { getPath } from "./helper";

const { SOLICITACAO_CEI } = TIPO_SOLICITACAO;

const authToken = {
  Authorization: `JWT ${authService.getToken()}`,
  "Content-Type": "application/json"
};


export const getCODAEPedidosDeInclusaoAlimentacaoAvulsa = async (filtroAplicado, tipoSolicitacao) => {
    const url = `${getPath(tipoSolicitacao)}/${PEDIDOS.CODAE}/${filtroAplicado}/`;

    if(tipoSolicitacao === SOLICITACAO_CEI) {
        const response = await axios.get(url);
        const results = response.data.results;
        return {
            results: results.map(el => ({
            ...el,
            isCei: true
            })),
            status: response.status
        };
    }


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


export const CODAEAutorizaInclusaoDeAlimentacao = (
    uuid,
    justificativa = {},
    tipoSolicitacao
  ) => {
    const url = `${getPath(tipoSolicitacao)}/${uuid}/${FLUXO.CODAE_AUTORIZA}/`;
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
  
  export const CODAENegaInclusaoDeAlimentacaoAvulsa = (
    uuid,
    justificativa,
    tipoSolicitacao
  ) => {
    const url = `${getPath(tipoSolicitacao)}/${uuid}/${FLUXO.CODAE_NEGA}/`;
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
  
  export const CODAEQuestionaInclusaoDeAlimentacao = async (
    uuid,
    observacao_questionamento_codae,
    tipoSolicitacao
  ) => {
    const url = `${getPath(tipoSolicitacao)}/${uuid}/${FLUXO.CODAE_QUESTIONA}/`;
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


export const getCODAEPedidosPendentes = (filtroAplicado, tipoSolicitacao) => {
    const url = `${getPath(tipoSolicitacao)}/pedidos-codae/${filtroAplicado}/`;
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

  
  