import { API_URL } from "../constants/config.constants";
import authService from "./auth";

const authToken = {
  Authorization: `JWT ${authService.getToken()}`,
  "Content-Type": "application/json"
};

export const getEvolucaoSolicitacoesEscola = () => {
  const url = `${API_URL}/escola-solicitacoes/resumo-ano/`;
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

export const getResumoTotaisPorMesEscola = () => {
  const url = `${API_URL}/escola-solicitacoes/resumo-mes/`;
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

export const getPedidosESolicitacoesFiltroEscola = (
  values,
  dataDe,
  dataAte
) => {
  const url = `${API_URL}/escola-solicitacoes/pesquisa/?tipo_solicitacao=${
    values.tipo_de_solicitacao
  }&status_solicitacao=${
    values.status_solicitacao
  }&data_inicial=${dataDe}&data_final=${dataAte}`;

  const OBJ_REQUEST = {
    headers: authToken,
    method: "GET"
  };
  return fetch(url, OBJ_REQUEST)
    .then(result => {
      return result.json();
    })
    .catch(error => {
      return error.json();
    });
};

export const getPedidosESolicitacoesFiltroPaginacaoEscola = (
  values,
  dataDe,
  dataAte,
  pagina
) => {
  const url = `${API_URL}/escola-solicitacoes/pesquisa?data_final=${dataAte}&data_inicial=${dataDe}&limit=100&offset=${pagina}&status_solicitacao=${
    values.status_solicitacao
  }&tipo_solicitacao=${values.tipo_de_solicitacao}`;

  const OBJ_REQUEST = {
    headers: authToken,
    method: "GET"
  };
  return fetch(url, OBJ_REQUEST)
    .then(result => {
      return result.json();
    })
    .catch(error => {
      return error.json();
    });
};

export const getEvolucaoSolicitacoesDiretoriaRegional = () => {
  const url = `${API_URL}/diretoria-regional-solicitacoes/resumo-ano/`;
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

export const getResumoTotaisPorMesDiretoriaRegional = () => {
  const url = `${API_URL}/diretoria-regional-solicitacoes/resumo-mes/`;
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

export const getPedidosESolicitacoesFiltroDiretoriaRegional = (
  values,
  dataDe,
  dataAte
) => {
  const url = `${API_URL}/diretoria-regional-solicitacoes/pesquisa/${
    values.unidade_escolar
  }?tipo_solicitacao=${values.tipo_de_solicitacao}&status_solicitacao=${
    values.status_solicitacao
  }&data_inicial=${dataDe}&data_final=${dataAte}`;
  const OBJ_REQUEST = {
    headers: authToken,
    method: "GET"
  };
  return fetch(url, OBJ_REQUEST)
    .then(result => {
      return result.json();
    })
    .catch(error => {
      return error.json();
    });
};

export const getPedidosESolicitacoesFiltroPaginacaoDiretoriaRegional = (
  values,
  dataDe,
  dataAte,
  pagina
) => {
  const url = `${API_URL}/diretoria-regional-solicitacoes/pesquisa/${
    values.unidade_escolar
  }?data_final=${dataAte}&data_inicial=${dataDe}&limit=100&offset=${pagina}&status_solicitacao=${
    values.status_solicitacao
  }&tipo_solicitacao=${values.tipo_de_solicitacao}`;

  const OBJ_REQUEST = {
    headers: authToken,
    method: "GET"
  };
  return fetch(url, OBJ_REQUEST)
    .then(result => {
      return result.json();
    })
    .catch(error => {
      return error.json();
    });
};

export const getEvolucaoSolicitacoesCODAE = () => {
  const url = `${API_URL}/codae-solicitacoes/resumo-ano/`;
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

export const getResumoTotaisPorMesCODAE = () => {
  const url = `${API_URL}/codae-solicitacoes/resumo-mes/`;
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
