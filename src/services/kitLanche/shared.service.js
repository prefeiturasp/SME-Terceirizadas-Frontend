import axios from "services/_base";
import {
  PEDIDOS,
  FLUXO,
  AUTH_TOKEN,
  URL_KIT_LANCHES
} from "services/constants";
import getPath from "./helper";

export const atualizarKitLanche = async values => {
  const OBJ_REQUEST = {
    headers: AUTH_TOKEN,
    method: "PUT",
    body: JSON.stringify(values)
  };

  return await fetch(`${URL_KIT_LANCHES}/${values.id}/`, OBJ_REQUEST)
    .then(response => {
      return response.json();
    })
    .catch(erro => {
      console.log("Atualizar Kit Lanche: ", erro);
    });
};

export const removeKitLanche = async (uuid, tipoSolicitacao) => {
  //TODO: conferir params
  const OBJ_REQUEST = {
    headers: AUTH_TOKEN,
    method: "DELETE"
  };
  let status = 0;
  return await fetch(`${getPath(tipoSolicitacao)}/${uuid}/`, OBJ_REQUEST)
    .then(res => {
      status = res.status;
      return res.json();
    })
    .then(data => {
      return { data: data, status: status };
    })
    .catch(error => {
      return { data: error, status: status };
    });
};

export const inicioPedido = (uuid, tipoSolicitacao) => {
  const url = `${getPath(tipoSolicitacao)}/${uuid}/${FLUXO.INICIO_PEDIDO}/`;

  if (tipoSolicitacao) {
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

export const getSolicitacoesKitLanche = async tipoSolicitacao => {
  const url = `${getPath(tipoSolicitacao)}/${PEDIDOS.MEUS}/`;

  if (tipoSolicitacao) {
    return axios.get(url);
  }

  const OBJ_REQUEST = {
    headers: AUTH_TOKEN,
    method: "GET"
  };

  return await fetch(url, OBJ_REQUEST)
    .then(response => {
      const resp = response.json();
      return resp;
    })
    .catch(erro => {
      console.log(erro);
    });
};

export const getRefeicoes = async () => {
  const OBJ_REQUEST = {
    headers: AUTH_TOKEN,
    method: "GET"
  };

  return await fetch(`${URL_KIT_LANCHES}`, OBJ_REQUEST)
    .then(response => {
      return response.json();
    })
    .catch(erro => {
      return erro;
    });
};

export const getKitLanches = async tipoSolicitacao => {
  const OBJ_REQUEST = {
    headers: AUTH_TOKEN,
    method: "GET"
  };

  return await fetch(`${getPath(tipoSolicitacao)}/kit-lanches/`, OBJ_REQUEST)
    .then(response => {
      return response.json();
    })
    .catch(erro => {
      return erro;
    });
};

export const getDetalheKitLancheAvulsa = (uuid, tipoSolicitacao) => {
  const url = `${getPath(tipoSolicitacao)}/${uuid}/`;
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
