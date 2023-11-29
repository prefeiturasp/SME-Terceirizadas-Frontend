import { FichaTecnicaPayload } from "components/screens/PreRecebimento/FichaTecnica/interfaces";
import axios from "./_base";
import { ResponseFichaTecnica } from "interfaces/responses.interface";

export const cadastraRascunhoFichaTecnica = async (
  payload: FichaTecnicaPayload
): Promise<ResponseFichaTecnica> =>
  await axios.post("/rascunho-ficha-tecnica/", payload);

export const editaRascunhoFichaTecnica = async (
  payload: FichaTecnicaPayload,
  uuid: string
): Promise<ResponseFichaTecnica> =>
  await axios.put(`/rascunho-ficha-tecnica/${uuid}/`, payload);

export const getFichaTecnica = async (
  uuid: string
): Promise<ResponseFichaTecnica> => await axios.get(`/ficha-tecnica/${uuid}/`);
