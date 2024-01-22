import { FichaTecnicaPayload } from "components/screens/PreRecebimento/FichaTecnica/interfaces";
import axios from "./_base";
import {
  ResponseFichaTecnicaDetalhada,
  ResponseFichasTecnicas,
  ResponseFichasTecnicasDashboard,
  ResponseFichasTecnicasPorStatusDashboard,
  ResponseFichasTecnicasSimples,
} from "interfaces/responses.interface";
import { FiltrosDashboardFichasTecnicas } from "interfaces/pre_recebimento.interface";

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

// Service retorna vários status diferente dentro dos resultados, filtros são apenas strings
export const getDashboardFichasTecnicas = async (
  params: FiltrosDashboardFichasTecnicas = null
): Promise<ResponseFichasTecnicasDashboard> =>
  await axios.get(`/ficha-tecnica/dashboard/`, { params });

// Service retorna apenas um status nos resultados, filtros em formatos de array são transformados em parametros de URL
export const getDashboardFichasTecnicasPorStatus = async (
  params: URLSearchParams = null
): Promise<ResponseFichasTecnicasPorStatusDashboard> =>
  await axios.get(`/ficha-tecnica/dashboard/`, { params });

export const getListaSimplesSemCronograma =
  async (): Promise<ResponseFichasTecnicasSimples> =>
    await axios.get(`/ficha-tecnica/lista-simples-sem-cronograma/`);
