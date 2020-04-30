import { FLUXO, PEDIDOS, AUTH_TOKEN } from "services/constants";
import { getPath } from "./helper";

export const codaeListarSolicitacoesDeAlteracaoDeCardapio = (filtroAplicado, tipoSolicitacao) => {
    const url = `${getPath(tipoSolicitacao)}/${PEDIDOS.CODAE}/${filtroAplicado}/`;
    const OBJ_REQUEST = {
      headers: AUTH_TOKEN,
      method: "GET"
    };
    return fetch(url, OBJ_REQUEST)
      .then(result => {
        return result.json(); //FIXME: map results as tipoSolicitacao
      })
      .catch(error => {
        console.log(error);
      });
  };


  export const codaeListarSolicitacoesDeAlteracaoDeCardapioReprovadas = tipoSolicitacao => {
    const url = `${getPath(tipoSolicitacao)}/pedidos-reprovados-codae/`;
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
  
  export const codaeAutorizarSolicitacaoDeAlteracaoDeCardapio = (uuid, justificativa = {}, tipoSolicitacao) => {
    const url = `${getPath(tipoSolicitacao)}/${uuid}/codae-autoriza-pedido/`;
    let status = 0;
    return fetch(url, {
      method: "PATCH",
      body: JSON.stringify(justificativa),
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


export const codaeNegarSolicitacaoDeAlteracaoDeCardapio = (uuid, justificativa, tipoSolicitacao) => {
    const url = `${getPath(tipoSolicitacao)}/${uuid}/${FLUXO.CODAE_NEGA}/`;
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

  export const codaeQuestionarSolicitacaoDeAlteracaoDeCardapio = async (
    uuid,
    observacao_questionamento_codae,
    tipoSolicitacao,
  ) => {
    const url = `${getPath(tipoSolicitacao)}/${uuid}/${FLUXO.CODAE_QUESTIONA}/`;
    const OBJ_REQUEST = {
      headers: AUTH_TOKEN,
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