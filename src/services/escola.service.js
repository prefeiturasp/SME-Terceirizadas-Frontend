import axios from "./_base";
import { API_URL } from "../constants/config";
import authService from "./auth";
import { ErrorHandlerFunction } from "./service-helpers";

const authToken = {
  Authorization: `JWT ${authService.getToken()}`,
  "Content-Type": "application/json",
};

export const buscaPeriodosEscolares = async (params) => {
  const url = `${API_URL}/periodos-escolares/`;
  const response = await axios.get(url, { params }).catch(ErrorHandlerFunction);
  if (response) {
    const data = { data: response.data, status: response.status };
    return data;
  }
};

export const getEscolas = () => {
  const url = `${API_URL}/escolas/`;
  const OBJ_REQUEST = {
    headers: authToken,
    method: "GET",
  };
  return fetch(url, OBJ_REQUEST)
    .then((result) => {
      return result.json();
    })
    .catch((error) => {
      return error.json();
    });
};

export const getEscolasSimples = () => {
  const url = `${API_URL}/escolas-simples/?limit=1034`;
  const OBJ_REQUEST = {
    headers: authToken,
    method: "GET",
  };
  return fetch(url, OBJ_REQUEST)
    .then((result) => {
      return result.json();
    })
    .catch((error) => {
      return error.json();
    });
};

export const getEscolasSimplissima = (params = {}) => {
  let url = new URL(`${API_URL}/escolas-simplissima/`);
  Object.keys(params).forEach((key) =>
    url.searchParams.append(key, params[key])
  );
  const OBJ_REQUEST = {
    headers: authToken,
    method: "GET",
  };
  return fetch(url, OBJ_REQUEST)
    .then((result) => {
      return result.json();
    })
    .catch((error) => {
      return error.json();
    });
};

export const getEscolasParaFiltros = (params = {}) => {
  let url = new URL(`${API_URL}/escolas-para-filtros/`);
  Object.keys(params).forEach((key) =>
    url.searchParams.append(key, params[key])
  );
  const OBJ_REQUEST = {
    headers: authToken,
    method: "GET",
  };
  return fetch(url, OBJ_REQUEST)
    .then((result) => {
      return result.json();
    })
    .catch((error) => {
      return error.json();
    });
};

export const getEscolasSimplissimaComDRE = () => {
  const url = `${API_URL}/escolas-simplissima-com-dre/`;
  const OBJ_REQUEST = {
    headers: authToken,
    method: "GET",
  };
  return fetch(url, OBJ_REQUEST)
    .then((result) => {
      return result.json();
    })
    .catch((error) => {
      return error.json();
    });
};

export const getEscolasSimplissimaComDREUnpaginated = async () =>
  axios.get("escolas-simplissima-com-dre-unpaginated/");

export const getEscolasTercTotal = async (params = {}) => {
  const url = "escolas-simplissima-com-dre-unpaginated/terc-total/";
  const response = await axios
    .get(url, { params: params })
    .catch(ErrorHandlerFunction);
  if (response) {
    const data = { data: response.data, status: response.status };
    return data;
  }
};

export const getEscolasSimplissimaPorDiretoriaRegional = (dre_uuid) => {
  const url = `${API_URL}/escolas-simplissima/${dre_uuid}/`;
  const OBJ_REQUEST = {
    headers: authToken,
    method: "GET",
  };
  return fetch(url, OBJ_REQUEST)
    .then((result) => {
      return result.json();
    })
    .catch((error) => {
      return error.json();
    });
};

export const getTiposGestao = () => {
  const url = `${API_URL}/tipos-gestao/`;
  const OBJ_REQUEST = {
    headers: authToken,
    method: "GET",
  };
  return fetch(url, OBJ_REQUEST)
    .then((result) => {
      return result.json();
    })
    .catch((error) => {
      return error.json();
    });
};

export const getSubprefeituras = () => {
  const url = `${API_URL}/subprefeituras/`;
  const OBJ_REQUEST = {
    headers: authToken,
    method: "GET",
  };
  return fetch(url, OBJ_REQUEST)
    .then((result) => {
      return result.json();
    })
    .catch((error) => {
      return error.json();
    });
};

export const getQuantidaDeAlunosPorPeriodoEEscola = (uuidEscola) => {
  const url = `${API_URL}/quantidade-alunos-por-periodo/escola/${uuidEscola}/`;
  const OBJ_REQUEST = {
    headers: authToken,
    method: "GET",
  };
  return fetch(url, OBJ_REQUEST)
    .then((result) => {
      return result.json();
    })
    .catch((error) => {
      return error.json();
    });
};

export const getEscolaSimples = async (uuidEscola) => {
  const url = uuidEscola
    ? `/escolas-simples/${uuidEscola}/`
    : "/escolas-simples/";
  return axios.get(url);
};

export const updateEscolaSimples = async (uuidEscola, valores) =>
  axios.patch(`/escolas-simples/${uuidEscola}/`, valores);

export const getQuantidadeAlunosEscola = async (uuidEscola) => {
  const url = `${API_URL}/quantidade-alunos-por-periodo/escola/${uuidEscola}/`;
  const response = await axios.get(url).catch(ErrorHandlerFunction);
  if (response) {
    const data = { data: response.data, status: response.status };
    return data;
  }
};

export const getGrupoUnidadeEscolar = async () => {
  const url = `${API_URL}/grupos-unidade-escolar/`;
  const response = await axios.get(url).catch(ErrorHandlerFunction);
  if (response) {
    const data = { data: response.data, status: response.status };
    return data;
  }
};
