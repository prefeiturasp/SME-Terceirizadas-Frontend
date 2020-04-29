import axios from "../_base";
import { FLUXO, PEDIDOS, AUTH_TOKEN } from "services/constants";
import { ENDPOINT } from "constants/shared"
import getPath from "./helper";



// TODO Rever métodos get por prioridade. Esse já consolida todos em um consulta única.
export const getDREAlteracaoCardapio = (filtroAplicado, isCei) => {
    const url = `${getPath(isCei)}/${PEDIDOS.DRE}/${filtroAplicado}/`;
    const OBJ_REQUEST = {
      headers: AUTH_TOKEN,
      method: "GET"
    };
    return fetch(url, OBJ_REQUEST)
      .then(result => {
        return result.json();  //FIXME: map results as isCei
      })
      .catch(error => {
        console.log(error);
      });
  };

  export const DREValidaAlteracaoCardapio = (uuid, isCei) => {
    const url = `${getPath(isCei)}/${uuid}/${FLUXO.DRE_VALIDA}/`;
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
  
  export const DRENaoValidaAlteracaoCardapio = (uuid, justificativa, isCei) => {
    const url = `${getPath(isCei)}/${uuid}/${FLUXO.DRE_NAO_VALIDA}/`;
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

  export const getDREPedidosDeAlteracaoCardapio = async filtroAplicado => {
    const url = `${ENDPOINT.ALTERACOES_CARDAPIO_CEI}/${
      PEDIDOS.DRE
    }/${filtroAplicado}/`;
    const response = await axios.get(url);
    const results = response.data.results;
    return {
      results: results.map(el => ({
        ...el,
        isCei: true
      })),
      status: response.status
    };
  };