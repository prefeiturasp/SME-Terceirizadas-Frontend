import axios from "./_base";
import { saveAs } from "file-saver";

export const getNomesDistribuidores = async () =>
  await axios.get("/terceirizadas/lista-nomes-distribuidores/");

export const getNumerosRequisicoes = async () =>
  await axios.get("/solicitacao-remessa/lista-numeros/");

export const getRequisicoesDoFiltro = async queryparams => {
  let url = `/solicitacao-remessa/lista-requisicoes-para-envio/`;
  if (queryparams) url += "?" + queryparams + "&&param=01/";
  return await axios.get(url);
};

export const getRequisicoesListagem = async params => {
  const url = `/solicitacao-remessa/`;
  return await axios.get(url, { params });
};

export const getNomesUnidadesEscolares = async params => {
  const url = "/guias-da-requisicao/unidades-escolares/";
  return await axios.get(url, { params });
};

export const distribuidorConfirma = async uuid => {
  const url = `/solicitacao-remessa/${uuid}/distribuidor-confirma/`;
  return await axios.patch(url);
};

export const distribuidorConfirmaTodos = async () => {
  const url = `/solicitacao-remessa/distribuidor-confirma-todos/`;
  return await axios.patch(url);
};

export const getConsolidadoAlimentos = async uuid => {
  const url = `/solicitacao-remessa/${uuid}/consolidado-alimentos/`;
  return await axios.get(url);
};

export const distribuidorAltera = async payload => {
  const url = `/solicitacao-de-alteracao-de-requisicao/`;
  return await axios.post(url, payload);
};

export const gerarPDFDistribuidorSolicitacao = async uuid => {
  const url = `/solicitacao-remessa/${uuid}/gerar-pdf-distribuidor/`;
  return await axios.get(url);
};

export const gerarPDFDistribuidorSolicitacoes = async params => {
  const url = `/solicitacao-remessa/gerar-pdf-distribuidor-geral/`;
  return await axios.get(url, { params, responseType: "blob" });
};

export const gerarExcelSolicitacoes = async params => {
  const url = `/solicitacao-remessa/exporta-excel-visao-analitica/`;
  const { data } = await axios.get(url, { params, responseType: "blob" });
  saveAs(data, "visao_analitica.xlsx");
};

export const gerarPDFDistribuidorGuia = async uuid => {
  const url = `/guias-da-requisicao/${uuid}/gerar-pdf-distribuidor/`;
  const { data } = await axios.get(url, { responseType: "blob" });
  saveAs(data, "guia_de_remessa.pdf");
};

export const getListagemSolicitacaoAlteracao = async params => {
  const url = `/solicitacao-de-alteracao-de-requisicao/`;
  return await axios.get(url, { params });
};

export const dilogAceitaAlteracao = async (uuid, params) => {
  const url = `/solicitacao-de-alteracao-de-requisicao/${uuid}/dilog-aceita-alteracao/`;
  return await axios.patch(url, params);
};

export const dilogNegaAlteracao = async (uuid, params) => {
  const url = `/solicitacao-de-alteracao-de-requisicao/${uuid}/dilog-nega-alteracao/`;
  return await axios.patch(url, params);
};

export const getGuiasRemessaParaInsucesso = async params => {
  const url = `/guias-da-requisicao/lista-guias-para-insucesso/`;
  return await axios.get(url, { params });
};

export const getGuiasInconsistencias = async params => {
  const url = `/guias-da-requisicao/inconsistencias/`;
  return await axios.get(url, { params });
};

export const vinculaGuiasComEscolas = async params => {
  const url = `/guias-da-requisicao/vincula-guias/`;
  return await axios.patch(url, { params });
};

export const getGuiasEscola = async params => {
  const url = `/guias-da-requisicao/guias-escola/`;
  return await axios.get(url, { params });
};

export const getGuiaParaConferencia = async params => {
  const url = `/guias-da-requisicao/guia-para-conferencia/`;
  return await axios.get(url, { params });
};

export const getConferenciaParaEdicao = async params => {
  const url = `/conferencia-da-guia-com-ocorrencia/get-ultima-conferencia/`;
  return await axios.get(url, { params });
};

export const getReposicaoParaEdicao = async params => {
  const url = `/conferencia-da-guia-com-ocorrencia/get-ultima-reposicao/`;
  return await axios.get(url, { params });
};

export const recebeGuiaSemOcorrencia = async params => {
  const url = `/conferencia-da-guia/`;
  return await axios.post(url, params);
};

export const registraInsucessoDeEntrega = async params => {
  const url = `/insucesso-de-entrega/`;
  return await axios.post(url, params);
};

export const getGuiaParaInsucesso = async params => {
  const url = `/guias-da-requisicao/guia-para-insucesso/`;
  return await axios.get(url, { params });
};

export const recebeGuiaComOcorrencia = async params => {
  const url = `/conferencia-da-guia-com-ocorrencia/`;
  return await axios.post(url, params);
};

export const editaGuiaComOcorrencia = async payload => {
  const url = `/conferencia-da-guia-com-ocorrencia/${
    payload.uuid_conferencia
  }/`;
  return await axios.put(url, payload);
};

export const getEntregasDilog = async params => {
  const url = `/solicitacao-remessa/lista-requisicoes-confirmadas/`;
  return await axios.get(url, { params });
};

export const gerarExcelEntregas = async params => {
  const url = `/solicitacao-remessa/exporta-excel-visao-entregas/`;
  const { data } = await axios.get(url, { params, responseType: "blob" });
  saveAs(data, "relatorio_entregas.xlsx");
};

export const arquivaGuias = async payload => {
  const url = `/solicitacao-remessa/arquivar/`;
  return await axios.post(url, payload);
};

export const desarquivaGuias = async payload => {
  const url = `/solicitacao-remessa/desarquivar/`;
  return await axios.post(url, payload);
};

export const imprimirGuiaRemessa = async uuid => {
  const url = `/guias-da-requisicao/${uuid}/relatorio-guia-remessa/`;
  const { data } = await axios.get(url, { responseType: "blob" });
  saveAs(data, "guia_de_remessa.pdf");
};

export const imprimirGuiasDaSolicitacao = async uuid => {
  const url = `/solicitacao-remessa/${uuid}/relatorio-guias-da-requisicao/`;
  return await axios.get(url);
};

export const confirmaCancelamento = async payload => {
  const url = `/solicitacao-remessa/confirmar-cancelamento/`;
  return await axios.post(url, payload);
};
