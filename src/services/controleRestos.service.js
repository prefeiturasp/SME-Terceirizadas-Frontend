import axios from "./_base";
import { ENDPOINT } from "../constants/shared";

export const consultaControleRestos = async (params) =>
  await axios.get(`/${ENDPOINT.CONTROLE_RESTOS}/`, { params });

export const cadastrarControleRestos = async (payload) =>
  await axios.post(`/${ENDPOINT.CONTROLE_RESTOS}/`, payload);

export const atualizarControleRestos = async (payload, uuid) =>
  axios.patch(`/${ENDPOINT.CONTROLE_RESTOS}/${uuid}/`, payload);

export const deletarControleRestos = async (uuid) =>
  axios.delete(`/${ENDPOINT.CONTROLE_RESTOS}/${uuid}/`);

export const consultaRelatorioControleRestos = async (params) =>
  await axios.get(`/${ENDPOINT.CONTROLE_RESTOS}/relatorio/`, { params });

export const gerarExcelRelatorioControleRestos = async (params) =>
  await axios.get(`/${ENDPOINT.CONTROLE_RESTOS}/relatorio/exportar-xlsx/`, {
    params,
  });
