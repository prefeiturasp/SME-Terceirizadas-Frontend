import { API_URL } from "../constants/config.constants";
import { PEDIDOS, FLUXO } from "./constants";
import authService from "./auth";

const authToken = {
  Authorization: `JWT ${authService.getToken()}`,
  "Content-Type": "application/json"
};
const URL_SUSPENSAO_ALIMENTACAO = `${API_URL}/grupos-suspensoes-alimentacao`;

export const createSuspensaoDeAlimentacao = payload => {
  const url = `${URL_SUSPENSAO_ALIMENTACAO}/`;

  let status = 0;
  return fetch(url, {
    method: "POST",
    body: payload,
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

export const deleteSuspensaoDeAlimentacao = uuid => {
  const url = `${URL_SUSPENSAO_ALIMENTACAO}/${uuid}/`;
  return fetch(url, {
    method: "DELETE",
    headers: authToken
  })
    .then(result => {
      return result.status;
    })
    .catch(error => {
      return error.json();
    });
};

export const getSuspensoesDeAlimentacaoSalvas = () => {
  const url = `${URL_SUSPENSAO_ALIMENTACAO}/meus_rascunhos/`;
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

export const getMotivosSuspensaoCardapio = () => {
  const url = `${API_URL}/motivos-suspensao-cardapio/`;
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

export const enviarSuspensaoDeAlimentacao = uuid => {
  const url = `${URL_SUSPENSAO_ALIMENTACAO}/${uuid}/informa-suspensao/`;
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

export const updateSuspensaoDeAlimentacao = (uuid, payload) => {
  const url = `${URL_SUSPENSAO_ALIMENTACAO}/${uuid}/`;
  let status = 0;

  return fetch(url, {
    method: "PUT",
    body: payload,
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

export const getSuspensoesDeAlimentacaoInformadas = () => {
  const url = `${URL_SUSPENSAO_ALIMENTACAO}/informadas/`;
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

export const getSuspensaoDeAlimentacaoUUID = uuid => {
  const url = `${URL_SUSPENSAO_ALIMENTACAO}/${uuid}/`;
  let status = 0;
  return fetch(url, {
    method: "get",
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

export const terceirizadaTomaCienciaSuspensaoDeAlimentacao = uuid => {
  const url = `${URL_SUSPENSAO_ALIMENTACAO}/${uuid}/${
    FLUXO.TERCEIRIZADA_TOMA_CIENCIA
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

export const getSuspensaoDeAlimentacaoTomadaCiencia = () => {
  const url = `${URL_SUSPENSAO_ALIMENTACAO}/tomados-ciencia/`;
  let status = 0;
  return fetch(url, {
    method: "GET",
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

export const getSuspensaoDeAlimentacaoCODAE = filtro_aplicado => {
  const url = `${URL_SUSPENSAO_ALIMENTACAO}/${
    PEDIDOS.CODAE
  }/${filtro_aplicado}/`;

  return fetch(url, {
    method: "GET",
    headers: authToken
  })
    .then(res => {
      return res.json();
    })
    .catch(error => {
      return error.json();
    });
};

export const getTerceirizadasSuspensoesDeAlimentacao = filtroAplicado => {
  const url = `${URL_SUSPENSAO_ALIMENTACAO}/${
    PEDIDOS.TERCEIRIZADA
  }/${filtroAplicado}/`;
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
