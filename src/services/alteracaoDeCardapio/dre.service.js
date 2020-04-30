//import axios from "../_base";
import { FLUXO, PEDIDOS, AUTH_TOKEN } from "services/constants";
import getPath from "./helper";



// TODO Rever métodos get por prioridade. Esse já consolida todos em um consulta única.
export const dreListarSolicitacoesDeAlteracaoDeCardapio = (filtroAplicado, tipoSolicitacao) => {
    const url = `${getPath(tipoSolicitacao)}/${PEDIDOS.DRE}/${filtroAplicado}/`;
    const OBJ_REQUEST = {
      headers: AUTH_TOKEN,
      method: "GET"
    };
    return fetch(url, OBJ_REQUEST)
      .then(result => {
        return result.json();  //FIXME: map results as tipoSolicitacao
      })
      .catch(error => {
        console.log(error);
      });
  };

  export const dreValidarSolicitacaoDeAlteracaoDeCardapio = (uuid, tipoSolicitacao) => {
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
  
  export const dreReprovarSolicitacaoDeAlteracaoDeCardapio = (uuid, justificativa, tipoSolicitacao) => {
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

/*   export const getDREPedidosDeAlteracaoCardapio = async filtroAplicado => {
    const url = `${ENDPOINT.ALTERACOES_CARDAPIO_CEI}/${
      PEDIDOS.DRE
    }/${filtroAplicado}/`;
   
  }; */