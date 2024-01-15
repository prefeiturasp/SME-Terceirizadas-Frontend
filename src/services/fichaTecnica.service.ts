import { FichaTecnicaPayload } from "components/screens/PreRecebimento/FichaTecnica/interfaces";
import axios from "./_base";
import {
  ResponseFichaTecnicaDetalhada,
  ResponseFichasTecnicas,
} from "interfaces/responses.interface";

export const cadastraRascunhoFichaTecnica = async (
  payload: FichaTecnicaPayload
): Promise<ResponseFichaTecnicaDetalhada> =>
  await axios.post("/rascunho-ficha-tecnica/", payload);

export const editaRascunhoFichaTecnica = async (
  payload: FichaTecnicaPayload,
  uuid: string
): Promise<ResponseFichaTecnicaDetalhada> =>
  await axios.put(`/rascunho-ficha-tecnica/${uuid}/`, payload);

export const getFichaTecnica = async (
  uuid: string
): Promise<ResponseFichaTecnicaDetalhada> =>
  await axios.get(`/ficha-tecnica/${uuid}/`);

export const listarFichastecnicas = async (
  params: URLSearchParams
): Promise<ResponseFichasTecnicas> =>
  await axios.get("/ficha-tecnica/", { params });

export const cadastrarFichaTecnica = async (
  payload: FichaTecnicaPayload
): Promise<ResponseFichaTecnicaDetalhada> =>
  await axios.post("/ficha-tecnica/", payload);

export const cadastrarFichaTecnicaDoRascunho = async (
  payload: FichaTecnicaPayload,
  uuid: string
): Promise<ResponseFichaTecnicaDetalhada> =>
  await axios.put(`/ficha-tecnica/${uuid}/`, payload);
