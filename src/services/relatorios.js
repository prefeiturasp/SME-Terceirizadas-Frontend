import { VISAO } from "../constants/shared";
import { API_URL } from "../constants/config";
import axios from "./_base";
import { saveAs } from "file-saver";
import { converterDDMMYYYYparaYYYYMMDD } from "../helpers/utilities";
import authService from "./auth";
import { getPath as getInclusaoPath } from "services/inclusaoDeAlimentacao/helper";
import { getInclusaoNome } from "services/inclusaoDeAlimentacao/helper";
import { getPath as getAlteracaoPath } from "services/alteracaoDeCardapio/helper";
import { getAlteracaoNome } from "services/alteracaoDeCardapio/helper";
import { getPath as getKitLanchePath } from "services/kitLanche/helper";
import {
  getKitLancheNome,
  getKitLancheUnificadoNome,
} from "services/kitLanche/helper";
import {
  RELATORIO_QUANTITATIVO_DIAG_DIETA_ESP,
  RELATORIO_QUANTITATIVO_SOLIC_DIETA_ESP,
  RELATORIO_QUANTITATIVO_CLASSIFICACAO_DIETA_ESP,
  SOLICITACOES_DIETA_ESPECIAL,
} from "configs/constants";
import { ErrorHandlerFunction } from "./service-helpers";
import { TIPO_MOTIVO } from "./constants";

const authToken = {
  Authorization: `JWT ${authService.getToken()}`,
  "Content-Type": "application/json",
};

export const getRelatorioKitLancheUnificado = (uuid) => {
  const url = `${API_URL}/solicitacoes-kit-lanche-unificada/${uuid}/relatorio/`;
  fetch(url, {
    method: "GET",
    headers: authToken,
    responseType: "blob",
  })
    .then((response) => response.blob())
    .then((data) => {
      let a = document.createElement("a");
      const fileURL = URL.createObjectURL(data);
      const nomePdf = getKitLancheUnificadoNome();
      a.href = fileURL;
      a.download = `${nomePdf}.pdf`;
      a.click();
    });
};

export const getRelatorioAlteracaoCardapio = async (
  uuid,
  tipoSolicitacao,
  escola
) => {
  let url = `${getAlteracaoPath(tipoSolicitacao)}/${uuid}/relatorio/`;
  const { data } = await axios.get(url, {
    responseType: "blob",
  });
  const nomePdf = getAlteracaoNome(tipoSolicitacao, escola);
  saveAs(data, `${nomePdf}.pdf`);
};

export const getRelatorioDietaEspecial = async (uuid) => {
  const url = `/solicitacoes-dieta-especial/${uuid}/relatorio/`;
  const { data } = await axios.get(url, {
    responseType: "blob",
  });
  saveAs(data, "relatorio_dieta_especial.pdf");
};

export const getProtocoloDietaEspecial = async (uuid, dietaEspecial) => {
  const url = `${API_URL}/solicitacoes-dieta-especial/${uuid}/protocolo/`;
  const { data } = await axios.get(url, {
    responseType: "blob",
  });
  const nomePdf = "Protocolo " + dietaEspecial?.aluno?.nome;
  saveAs(data, `${nomePdf}.pdf`);
};

export const getRelatorioInclusaoAlimentacao = async (
  uuid,
  tipoSolicitacao,
  escola
) => {
  let url = `${getInclusaoPath(tipoSolicitacao)}/${uuid}/relatorio/`;
  const { data } = await axios.get(url, {
    responseType: "blob",
  });
  const nomePdf = getInclusaoNome(tipoSolicitacao, escola);
  saveAs(data, `${nomePdf}.pdf`);
};

export const getRelatorioInclusaoAlimentacaoCEMEI = async (
  uuid,
  tipoSolicitacao,
  escola
) => {
  const url = `${getInclusaoPath(tipoSolicitacao)}/${uuid}/relatorio/`;
  const { data } = await axios.get(url, {
    responseType: "blob",
  });
  const nomePdf = getInclusaoNome(tipoSolicitacao, escola);
  saveAs(data, `${nomePdf}.pdf`);
};

export const getRelatorioAlteracaoTipoAlimentacao = async (
  uuid,
  tipoSolicitacao,
  escola
) => {
  const url = `${getAlteracaoPath(tipoSolicitacao)}/${uuid}/relatorio/`;
  const { data } = await axios.get(url, {
    responseType: "blob",
  });
  const nomePdf = getAlteracaoNome(tipoSolicitacao, escola);
  saveAs(data, `${nomePdf}.pdf`);
};

export const getDetalheKitLancheAvulso = (uuid, tipoSolicitacao, escola) => {
  const url = `${getKitLanchePath(tipoSolicitacao)}/${uuid}/relatorio/`;
  fetch(url, {
    method: "GET",
    headers: authToken,
    responseType: "blob",
  })
    .then((response) => response.blob())
    .then((data) => {
      let a = document.createElement("a");
      const fileURL = URL.createObjectURL(data);
      const nomePdf = getKitLancheNome(tipoSolicitacao, escola);
      a.href = fileURL;
      a.download = `${nomePdf}.pdf`;
      a.click();
    });
};

export const getRelatorioProduto = ({ uuid, id_externo }) => {
  const url = `${API_URL}/produtos/${uuid}/relatorio/`;
  fetch(url, {
    method: "GET",
    headers: authToken,
    responseType: "blob",
  })
    .then((response) => response.blob())
    .then((data) => {
      let a = document.createElement("a");
      const fileURL = URL.createObjectURL(data);
      a.href = fileURL;
      a.download = `relatorio_produto_${id_externo}.pdf`;
      a.click();
    });
};

export const getDetalheInversaoCardapio = async (uuid, escola) => {
  const url = `${API_URL}/inversoes-dia-cardapio/${uuid}/relatorio/`;
  const { data } = await axios.get(url, {
    responseType: "blob",
  });
  const escolaLowerCase = escola.toLowerCase().replace(/\s/g, "_");
  const nomePdf = "inversao_" + escolaLowerCase;
  saveAs(data, `${nomePdf}.pdf`);
};

export const imprimeRelatorioSuspensaoAlimentacao = async (
  uuid,
  escola,
  ehCei = false
) => {
  let url = `/grupos-suspensoes-alimentacao/${uuid}/relatorio/`;
  if (ehCei) url = `/suspensao-alimentacao-de-cei/${uuid}/relatorio/`;
  const { data } = await axios.get(url, {
    responseType: "blob",
  });
  const escolaLowerCase = escola.toLowerCase().replace(/\s/g, "_");
  const nomePdf = "inversao_" + escolaLowerCase;
  saveAs(data, `${nomePdf}.pdf`);
};

export const getRelatorioFiltroPorPeriodo = (filtro, visao) => {
  let endpoint = "";
  let filtroExtra = "";
  let escolaUUID = "";
  let diretoriaRegionalUUID = "";
  switch (visao) {
    case VISAO.ESCOLA:
      endpoint = "escola-solicitacoes";
      break;
    case VISAO.DIRETORIA_REGIONAL:
      endpoint = "diretoria-regional-solicitacoes";
      escolaUUID = filtro.unidade_escolar;
      filtroExtra = escolaUUID;
      break;
    case VISAO.CODAE:
      endpoint = "codae-solicitacoes";
      escolaUUID = filtro.unidade_escolar;
      diretoriaRegionalUUID = filtro.diretoria_regional;
      filtroExtra = `${diretoriaRegionalUUID}/${escolaUUID}/`;
      break;
    default:
      endpoint = "escola-solicitacoes";
      break;
  }
  const url = `${API_URL}/${endpoint}/relatorio-periodo/${filtroExtra}?tipo_solicitacao=${
    filtro.tipo_de_solicitacao
  }&data_inicial=${converterDDMMYYYYparaYYYYMMDD(
    filtro.data_de
  )}&data_final=${converterDDMMYYYYparaYYYYMMDD(
    filtro.data_ate
  )}&status_solicitacao=${filtro.status_solicitacao}/`;

  fetch(url, {
    method: "GET",
    headers: authToken,
    responseType: "blob",
  })
    .then((response) => response.blob())
    .then((data) => {
      let a = document.createElement("a");
      const fileURL = URL.createObjectURL(data);
      a.href = fileURL;
      a.download = `filtro-por-periodo-${visao}.pdf`;
      a.click();
    });
};

export const getRelatorioResumoMesAno = (visao) => {
  let endpoint = "";
  switch (visao) {
    case VISAO.ESCOLA:
      endpoint = "escola-solicitacoes";
      break;
    case VISAO.DIRETORIA_REGIONAL:
      endpoint = "diretoria-regional-solicitacoes";
      break;
    case VISAO.CODAE:
      endpoint = "codae-solicitacoes";
      break;
    default:
      endpoint = "escola-solicitacoes";
      break;
  }
  const url = `${API_URL}/${endpoint}/relatorio-resumo-mes-ano/`;

  fetch(url, {
    method: "GET",
    headers: authToken,
    responseType: "blob",
  })
    .then((response) => response.blob())
    .then((data) => {
      let a = document.createElement("a");
      const fileURL = URL.createObjectURL(data);
      a.href = fileURL;
      a.download = `resumo-mes-ano-${visao}.pdf`;
      a.click();
    });
};

export const getRelatorioProdutoAnaliseSensorial = ({ uuid, id_externo }) => {
  const url = `${API_URL}/produtos/${uuid}/relatorio-analise-sensorial/`;
  fetch(url, {
    method: "GET",
    headers: authToken,
    responseType: "blob",
  })
    .then((response) => response.blob())
    .then((data) => {
      let a = document.createElement("a");
      const fileURL = URL.createObjectURL(data);
      a.href = fileURL;
      a.download = `relatorio_produto_${id_externo}.pdf`;
      a.click();
    });
};

export const getRelatorioProdutoAnaliseSensorialRecebimento = ({
  uuid,
  id_externo,
}) => {
  const url = `${API_URL}/produtos/${uuid}/relatorio-analise-sensorial-recebimento/`;
  fetch(url, {
    method: "GET",
    headers: authToken,
    responseType: "blob",
  })
    .then((response) => response.blob())
    .then((data) => {
      let a = document.createElement("a");
      const fileURL = URL.createObjectURL(data);
      a.href = fileURL;
      a.download = `relatorio_produto_${id_externo}.pdf`;
      a.click();
    });
};

export const getRelatorioEmAnaliseSensorial = async (params) => {
  const { data } = await axios.get(
    `${API_URL}/produtos/relatorio-em-analise-sensorial/`,
    { params, responseType: "blob" }
  );
  saveAs(data, "relatorio_analise_sensorial.pdf");
};

export const getRelatorioProdutoSuspenso = async (params) => {
  const { data } = await axios.get(
    `${API_URL}/produtos/relatorio-produto-suspenso/`,
    { params, responseType: "blob" }
  );
  saveAs(data, "relatorio_produto_suspenso.pdf");
};

export const imprimeRelatorioQuantitativoSolicDietaEsp = async (payload) => {
  const { data } = await axios.post(
    `/${SOLICITACOES_DIETA_ESPECIAL}/imprime-${RELATORIO_QUANTITATIVO_SOLIC_DIETA_ESP}/`,
    payload,
    {
      responseType: "blob",
    }
  );
  saveAs(data, "relatorio_quantitativo_solicitacoes_dieta_especial.pdf");
};

export const imprimeRelatorioQuantitativoClassificacaoDietaEsp = async (
  payload
) => {
  const { data } = await axios.post(
    `/${SOLICITACOES_DIETA_ESPECIAL}/imprime-${RELATORIO_QUANTITATIVO_CLASSIFICACAO_DIETA_ESP}/`,
    payload,
    {
      responseType: "blob",
    }
  );
  saveAs(data, "relatorio_quantitativo_classificacao_dieta_especial.pdf");
};

export const imprimeRelatorioQuantitativoDiagDietaEsp = async (payload) => {
  let url = `/${SOLICITACOES_DIETA_ESPECIAL}/imprime-${RELATORIO_QUANTITATIVO_DIAG_DIETA_ESP}/`;
  if (payload.somente_dietas_ativas) {
    url += "somente-dietas-ativas/";
  }
  const { data } = await axios.post(url, payload, { responseType: "blob" });
  saveAs(data, "relatorio_quantitativo_diagnostico_dieta_especial.pdf");
};

export const imprimeRelatorioDietaEspecial = async (filtros, params) => {
  const response = await axios
    .post(
      `${SOLICITACOES_DIETA_ESPECIAL}/imprime-relatorio-dieta-especial/`,
      filtros,
      { params: params }
    )
    .catch(ErrorHandlerFunction);
  if (response) {
    const data = { data: response.data, status: response.status };
    return data;
  }
};

export const getMotivosDREnaoValida = async () => {
  // escola
  const response = await axios
    .get(`/${TIPO_MOTIVO.DRE_NAO_VALIDA}/`)
    .catch(ErrorHandlerFunction);
  if (response) {
    const data = { data: response.data, status: response.status };
    return data;
  }
};

export const getRelatorioKitLancheCEMEI = async (
  tipoSolicitacao,
  uuid,
  escola
) => {
  const url = `/solicitacao-kit-lanche-cemei/${uuid}/relatorio/`;
  const { data } = await axios.get(url, {
    responseType: "blob",
  });
  const nomePdf = getKitLancheNome(tipoSolicitacao, escola);
  saveAs(data, `${nomePdf}.pdf`);
};

export const medicaoInicialExportarOcorrenciasPDF = async (url) => {
  const { data } = await axios.get(`${url}`, {
    responseType: "blob",
  });
  saveAs(data, "ocorrencias_medicao_inicial.pdf");
};

export const medicaoInicialExportarOcorrenciasXLSX = async (url) => {
  const { data } = await axios.get(`${url}`, {
    responseType: "blob",
  });
  saveAs(data, "ocorrencias_medicao_inicial.xlsx");
};

export const documentoAnaliseSensorial = async (url) => {
  const { data } = await axios.get(`${url}`, {
    responseType: "blob",
  });
  const extensao = url.split(".").pop();
  saveAs(data, `resposta_analise_sensorial.${extensao}`);
};

export const relatorioMedicaoInicialPDF = async (uuid) => {
  const url = `medicao-inicial/solicitacao-medicao-inicial/relatorio-pdf/`;
  const response = await axios
    .get(url, { params: { uuid: uuid } })
    .catch(ErrorHandlerFunction);
  if (response) {
    const data = { data: response.data, status: response.status };
    return data;
  }
};

export const relatorioUnificadoMedicaoInicialPDF = async (payload) => {
  const url =
    "medicao-inicial/solicitacao-medicao-inicial/relatorio-unificado/";
  return await axios.get(url, { params: payload });
};

export const relatorioConsolidadoMedicaoInicialXLSX = async (payload) => {
  const url =
    "medicao-inicial/solicitacao-medicao-inicial/relatorio-consolidado/exportar-xlsx/";
  return await axios.get(url, { params: payload });
};
