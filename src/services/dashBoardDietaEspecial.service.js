import { API_URL } from "../constants/config";
import authService from "./auth";
import { fetchGet } from "./_fetch";

const authToken = {
  Authorization: `JWT ${authService.getToken()}`,
  "Content-Type": "application/json"
};

// ESCOLA
export const getDietaEspecialPendenteAutorizacaoEscola = uuid => {
  const url = `${API_URL}/escola-solicitacoes/pendentes-autorizacao-dieta/${uuid}/`;

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

export const getDietaEspecialAutorizadasEscola = uuid => {
  const url = `${API_URL}/escola-solicitacoes/autorizados-dieta/${uuid}/`;

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

export const getDietaEspecialNegadasEscola = uuid => {
  const url = `${API_URL}/escola-solicitacoes/negados-dieta/${uuid}/`;

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

export const getDietaEspecialCanceladasEscola = uuid => {
  const url = `${API_URL}/escola-solicitacoes/cancelados-dieta/${uuid}/`;

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

export const getDietaEspecialAutorizadasTemporariamenteEscola = uuid =>
  fetchGet(
    `${API_URL}/escola-solicitacoes/autorizadas-temporariamente-dieta/${uuid}/`
  );

export const getDietaEspecialInativasTemporariamenteEscola = uuid =>
  fetchGet(
    `${API_URL}/escola-solicitacoes/inativas-temporariamente-dieta/${uuid}/`
  );

export const getDietaEspecialInativasEscola = uuid =>
  fetchGet(`${API_URL}/escola-solicitacoes/inativas-dieta/${uuid}/`);

// DRE
export const getDietaEspecialPendenteAutorizacaoDRE = uuid => {
  const url = `${API_URL}/diretoria-regional-solicitacoes/pendentes-autorizacao-dieta/${uuid}/`;

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

export const getDietaEspecialAutorizadasDRE = uuid => {
  const url = `${API_URL}/diretoria-regional-solicitacoes/autorizados-dieta/${uuid}/`;

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

export const getDietaEspecialNegadasDRE = uuid => {
  const url = `${API_URL}/diretoria-regional-solicitacoes/negados-dieta/${uuid}/`;

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

export const getDietaEspecialCanceladasDRE = uuid => {
  const url = `${API_URL}/diretoria-regional-solicitacoes/cancelados-dieta/${uuid}/`;

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

export const getDietaEspecialAutorizadasTemporariamenteDRE = uuid =>
  fetchGet(
    `${API_URL}/diretoria-regional-solicitacoes/autorizadas-temporariamente-dieta/${uuid}/`
  );

export const getDietaEspecialInativasTemporariamenteDRE = uuid =>
  fetchGet(
    `${API_URL}/diretoria-regional-solicitacoes/inativas-temporariamente-dieta/${uuid}/`
  );

export const getDietaEspecialInativasDRE = uuid =>
  fetchGet(
    `${API_URL}/diretoria-regional-solicitacoes/inativas-dieta/${uuid}/`
  );

// CODAE
export const getDietaEspecialPendenteAutorizacaoCODAE = () => {
  const url = `${API_URL}/codae-solicitacoes/pendentes-autorizacao-dieta/`;

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

export const getDietaEspecialAutorizadasCODAE = () => {
  const url = `${API_URL}/codae-solicitacoes/autorizados-dieta/`;

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

export const getDietaEspecialNegadasCODAE = () => {
  const url = `${API_URL}/codae-solicitacoes/negados-dieta/`;

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

export const getDietaEspecialCanceladasCODAE = () => {
  const url = `${API_URL}/codae-solicitacoes/cancelados-dieta/`;

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

export const getDietaEspecialAutorizadasTemporariamenteCODAE = () =>
  fetchGet(`${API_URL}/codae-solicitacoes/autorizadas-temporariamente-dieta/`);

export const getDietaEspecialInativasTemporariamenteCODAE = () =>
  fetchGet(`${API_URL}/codae-solicitacoes/inativas-temporariamente-dieta/`);

export const getDietaEspecialInativasCODAE = () =>
  fetchGet(`${API_URL}/codae-solicitacoes/inativas-dieta/`);

// TERCEIRIZADA
export const getDietaEspecialPendenteAutorizacaoTerceirizada = uuid => {
  const url = `${API_URL}/terceirizada-solicitacoes/pendentes-autorizacao-dieta/${uuid}/`;

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

export const getDietaEspecialAutorizadasTerceirizada = uuid => {
  const url = `${API_URL}/terceirizada-solicitacoes/autorizados-dieta/${uuid}/`;

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

export const getDietaEspecialNegadasTerceirizada = uuid => {
  const url = `${API_URL}/terceirizada-solicitacoes/negados-dieta/${uuid}/`;

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

export const getDietaEspecialCanceladasTerceirizada = uuid => {
  const url = `${API_URL}/terceirizada-solicitacoes/cancelados-dieta/${uuid}/`;

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

export const getPaginacaoSolicitacoesDietaEspecial = (
  urlPaginacao,
  uuidInstituicao,
  offSet
) => {
  const url = `${API_URL}/${urlPaginacao}/${uuidInstituicao}/?limit=100${
    offSet > 0 ? `&offset=${offSet}` : "/"
  }`;

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

export const getPaginacaoSolicitacoesDietaEspecialCODAE = (
  urlPaginacao,
  offSet
) => {
  const url = `${API_URL}/${urlPaginacao}/?limit=100${
    offSet > 0 ? `&offset=${offSet}` : ""
  }`;

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
