
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