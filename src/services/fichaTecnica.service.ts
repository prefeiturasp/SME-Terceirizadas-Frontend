import {
  AnaliseFichaTecnicaPayload,
  FichaTecnicaPayload,
} from "components/screens/PreRecebimento/FichaTecnica/interfaces";
import axios from "./_base";
import {
  ResponseDadosCronogramaFichaTecnica,
  ResponseFichaTecnicaDetalhada,
  ResponseFichaTecnicaPraAnalise,
  ResponseFichasTecnicas,
  ResponseFichasTecnicasDashboard,
  ResponseFichasTecnicasPorStatusDashboard,
  ResponseFichasTecnicasSimples,
} from "interfaces/responses.interface";
import { FiltrosDashboardFichasTecnicas } from "interfaces/pre_recebimento.interface";
import { getMensagemDeErro } from "../helpers/statusErrors";
import { toastError } from "components/Shareable/Toast/dialogs";

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

export const getFichaTecnicaPraAnalise = async (
  uuid: string
): Promise<ResponseFichaTecnicaPraAnalise> =>
  await axios.get(`/ficha-tecnica/${uuid}/detalhar-com-analise/`);

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

// Service retorna vários status diferente dentro dos resultados, filtros são apenas strings
export const getDashboardFichasTecnicas = async (
  params: FiltrosDashboardFichasTecnicas = null
): Promise<ResponseFichasTecnicasDashboard> =>
  await axios.get(`/ficha-tecnica/dashboard/`, { params });

// Service retorna apenas um status nos resultados, filtros em formatos de array são transformados em parametros de URL
export const getDashboardFichasTecnicasPorStatus = async (
  params: URLSearchParams = null
): Promise<ResponseFichasTecnicasPorStatusDashboard> => {
  try {
    return await axios.get(`/ficha-tecnica/dashboard/`, { params });
  } catch (error) {
    toastError(getMensagemDeErro(error.response.status));
  }
};

export const getListaFichasTecnicasSimplesSemCronograma =
  async (): Promise<ResponseFichasTecnicasSimples> =>
    await axios.get(`/ficha-tecnica/lista-simples-sem-cronograma/`);

export const getDadosCronogramaFichaTecnica = async (
  uuid: string
): Promise<ResponseDadosCronogramaFichaTecnica> =>
  await axios.get(`/ficha-tecnica/${uuid}/dados-cronograma/`);

export const cadastraRascunhoAnaliseFichaTecnica = async (
  payload: AnaliseFichaTecnicaPayload,
  uuid: string
): Promise<ResponseFichaTecnicaPraAnalise> =>
  await axios.post(`/ficha-tecnica/${uuid}/rascunho-analise-gpcodae/`, payload);

export const editaRascunhoAnaliseFichaTecnica = async (
  payload: AnaliseFichaTecnicaPayload,
  uuid: string
): Promise<ResponseFichaTecnicaPraAnalise> =>
  await axios.put(`/ficha-tecnica/${uuid}/rascunho-analise-gpcodae/`, payload);

export const cadastraAnaliseFichaTecnica = async (
  payload: AnaliseFichaTecnicaPayload,
  uuid: string
): Promise<ResponseFichaTecnicaPraAnalise> =>
  await axios.post(`/ficha-tecnica/${uuid}/analise-gpcodae/`, payload);
