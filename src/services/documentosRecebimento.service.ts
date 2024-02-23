import {
  AnaliseDocumentoPayload,
  DocumentosRecebimentoPayload,
  CorrecaoDocumentoPayload,
} from "components/screens/PreRecebimento/DocumentosRecebimento/interfaces";
import axios from "./_base";
import {
  ResponseDocumentosPorStatusDashboard,
  ResponseDocumentosRecebimento,
  ResponseDocumentosRecebimentoDashboard,
  ResponseDocumentosRecebimentoDetalhado,
  ResponseDocumentosRecebimentoParaAnalise,
  ResponseDownloadArquivoLaudoAssinado,
} from "interfaces/responses.interface";
import { FiltrosDashboardDocumentos } from "interfaces/pre_recebimento.interface";
import { getMensagemDeErro } from "../helpers/statusErrors";
import { toastError } from "../components/Shareable/Toast/dialogs";

export const cadastraDocumentoRecebimento = async (
  payload: DocumentosRecebimentoPayload
) => await axios.post("/documentos-de-recebimento/", payload);

export const detalharDocumentoRecebimento = async (
  uuid: string
): Promise<ResponseDocumentosRecebimentoDetalhado> => {
  try {
    return await axios.get(`/documentos-de-recebimento/${uuid}/`);
  } catch (error) {
    toastError(getMensagemDeErro(error.response.status));
  }
};

export const detalharDocumentoParaAnalise = async (
  uuid: string
): Promise<ResponseDocumentosRecebimentoParaAnalise> => {
  try {
    return await axios.get(`/documentos-de-recebimento/${uuid}/`);
  } catch (error) {
    toastError(getMensagemDeErro(error.response.status));
  }
};

export const listarDocumentosRecebimento = async (
  params: URLSearchParams
): Promise<ResponseDocumentosRecebimento> => {
  try {
    return await axios.get("/documentos-de-recebimento/", { params });
  } catch (error) {
    toastError(getMensagemDeErro(error.response.status));
  }
};

// Service retorna vários status diferente dentro dos resultados, filtros são apenas strings
export const getDashboardDocumentosRecebimento = async (
  params: FiltrosDashboardDocumentos = null
): Promise<ResponseDocumentosRecebimentoDashboard> => {
  try {
    return await axios.get(`/documentos-de-recebimento/dashboard/`, { params });
  } catch (error) {
    toastError(getMensagemDeErro(error.response.status));
  }
};

// Service retorna apenas um status nos resultados, filtros em formatos de array são transformados em parametros de URL
export const getDashboardDocumentosRecebimentoPorStatus = async (
  params: URLSearchParams = null
): Promise<ResponseDocumentosPorStatusDashboard> => {
  try {
    return await axios.get(`/documentos-de-recebimento/dashboard/`, { params });
  } catch (error) {
    toastError(getMensagemDeErro(error.response.status));
  }
};

export const analisaDocumentoRecebimentoRascunho = async (
  payload: AnaliseDocumentoPayload,
  uuid: string
) =>
  await axios.patch(
    `/documentos-de-recebimento/${uuid}/analise-documentos-rascunho/`,
    payload
  );

export const analisaDocumentoRecebimento = async (
  payload: AnaliseDocumentoPayload,
  uuid: string
) =>
  await axios.patch(
    `/documentos-de-recebimento/${uuid}/analise-documentos/`,
    payload
  );

export const corrigirDocumentoRecebimento = async (
  payload: CorrecaoDocumentoPayload,
  uuid: string
) =>
  await axios.patch(
    `/documentos-de-recebimento/${uuid}/corrigir-documentos/`,
    payload
  );

export const downloadArquivoLaudoAssinado = async (
  uuid: string
): Promise<ResponseDownloadArquivoLaudoAssinado> =>
  await axios.get(
    `/documentos-de-recebimento/${uuid}/download-laudo-assinado/`,
    { responseType: "blob" }
  );
