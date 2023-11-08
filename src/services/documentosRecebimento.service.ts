import { DocumentosRecebimentoPayload } from "components/screens/PreRecebimento/DocumentosRecebimento/interfaces";
import axios from "./_base";
import {
  ResponseDocumentosPorStatusDashboard,
  ResponseDocumentosRecebimento,
  ResponseDocumentosRecebimentoDashboard,
  ResponseDocumentosRecebimentoDetalhado,
} from "interfaces/responses.interface";
import { FiltrosDashboardDocumentos } from "interfaces/pre_recebimento.interface";

export const cadastraDocumentoRecebimento = async (
  payload: DocumentosRecebimentoPayload
) => await axios.post("/documentos-de-recebimento/", payload);

export const detalharDocumentoRecebimento = async (
  uuid: string
): Promise<ResponseDocumentosRecebimentoDetalhado> =>
  await axios.get(`/documentos-de-recebimento/${uuid}/`);

export const listarDocumentosRecebimento = async (
  params: URLSearchParams
): Promise<ResponseDocumentosRecebimento> =>
  await axios.get("/documentos-de-recebimento/", { params });

export const getDashboardDocumentosRecebimento = async (
  params: FiltrosDashboardDocumentos = null
): Promise<ResponseDocumentosRecebimentoDashboard> =>
  await axios.get(`/documentos-de-recebimento/dashboard/`, { params });

export const getDashboardDocumentosRecebimentoPorStatus = async (
  params: URLSearchParams = null
): Promise<ResponseDocumentosPorStatusDashboard> =>
  await axios.get(`/documentos-de-recebimento/dashboard/`, { params });
