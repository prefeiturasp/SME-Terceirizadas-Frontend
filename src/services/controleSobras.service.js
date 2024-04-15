import axios from "./_base";
import { ENDPOINT } from "../constants/shared";

export const consultaControleSobras = async (params) =>
  await axios.get(`/${ENDPOINT.CONTROLE_SOBRAS}/`, { params });

export const cadastrarControleSobras = async (payload) =>
  await axios.post(`/${ENDPOINT.CONTROLE_SOBRAS}/`, payload);

export const consultaRelatorioControleSobras = async (params) =>
  await axios.get(`/${ENDPOINT.CONTROLE_SOBRAS}/relatorio/`, { params });

export const gerarExcelRelatorioControleSobras = async (params) =>
  await axios.get(`/${ENDPOINT.CONTROLE_SOBRAS}/relatorio/exportar-xlsx/`, {
    params,
  });
