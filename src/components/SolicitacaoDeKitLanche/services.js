
import { API_URL } from "../../constants/config.constants";
import authService from "../../services/auth";

const authToken = {
    Authorization: `JWT ${authService.getToken()}`,
    "Content-Type": "application/json"
  };

export const getDiretoriaRegionalPedidosDeKitLanche = filtroAplicado =>{
    const url = `${API_URL}/solicitacoes-kit-lanche-avulsa/pedidos-diretoria-regional/${filtroAplicado}/`;
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
  }

  export const getCodaePedidosDeKitLanche = filtroAplicado =>{
    const url = `${API_URL}/solicitacoes-kit-lanche-avulsa/pedidos-codae/${filtroAplicado}/`;
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
  }

export const getDetalheKitLancheAvulsa = uuid => {
  const url = `${API_URL}/solicitacoes-kit-lanche-avulsa/${uuid}/`;
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
}

export const aprovaDeKitLancheAvulsoDiretoriaRegional = values =>{
  const url = `${API_URL}/solicitacoes-kit-lanche-avulsa/${values.uuid}/diretoria-regional-aprova-pedido/`;
  const OBJ_REQUEST = {
    headers: authToken,
    method: "PATCH",
    body: JSON.stringify(values)
  };
  return fetch(url, OBJ_REQUEST)
    .then(result => {
      return result.json();
    })
    .catch(error => {
      console.log(error);
    });
}

export const aprovaDeKitLancheAvulsoCodae = values =>{
  const url = `${API_URL}/solicitacoes-kit-lanche-avulsa/${values.uuid}/codae-aprova-pedido/`;
  const OBJ_REQUEST = {
    headers: authToken,
    method: "PATCH",
    body: JSON.stringify(values)
  };
  return fetch(url, OBJ_REQUEST)
    .then(result => {
      return result.json();
    })
    .catch(error => {
      console.log(error);
    });
}