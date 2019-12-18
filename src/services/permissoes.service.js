import { API_URL } from "../constants/config.constants";
import authService from "./auth";

const authToken = {
  Authorization: `JWT ${authService.getToken()}`,
  "Content-Type": "application/json"
};

export const getDadosUsuarioEOL = registroFuncional => {
  const url = `${API_URL}/dados-usuario-eol/${registroFuncional}/`;
  let status = 0;
  return fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" }
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

export const criarEquipeAdministradoraEscola = (uuid, registroFuncional) => {
  const url = `${API_URL}/vinculos-escolas/${uuid}/criar_equipe_administradora/`;
  let status = 0;
  const body = {
    registro_funcional: registroFuncional
  };
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
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

export const getEquipeAdministradoraEscola = uuid => {
  const url = `${API_URL}/vinculos-escolas/${uuid}/get_equipe_administradora/`;
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

export const finalizarVinculoEscola = (uuid, vinculoUuid) => {
  const url = `${API_URL}/vinculos-escolas/${uuid}/finalizar_vinculo/`;
  let status = 0;
  const body = {
    vinculo_uuid: vinculoUuid
  };
  return fetch(url, {
    method: "PATCH",
    body: JSON.stringify(body),
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

export const criarEquipeAdministradoraDiretoriaRegional = (
  uuid,
  registroFuncional
) => {
  const url = `${API_URL}/vinculos-diretorias-regionais/${uuid}/criar_equipe_administradora/`;
  let status = 0;
  const body = {
    registro_funcional: registroFuncional
  };
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
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

export const getEquipeAdministradoraDiretoriaRegional = uuid => {
  const url = `${API_URL}/vinculos-diretorias-regionais/${uuid}/get_equipe_administradora/`;
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

export const finalizarVinculoDiretoriaRegional = (uuid, vinculoUuid) => {
  const url = `${API_URL}/vinculos-diretorias-regionais/${uuid}/finalizar_vinculo/`;
  let status = 0;
  const body = {
    vinculo_uuid: vinculoUuid
  };
  return fetch(url, {
    method: "PATCH",
    body: JSON.stringify(body),
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

export const criarEquipeAdministradoraCODAEGestaoAlimentacaoTerceirizada = (
  uuid,
  registroFuncional
) => {
  const url = `${API_URL}/vinculos-codae-gestao-alimentacao-terceirizada/${uuid}/criar_equipe_administradora/`;
  let status = 0;
  const body = {
    registro_funcional: registroFuncional
  };
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
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

export const getEquipeAdministradoraCODAEGestaoAlimentacaoTerceirizada = uuid => {
  const url = `${API_URL}/vinculos-codae-gestao-alimentacao-terceirizada/${uuid}/get_equipe_administradora/`;
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

export const finalizarVinculoCODAEGestaoAlimentacaoTerceirizada = (
  uuid,
  vinculoUuid
) => {
  const url = `${API_URL}/vinculos-codae-gestao-alimentacao-terceirizada/${uuid}/finalizar_vinculo/`;
  let status = 0;
  const body = {
    vinculo_uuid: vinculoUuid
  };
  return fetch(url, {
    method: "PATCH",
    body: JSON.stringify(body),
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

export const criarEquipeAdministradoraTerceirizadas = (uuid, payload) => {
  const url = `${API_URL}/vinculos-terceirizadas/${uuid}/criar_equipe_administradora/`;
  let status = 0;
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(payload),
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

export const getEquipeAdministradoraTerceirizadas = uuid => {
  const url = `${API_URL}/vinculos-terceirizadas/${uuid}/get_equipe_administradora/`;
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

export const finalizarVinculoTerceirizadas = (uuid, vinculoUuid) => {
  const url = `${API_URL}/vinculos-terceirizadas/${uuid}/finalizar_vinculo/`;
  let status = 0;
  const body = {
    vinculo_uuid: vinculoUuid
  };
  return fetch(url, {
    method: "PATCH",
    body: JSON.stringify(body),
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
