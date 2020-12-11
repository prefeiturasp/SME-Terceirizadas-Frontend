import { API_URL } from "../constants/config";
import authService from "./auth";
import axios from "./_base";
import { AUTH_TOKEN } from "./constants";
import Cookies from "js-cookie";

const authToken = {
  Authorization: `JWT ${authService.getToken()}`,
  "Content-Type": "application/json"
};

export const setUsuario = payload => {
  const url = `${API_URL}/cadastro/`;
  let status = 0;
  let values = { ...payload };
  //TODO: ajeitar esse values email
  if (values["tipo_email"] === 0 || values["tipo_email"] === "0") {
    values["email"] = values["email"] + "@sme.prefeitura.sp.gov.br";
  }
  if (values["tipo_email"] === 1 || values["tipo_email"] === "1") {
    values["email"] = values["email"] + "@prefeitura.sp.gov.br";
  }

  return fetch(url, {
    method: "POST",
    body: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken")
    }
  })
    .then(res => {
      status = res.status;
      return res.json();
    })
    .then(data => {
      return { data: data, status: status };
    })
    .catch(error => {
      return console.log(error);
    });
};

export const recuperaSenha = registro_funcional => {
  const url = `${API_URL}/cadastro/recuperar-senha/${registro_funcional}/`;
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
      return console.log(error);
    });
};

export const atualizarSenha = (uuid, confirmationKey, payLoad) => {
  const url = `${API_URL}/cadastro/atualizar-senha/${uuid}/${confirmationKey}/`;
  let status = 0;
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(payLoad),
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

export const meusDados = () => {
  const url = `${API_URL}/usuarios/meus-dados/`;
  return fetch(url, {
    method: "GET",
    headers: authToken
  })
    .then(result => {
      return result.json();
    })
    .catch(error => {
      return error;
    });
};

export const atualizarCargo = () => {
  const url = `${API_URL}/usuarios/atualizar-cargo/`;
  return fetch(url, {
    method: "GET",
    headers: authToken
  })
    .then(result => {
      return result.json();
    })
    .catch(error => {
      console.log(error);
      return error;
    });
};

export const atualizarEmail = payload => {
  const url = `${API_URL}/usuarios/atualizar-email/`;
  let status = 0;
  return fetch(url, {
    method: "PATCH",
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

export const atualizarSenhaLogado = payload => {
  const url = `${API_URL}/usuarios/atualizar-senha/`;
  let status = 0;
  return fetch(url, {
    method: "PATCH",
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

export const confirmarEmail = (uuid, confirmationKey) => {
  const url = `${API_URL}/confirmar_email/${uuid}/${confirmationKey}/`;
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

export const obtemDadosAlunoPeloEOL = async codEOL => {
  const url = `${API_URL}/dados-alunos-eol/${codEOL}/`;
  const OBJ_REQUEST = {
    headers: AUTH_TOKEN,
    method: "GET"
  };
  try {
    const result = await fetch(url, OBJ_REQUEST);
    const status = result.status;
    const json = await result.json();
    return { detail: json.detail, status };
  } catch (error) {
    console.log(error);
  }
};

export const dadosDoAluno = codigoEol => {
  const url = `${API_URL}/alunos/${codigoEol}/`;
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

export const getAlunosListagem = async params =>
  await axios.get(`/alunos/`, { params });
