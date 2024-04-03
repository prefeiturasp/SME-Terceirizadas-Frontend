import axios from "./_base";
import { ENDPOINT } from "../constants/shared";

export const getNomesTiposRecipiente = async () =>
  axios.get(`/${ENDPOINT.TIPOS_RECIPIENTE}/lista-nomes/`);

export const consultaTiposRecipiente = async (params) =>
  axios.get(`/${ENDPOINT.TIPOS_RECIPIENTE}/`, { params });

export const cadastrarTipoRecipiente = async (payload) =>
  axios.post(`/${ENDPOINT.TIPOS_RECIPIENTE}/`, payload);

export const atualizarTipoRecipiente = async (payload, uuid) =>
  axios.patch(`/${ENDPOINT.TIPOS_RECIPIENTE}/${uuid}/`, payload);

export const deletarTipoRecipiente = async (uuid) =>
  axios.delete(`/${ENDPOINT.TIPOS_RECIPIENTE}/${uuid}/`);
