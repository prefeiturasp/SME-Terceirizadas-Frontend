import { DocumentosRecebimentoPayload } from "components/screens/PreRecebimento/DocumentosRecebimento/interfaces";
import axios from "./_base";
import {
  ResponseDocumentosRecebimento,
  ResponseDocumentosRecebimentoDetalhado,
} from "interfaces/responses.interface";

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
