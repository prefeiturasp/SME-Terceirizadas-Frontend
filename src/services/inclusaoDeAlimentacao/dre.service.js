import { API_URL } from "constants/config.constants";
import { PEDIDOS, FLUXO, AUTH_TOKEN } from "services/constants";
import { getPath } from "./helper";


export const dreListarSolicitacoesDeInclusaoDeAlimentacao = async (filtroAplicado, tipoSolicitacao) => {
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

  export const dreListarSolicitacoesDeInclusaoDeAlimentacaoReprovados =  tipoSolicitacao => {
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


  export const dreValidarSolicitacaoDeInclusaoDeAlimentacao = (uuid, tipoSolicitacao) => {
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


  export const dreReprovarSolicitacaoDeInclusaoDeAlimentacao = (uuid, tipoSolicitacao) => {
    const url = `${getPath(tipoSolicitacao)}/${uuid}/${
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


