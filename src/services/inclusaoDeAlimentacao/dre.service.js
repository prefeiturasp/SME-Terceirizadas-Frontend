import { API_URL } from "constants/config.constants";
import { PEDIDOS, FLUXO, AUTH_TOKEN } from "services/constants";
import getPath from "./helper";

export const getPedidosReprovadosDeInclusaoDeAlimentacaoDRE =  tipoSolicitacao => {
    const url = `${getPath(tipoSolicitacao)}/pedidos-reprovados-diretoria-regional/`;
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


  // TODO Rever métodos get por prioridade. Esse já consolida todos em um consulta única.
export const getPedidosDeInclusaoAlimentacaoAvulsa = async (filtroAplicado, tipoSolicitacao) => {
    const url = `${getPath(tipoSolicitacao)}/${PEDIDOS.DRE}/${filtroAplicado}/`;
    const OBJ_REQUEST = {
      headers: AUTH_TOKEN,
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


  export const DREValidaInclusaoDeAlimentacao = (uuid, tipoSolicitacao) => {
    const url = `${getPath(tipoSolicitacao)}/${uuid}/${FLUXO.DRE_VALIDA}/`;
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
  
  export const DRENaoValidaInclusaoDeAlimentacao = (
    uuid,
    justificativa,
    tipoSolicitacao
  ) => {
    const url = `${getPath(tipoSolicitacao)}/${uuid}/${FLUXO.DRE_NAO_VALIDA}/`;
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


  export const naoValidarInclusaoNormalDRE = uuid => {
    const url = `${API_URL}/grupos-inclusao-alimentacao-normal/${uuid}/${
      FLUXO.DRE_NAO_VALIDA
    }/`;
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


  // NOTE: migrado apartir do aruqivo de innclusao avulsa
  export const naoValidarInclusaoContinuaDRE = uuid => {
    const url = `${API_URL}/inclusoes-alimentacao-continua/${uuid}/${
      FLUXO.DRE_NAO_VALIDA
    }/`;
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
  
  export const getDREPedidosInclusao = (filtroAplicado, tipoSolicitacao) => {
    const url = `${getPath(tipoSolicitacao)}/${PEDIDOS.DRE}/${filtroAplicado}/`;
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
  

