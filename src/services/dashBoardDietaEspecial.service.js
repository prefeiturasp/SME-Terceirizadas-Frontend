import axios from "./_base";
import { API_URL } from "../constants/config";
import authService from "./auth";
import { fetchGet } from "./_fetch";

const authToken = {
  Authorization: `JWT ${authService.getToken()}`,
  "Content-Type": "application/json"
};

// ESCOLA
export const getDietaEspecialPendenteAutorizacaoEscola = (
  uuid,
  sem_paginacao = false
) => {
  let url = `${API_URL}/escola-solicitacoes/pendentes-autorizacao-dieta/${uuid}/`;
  if (sem_paginacao) {
    url = `${API_URL}/escola-solicitacoes/pendentes-autorizacao-dieta/${uuid}/?sem_paginacao=true`;
  }

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

export const getDietaEspecialAutorizadasEscola = (
  uuid,
  sem_paginacao = false
) => {
  let url = `${API_URL}/escola-solicitacoes/autorizados-dieta/${uuid}/`;
  if (sem_paginacao) {
    url = `${API_URL}/escola-solicitacoes/autorizados-dieta/${uuid}/?sem_paginacao=true`;
  }

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

export const getDietaEspecialNegadasEscola = (uuid, sem_paginacao = false) => {
  let url = `${API_URL}/escola-solicitacoes/negados-dieta/${uuid}/`;
  if (sem_paginacao) {
    url = `${API_URL}/escola-solicitacoes/negados-dieta/${uuid}/?sem_paginacao=true`;
  }
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

export const getDietaEspecialCanceladasEscola = (
  uuid,
  sem_paginacao = false
) => {
  let url = `${API_URL}/escola-solicitacoes/cancelados-dieta/${uuid}/`;
  if (sem_paginacao) {
    url = `${API_URL}/escola-solicitacoes/cancelados-dieta/${uuid}/?sem_paginacao=true`;
  }
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

export const getDietaEspecialAutorizadasTemporariamenteEscola = (
  uuid,
  sem_paginacao = false
) => {
  if (sem_paginacao) {
    return fetchGet(
      `${API_URL}/escola-solicitacoes/autorizadas-temporariamente-dieta/${uuid}/?sem_paginacao=true`
    );
  }
  return fetchGet(
    `${API_URL}/escola-solicitacoes/autorizadas-temporariamente-dieta/${uuid}/`
  );
};

export const getDietaEspecialAguardandoVigenciaEscola = (
  uuid,
  sem_paginacao = false
) => {
  if (sem_paginacao) {
    return fetchGet(
      `${API_URL}/escola-solicitacoes/aguardando-vigencia-dieta/${uuid}/?sem_paginacao=true`
    );
  }
  return fetchGet(
    `${API_URL}/escola-solicitacoes/aguardando-vigencia-dieta/${uuid}/`
  );
};

export const getDietaEspecialInativasTemporariamenteEscola = (
  uuid,
  sem_paginacao = false
) => {
  if (sem_paginacao) {
    return fetchGet(
      `${API_URL}/escola-solicitacoes/inativas-temporariamente-dieta/${uuid}/?sem_paginacao=true`
    );
  }
  return fetchGet(
    `${API_URL}/escola-solicitacoes/inativas-temporariamente-dieta/${uuid}/`
  );
};

export const getDietaEspecialInativasEscola = (uuid, sem_paginacao = false) => {
  if (sem_paginacao) {
    return fetchGet(
      `${API_URL}/escola-solicitacoes/inativas-dieta/${uuid}/?sem_paginacao=true`
    );
  }
  return fetchGet(`${API_URL}/escola-solicitacoes/inativas-dieta/${uuid}/`);
};

// DRE
export const getDietaEspecialPendenteAutorizacaoDRE = (
  uuid,
  sem_paginacao = false
) => {
  let url = `${API_URL}/diretoria-regional-solicitacoes/pendentes-autorizacao-dieta/${uuid}/`;
  if (sem_paginacao) {
    url = `${API_URL}/diretoria-regional-solicitacoes/pendentes-autorizacao-dieta/${uuid}/?sem_paginacao=true`;
  }

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

export const getDietaEspecialAutorizadasDRE = (uuid, sem_paginacao = false) => {
  let url = `${API_URL}/diretoria-regional-solicitacoes/autorizados-dieta/${uuid}/`;
  if (sem_paginacao) {
    url = `${API_URL}/diretoria-regional-solicitacoes/autorizados-dieta/${uuid}/?sem_paginacao=true`;
  }

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

export const getDietaEspecialNegadasDRE = (uuid, sem_paginacao = false) => {
  let url = `${API_URL}/diretoria-regional-solicitacoes/negados-dieta/${uuid}/`;
  if (sem_paginacao) {
    url = `${API_URL}/diretoria-regional-solicitacoes/negados-dieta/${uuid}/?sem_paginacao=true`;
  }

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

export const getDietaEspecialCanceladasDRE = (uuid, sem_paginacao = false) => {
  let url = `${API_URL}/diretoria-regional-solicitacoes/cancelados-dieta/${uuid}/`;
  if (sem_paginacao) {
    url = `${API_URL}/diretoria-regional-solicitacoes/cancelados-dieta/${uuid}/?sem_paginacao=true`;
  }

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

export const getDietaEspecialAutorizadasTemporariamenteDRE = (
  uuid,
  sem_paginacao = false
) => {
  if (sem_paginacao) {
    return fetchGet(
      `${API_URL}/diretoria-regional-solicitacoes/autorizadas-temporariamente-dieta/${uuid}/?sem_paginacao=true`
    );
  }
  return fetchGet(
    `${API_URL}/diretoria-regional-solicitacoes/autorizadas-temporariamente-dieta/${uuid}/`
  );
};

export const getDietaEspecialInativasTemporariamenteDRE = (
  uuid,
  sem_paginacao = false
) => {
  if (sem_paginacao) {
    return fetchGet(
      `${API_URL}/diretoria-regional-solicitacoes/inativas-temporariamente-dieta/${uuid}/?sem_paginacao=true`
    );
  }
  return fetchGet(
    `${API_URL}/diretoria-regional-solicitacoes/inativas-temporariamente-dieta/${uuid}/`
  );
};

export const getDietaEspecialInativasDRE = (uuid, sem_paginacao = false) => {
  if (sem_paginacao) {
    return fetchGet(
      `${API_URL}/diretoria-regional-solicitacoes/inativas-dieta/${uuid}/?sem_paginacao=true`
    );
  }
  return fetchGet(
    `${API_URL}/diretoria-regional-solicitacoes/inativas-dieta/${uuid}/`
  );
};

// CODAE
export const getDietaEspecialPendenteAutorizacaoCODAE = (
  uuid,
  sem_paginacao = false
) => {
  let url = `${API_URL}/codae-solicitacoes/pendentes-autorizacao-dieta/`;
  if (sem_paginacao) {
    url = `${API_URL}/codae-solicitacoes/pendentes-autorizacao-dieta/?sem_paginacao=true`;
  }

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

export const getDietaEspecialAutorizadasCODAE = (
  uuid,
  sem_paginacao = false
) => {
  let url = `${API_URL}/codae-solicitacoes/autorizados-dieta/`;
  if (sem_paginacao) {
    url = `${API_URL}/codae-solicitacoes/autorizados-dieta/?sem_paginacao=true`;
  }

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

export const getDietaEspecialNegadasCODAE = (uuid, sem_paginacao = false) => {
  let url = `${API_URL}/codae-solicitacoes/negados-dieta/`;
  if (sem_paginacao) {
    url = `${API_URL}/codae-solicitacoes/negados-dieta/?sem_paginacao=true`;
  }

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

export const getDietaEspecialCanceladasCODAE = (
  uuid,
  sem_paginacao = false
) => {
  let url = `${API_URL}/codae-solicitacoes/cancelados-dieta/`;
  if (sem_paginacao) {
    url = `${API_URL}/codae-solicitacoes/cancelados-dieta/?sem_paginacao=true`;
  }

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

export const getDietaEspecialAutorizadasTemporariamenteCODAE = (
  uuid,
  sem_paginacao = false
) => {
  if (sem_paginacao) {
    return fetchGet(
      `${API_URL}/codae-solicitacoes/autorizadas-temporariamente-dieta/?sem_paginacao=true`
    );
  }
  return fetchGet(
    `${API_URL}/codae-solicitacoes/autorizadas-temporariamente-dieta/`
  );
};

export const getDietaEspecialInativasTemporariamenteCODAE = (
  uuid,
  sem_paginacao = false
) => {
  if (sem_paginacao) {
    return fetchGet(
      `${API_URL}/codae-solicitacoes/inativas-temporariamente-dieta/?sem_paginacao=true`
    );
  }
  return fetchGet(
    `${API_URL}/codae-solicitacoes/inativas-temporariamente-dieta/`
  );
};

export const getDietaEspecialInativasCODAE = (uuid, sem_paginacao = false) => {
  if (sem_paginacao) {
    return fetchGet(
      `${API_URL}/codae-solicitacoes/inativas-dieta/?sem_paginacao=true`
    );
  }
  return fetchGet(`${API_URL}/codae-solicitacoes/inativas-dieta/`);
};

// TERCEIRIZADA
export const getDietaEspecialPendenteAutorizacaoTerceirizada = (
  uuid,
  sem_paginacao = false
) => {
  let url = `${API_URL}/terceirizada-solicitacoes/pendentes-autorizacao-dieta/${uuid}/`;
  if (sem_paginacao) {
    url = `${API_URL}/terceirizada-solicitacoes/pendentes-autorizacao-dieta/${uuid}/?sem_paginacao=true`;
  }

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

export const getDietaEspecialAutorizadasTerceirizada = (
  uuid,
  sem_paginacao = false
) => {
  let url = `${API_URL}/terceirizada-solicitacoes/autorizados-dieta/${uuid}/`;
  if (sem_paginacao) {
    url = `${API_URL}/terceirizada-solicitacoes/autorizados-dieta/${uuid}/?sem_paginacao=true`;
  }

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

export const getDietaEspecialNegadasTerceirizada = (
  uuid,
  sem_paginacao = false
) => {
  let url = `${API_URL}/terceirizada-solicitacoes/negados-dieta/${uuid}/`;
  if (sem_paginacao) {
    url = `${API_URL}/terceirizada-solicitacoes/negados-dieta/${uuid}/?sem_paginacao=true`;
  }

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

export const getDietaEspecialCanceladasTerceirizada = (
  uuid,
  sem_paginacao = false
) => {
  let url = `${API_URL}/terceirizada-solicitacoes/cancelados-dieta/${uuid}/`;
  if (sem_paginacao) {
    url = `${API_URL}/terceirizada-solicitacoes/cancelados-dieta/${uuid}/?sem_paginacao=true`;
  }

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

export const getDietaEspecialAutorizadasTemporariamenteTerceirizada = async (
  uuid,
  sem_paginacao = false
) => {
  if (sem_paginacao) {
    return axios.get(
      `/terceirizada-solicitacoes/autorizadas-temporariamente-dieta/${uuid}/?sem_paginacao=true/`
    );
  }
  return axios.get(
    `/terceirizada-solicitacoes/autorizadas-temporariamente-dieta/${uuid}/`
  );
};

export const getDietaEspecialInativasTemporariamenteTerceirizada = async (
  uuid,
  sem_paginacao = false
) => {
  if (sem_paginacao) {
    return axios.get(
      `/terceirizada-solicitacoes/inativas-temporariamente-dieta/${uuid}/?sem_paginacao=true/`
    );
  }
  return axios.get(
    `/terceirizada-solicitacoes/inativas-temporariamente-dieta/${uuid}/`
  );
};

export const getDietaEspecialInativasTerceirizada = async (
  uuid,
  sem_paginacao = false
) => {
  if (sem_paginacao) {
    return axios.get(
      `/terceirizada-solicitacoes/inativas-dieta/${uuid}/?sem_paginacao=true/`
    );
  }
  return axios.get(`/terceirizada-solicitacoes/inativas-dieta/${uuid}/`);
};

export const getDietaEspecialAguardandoVigenciaTerceirizada = async (
  uuid,
  sem_paginacao = false
) => {
  if (sem_paginacao) {
    return fetchGet(
      `${API_URL}/terceirizada-solicitacoes/aguardando-vigencia-dieta/${uuid}/?sem_paginacao=true/`
    );
  }
  return fetchGet(
    `${API_URL}/terceirizada-solicitacoes/aguardando-vigencia-dieta/${uuid}/`
  );
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
