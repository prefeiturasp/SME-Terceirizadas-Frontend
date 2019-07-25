import { API_URL } from "../constants/config.constants";
import authService from "./auth";

export const URL_SOLICITAR = API_URL + "/kit-lanches/";

const authToken = {
  Authorization: `JWT ${authService.getToken()}`,
  "Content-Type": "application/json"
};

export const getKitsByApi = async () => {
  const OBJ_REQUEST = {
    headers: authToken,
    method: "GET"
  };

  const url = API_URL + "/solicitar-kit-lanche/";
  OBJ_REQUEST["method"] = "GET";
  return await fetch(url, OBJ_REQUEST)
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log("Error Kit Lanche: ", error);
      return {};
    });
};

export const obtemDadosDaEscolaApi = async (uuid) => {
  const OBJ_REQUEST = {
    headers: authToken,
    method: "GET"
  };

  const url = API_URL + "/escolas/"+uuid+"/";
  return await fetch(url, OBJ_REQUEST)
    .then(response => {
      return response.json();
    })
    .catch(erro => {
      console.log("Erro ao recuperar dados escolares");
      return {};
    })
};

export const getQuatidadeAlunoApi = async () => {
  const OBJ_REQUEST = {
    headers: authToken,
    method: "GET"
  };

  const url = API_URL + "/kit-lanches/";
  return await fetch(url, OBJ_REQUEST)
    .then(response => {
      return response.json();
    })
    .catch(erro => {
      console.log("Error quantidade de aluno: ", erro);
      return {};
    });
};

export const getDiasUteis = async () => {
  const url = API_URL + "/dias-uteis/";
  return await fetch(url)
    .then(response => {
      return response.json();
    })
    .catch(erro => {
      console.log("Error dias uteis: ", erro);
      return {};
    });
};

export const solicitarKitLanche = async values => {
  const OBJ_REQUEST = {
    headers: authToken,
    method: "POST",
    body: JSON.stringify(values)
  };

  return await fetch(URL_SOLICITAR, OBJ_REQUEST)
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log("Salvar Kit Lanche: ", error);
      return {};
    });
};

export const registroSalvarKitLanche = async values => {
  const OBJ_REQUEST = {
    headers: authToken,
    method: "POST",
    body: JSON.stringify(values)
  };

  return await fetch(URL_SOLICITAR + "salvar/", OBJ_REQUEST)
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log("Salvar Kit Lanche: ", error);
      return {};
    });
};

export const solicitarKitsLanche = async values => {
  const OBJ_REQUEST = {
    headers: authToken,
    method: "POST",
    body: JSON.stringify({ ids: values })
  };

  return await fetch(URL_SOLICITAR + "solicitacoes/", OBJ_REQUEST)
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log("Salvar Kit Lanche: ", error);
    });
};

export const atualizarKitLanche = async values => {
  const OBJ_REQUEST = {
    headers: authToken,
    method: "PUT",
    body: JSON.stringify(values)
  };

  return await fetch(URL_SOLICITAR + values.id + "/", OBJ_REQUEST)
    .then(response => {
      return response.json();
    })
    .catch(erro => {
      console.log("Atualizar Kit Lanche: ", erro);
    });
};

export const removeKitLanche = async idKit => {
  const OBJ_REQUEST = {
    headers: authToken,
    method: "DELETE",
    body: JSON.stringify({ id: idKit })
  };

  return await fetch(URL_SOLICITAR + idKit, OBJ_REQUEST)
    .then(response => {
      return response.json();
    })
    .catch(erro => {
      console.log("Remover Kit Lanche: ", erro);
    });
};

export const getSolicitacoesKitLancheApi = async () => {
  const OBJ_REQUEST = {
    headers: authToken,
    method: "GET"
  };

  return await fetch(URL_SOLICITAR, OBJ_REQUEST)
    .then(response => {
      const resp = response.json();
      return resp;
    })
    .catch(erro => {
      console.log("Pega Kit Lanches: ", erro);
    });
};

export const getRefeicoesApi = async () => {
  const OBJ_REQUEST = {
    headers: authToken,
    method: "GET"
  };

  return await fetch(API_URL + "/kit-lanches/", OBJ_REQUEST)
    .then(response => {
      return response.json();
    })
    .catch(erro => {
      return erro;
    });
};
