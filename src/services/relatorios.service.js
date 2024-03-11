import { API_URL } from "../constants/config";
import axios from "./_base";
import { saveAs } from "file-saver";
import authService from "./auth";
import { ErrorHandlerFunction } from "./service-helpers";

const authToken = {
  Authorization: `JWT ${authService.getToken()}`,
  "Content-Type": "application/json",
};

export const getEvolucaoSolicitacoesEscola = () => {
  const url = `${API_URL}/escola-solicitacoes/resumo-ano/`;
  let status = 0;
  return fetch(url, {
    method: "GET",
    headers: authToken,
  })
    .then((res) => {
      status = res.status;
      return res.json();
    })
    .then((data) => {
      return { data: data, status: status };
    })
    .catch((error) => {
      return error.json();
    });
};

export const getResumoTotaisPorMesEscola = () => {
  const url = `${API_URL}/escola-solicitacoes/resumo-mes/`;
  let status = 0;
  return fetch(url, {
    method: "GET",
    headers: authToken,
  })
    .then((res) => {
      status = res.status;
      return res.json();
    })
    .then((data) => {
      return { data: data, status: status };
    })
    .catch((error) => {
      return error.json();
    });
};

export const getPedidosESolicitacoesFiltroEscola = (
  values,
  dataDe,
  dataAte
) => {
  const url = `${API_URL}/escola-solicitacoes/pesquisa/?tipo_solicitacao=${values.tipo_de_solicitacao}&status_solicitacao=${values.status_solicitacao}&data_inicial=${dataDe}&data_final=${dataAte}`;

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

export const getPedidosESolicitacoesFiltroPaginacaoEscola = (
  values,
  dataDe,
  dataAte,
  pagina
) => {
  const url = `${API_URL}/escola-solicitacoes/pesquisa?data_final=${dataAte}&data_inicial=${dataDe}&limit=100&offset=${pagina}&status_solicitacao=${values.status_solicitacao}&tipo_solicitacao=${values.tipo_de_solicitacao}`;

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

export const getEvolucaoSolicitacoesDiretoriaRegional = () => {
  const url = `${API_URL}/diretoria-regional-solicitacoes/resumo-ano/`;
  let status = 0;
  return fetch(url, {
    method: "GET",
    headers: authToken,
  })
    .then((res) => {
      status = res.status;
      return res.json();
    })
    .then((data) => {
      return { data: data, status: status };
    })
    .catch((error) => {
      return error.json();
    });
};

export const getResumoTotaisPorMesDiretoriaRegional = () => {
  const url = `${API_URL}/diretoria-regional-solicitacoes/resumo-mes/`;
  let status = 0;
  return fetch(url, {
    method: "GET",
    headers: authToken,
  })
    .then((res) => {
      status = res.status;
      return res.json();
    })
    .then((data) => {
      return { data: data, status: status };
    })
    .catch((error) => {
      return error.json();
    });
};

export const getPedidosESolicitacoesFiltroDiretoriaRegional = (
  values,
  dataDe,
  dataAte
) => {
  const url = `${API_URL}/diretoria-regional-solicitacoes/pesquisa/${values.unidade_escolar}/?tipo_solicitacao=${values.tipo_de_solicitacao}&status_solicitacao=${values.status_solicitacao}&data_inicial=${dataDe}&data_final=${dataAte}`;
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

export const getPedidosESolicitacoesFiltroPaginacaoDiretoriaRegional = (
  values,
  dataDe,
  dataAte,
  pagina
) => {
  const url = `${API_URL}/diretoria-regional-solicitacoes/pesquisa/${values.unidade_escolar}/?data_final=${dataAte}&data_inicial=${dataDe}&limit=100&offset=${pagina}&status_solicitacao=${values.status_solicitacao}&tipo_solicitacao=${values.tipo_de_solicitacao}`;

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

export const getEvolucaoSolicitacoesCODAE = () => {
  const url = `${API_URL}/codae-solicitacoes/resumo-ano/`;
  let status = 0;
  return fetch(url, {
    method: "GET",
    headers: authToken,
  })
    .then((res) => {
      status = res.status;
      return res.json();
    })
    .then((data) => {
      return { data: data, status: status };
    })
    .catch((error) => {
      return error.json();
    });
};

export const getResumoTotaisPorMesCODAE = () => {
  const url = `${API_URL}/codae-solicitacoes/resumo-mes/`;
  let status = 0;
  return fetch(url, {
    method: "GET",
    headers: authToken,
  })
    .then((res) => {
      status = res.status;
      return res.json();
    })
    .then((data) => {
      return { data: data, status: status };
    })
    .catch((error) => {
      return error.json();
    });
};

export const getPedidosESolicitacoesFiltroCODAE = (values, dataDe, dataAte) => {
  const url = `${API_URL}/codae-solicitacoes/pesquisa/${values.diretoria_regional}/${values.unidade_escolar}/?tipo_solicitacao=${values.tipo_de_solicitacao}&status_solicitacao=${values.status_solicitacao}&data_inicial=${dataDe}&data_final=${dataAte}`;
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

export const getPedidosESolicitacoesFiltroPaginacaoCODAE = (
  values,
  dataDe,
  dataAte,
  pagina
) => {
  const url = `${API_URL}/codae-solicitacoes/pesquisa/${values.diretoria_regional}/${values.unidade_escolar}/?data_final=${dataAte}&data_inicial=${dataDe}&limit=100&offset=${pagina}&status_solicitacao=${values.status_solicitacao}&tipo_solicitacao=${values.tipo_de_solicitacao}`;

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

export const getRelatorioReclamacao = async (params) => {
  const { data } = await axios.get(
    `${API_URL}/produtos/relatorio-reclamacao/`,
    {
      responseType: "blob",
      params,
    }
  );
  saveAs(data, "relatorio_reclamacao.pdf");
};

export const filtrarSolicitacoesAlimentacaoDRE = async (payload) => {
  const response = await axios
    .post(
      `${API_URL}/diretoria-regional-solicitacoes/filtrar-solicitacoes-ga/`,
      payload
    )
    .catch(ErrorHandlerFunction);
  if (response) {
    const data = { data: response.data, status: response.status };
    return data;
  }
};

export const filtrarSolicitacoesAlimentacaoEscola = async (payload) => {
  const response = await axios
    .post(`${API_URL}/escola-solicitacoes/filtrar-solicitacoes-ga/`, payload)
    .catch(ErrorHandlerFunction);
  if (response) {
    const data = { data: response.data, status: response.status };
    return data;
  }
};

export const filtrarSolicitacoesAlimentacaoCODAE = async (payload) => {
  const response = await axios
    .post(`${API_URL}/codae-solicitacoes/filtrar-solicitacoes-ga/`, payload)
    .catch(ErrorHandlerFunction);
  if (response) {
    const data = { data: response.data, status: response.status };
    return data;
  }
};

export const filtrarSolicitacoesAlimentacaoTerceirizadas = async (payload) => {
  const response = await axios
    .post(
      `${API_URL}/terceirizada-solicitacoes/filtrar-solicitacoes-ga/`,
      payload
    )
    .catch(ErrorHandlerFunction);
  if (response) {
    const data = { data: response.data, status: response.status };
    return data;
  }
};

export const gerarExcelRelatorioSolicitacoesAlimentacaoDRE = async (
  payload
) => {
  const url = `/diretoria-regional-solicitacoes/exportar-xlsx/`;
  const response = await axios.post(url, payload).catch(ErrorHandlerFunction);
  if (response) {
    const data = { data: response.data, status: response.status };
    return data;
  }
};

export const gerarExcelRelatorioSolicitacoesAlimentacaoEscola = async (
  payload
) => {
  const url = `/escola-solicitacoes/exportar-xlsx/`;
  const response = await axios.post(url, payload).catch(ErrorHandlerFunction);
  if (response) {
    const data = { data: response.data, status: response.status };
    return data;
  }
};

export const gerarExcelRelatorioSolicitacoesAlimentacaoCODAE = async (
  payload
) => {
  const url = `/codae-solicitacoes/exportar-xlsx/`;
  const response = await axios.post(url, payload).catch(ErrorHandlerFunction);
  if (response) {
    const data = { data: response.data, status: response.status };
    return data;
  }
};

export const gerarExcelRelatorioSolicitacoesAlimentacaoTerceirizadas = async (
  payload
) => {
  const url = `/terceirizada-solicitacoes/exportar-xlsx/`;
  const response = await axios.post(url, payload).catch(ErrorHandlerFunction);
  if (response) {
    const data = { data: response.data, status: response.status };
    return data;
  }
};

export const gerarPDFRelatorioSolicitacoesAlimentacaoDRE = async (payload) => {
  const url = `/diretoria-regional-solicitacoes/exportar-pdf/`;
  const response = await axios.post(url, payload).catch(ErrorHandlerFunction);
  if (response) {
    const data = { data: response.data, status: response.status };
    return data;
  }
};

export const gerarPDFRelatorioSolicitacoesAlimentacaoEscola = async (
  payload
) => {
  const url = `/escola-solicitacoes/exportar-pdf/`;
  const response = await axios.post(url, payload).catch(ErrorHandlerFunction);
  if (response) {
    const data = { data: response.data, status: response.status };
    return data;
  }
};

export const gerarPDFRelatorioSolicitacoesAlimentacaoCODAE = async (
  payload
) => {
  const url = `/codae-solicitacoes/exportar-pdf/`;
  const response = await axios.post(url, payload).catch(ErrorHandlerFunction);
  if (response) {
    const data = { data: response.data, status: response.status };
    return data;
  }
};

export const gerarPDFRelatorioSolicitacoesAlimentacaoTerceirizadas = async (
  payload
) => {
  const url = `/terceirizada-solicitacoes/exportar-pdf/`;
  const response = await axios.post(url, payload).catch(ErrorHandlerFunction);
  if (response) {
    const data = { data: response.data, status: response.status };
    return data;
  }
};

export const getSolicitacoesDetalhadas = async (params) => {
  const response = await axios
    .get(`${API_URL}/solicitacoes-genericas/solicitacoes-detalhadas/`, {
      params,
    })
    .catch(ErrorHandlerFunction);
  if (response) {
    const data = { data: response.data, status: response.status };
    return data;
  }
};

export const getTotalizadoresRelatorioSolicitacoesAlimentacao = async (
  payload
) => {
  const response = await axios
    .post(
      `${API_URL}/solicitacoes-genericas/filtrar-solicitacoes-ga-cards-totalizadores/`,
      payload
    )
    .catch(ErrorHandlerFunction);
  if (response) {
    const data = { data: response.data, status: response.status };
    return data;
  }
};

export const gerarPDFRelatorioAlunosMatriculados = async (params) => {
  const url = `/relatorio-alunos-matriculados/gerar-pdf/`;
  const response = await axios
    .get(url, { params: params })
    .catch(ErrorHandlerFunction);
  if (response) {
    const data = { data: response.data, status: response.status };
    return data;
  }
};

export const gerarXLSRelatorioAlunosMatriculados = async (params) => {
  const url = `/relatorio-alunos-matriculados/gerar-xlsx/`;
  const response = await axios
    .get(url, { params: params })
    .catch(ErrorHandlerFunction);
  if (response) {
    const data = { data: response.data, status: response.status };
    return data;
  }
};
