import CONFIG from "../constants/config.constants";
import authService from "./auth";

const authHeader = {
  "Content-Type": "application/json",
  Authorization: `JWT ${authService.getToken()}`
};

export const getTiposUnidadeEscolar = async () => {
  const OBJ_REQUEST = {
    headers: authHeader,
    method: "GET"
  };

  const url = CONFIG.API_URL + "/tipos-unidade-escolar/";
  OBJ_REQUEST["method"] = "GET";
  return await fetch(url, OBJ_REQUEST).then(response => {
    return response.json();
  });
};

export const getVinculosTipoAlimentacaoPorUnidadeEscolar = async uuid => {
  const OBJ_REQUEST = {
    headers: authHeader,
    method: "GET"
  };

  const url = `${
    CONFIG.API_URL
  }/vinculos-tipo-alimentacao-u-e-periodo-escolar/tipo_unidade_escolar/${uuid}/`;
  OBJ_REQUEST["method"] = "GET";
  return await fetch(url, OBJ_REQUEST).then(response => {
    return response.json();
  });
};

export const alteraVinculosTipoAlimentacao = async (uuid, values) => {
  try {
    const response = await fetch(
      `${
        CONFIG.API_URL
      }/vinculos-tipo-alimentacao-u-e-periodo-escolar/${uuid}/`,
      {
        method: "PUT",
        headers: authHeader,
        body: JSON.stringify(values)
      }
    );
    let json = await response.json();
    const status = await response.status;
    json.status = status;
    return json;
  } catch (err) {
    return err;
  }
};

export const getTiposDeAlimentacao = async () => {
  const OBJ_REQUEST = {
    headers: authHeader,
    method: "GET"
  };

  const url = `${CONFIG.API_URL}/tipos-alimentacao/`;
  OBJ_REQUEST["method"] = "GET";
  return await fetch(url, OBJ_REQUEST).then(response => {
    return response.json();
  });
};

export const createVinculoTipoAlimentacaoPeriodoEscolar = payload => {
  const url = `${
    CONFIG.API_URL
  }/combos-vinculos-tipo-alimentacao-u-e-periodo-escolar/`;

  let status = 0;
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: authHeader
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

export const createVinculoSubstituicaoPeriodoEscolar = payload => {
  const url = `${
    CONFIG.API_URL
  }/substituicoes-combos-vinculos-tipo-alimentacao-u-e-periodo-escolar/`;

  let status = 0;
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: authHeader
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

export const deleteVinculoTipoAlimentacaoPeriodoEscolar = uuid => {
  const url = `${
    CONFIG.API_URL
  }/combos-vinculos-tipo-alimentacao-u-e-periodo-escolar/${uuid}`;
  return fetch(url, {
    method: "DELETE",
    headers: authHeader
  })
    .then(result => {
      return result.status;
    })
    .catch(error => {
      return error.json();
    });
};

export const deleteSubstituicaoTipoAlimentacaoPeriodoEscolar = uuid => {
  const url = `${
    CONFIG.API_URL
  }/substituicoes-combos-vinculos-tipo-alimentacao-u-e-periodo-escolar/${uuid}/`;
  return fetch(url, {
    method: "DELETE",
    headers: authHeader
  })
    .then(result => {
      return result.status;
    })
    .catch(error => {
      return error.json();
    });
};
