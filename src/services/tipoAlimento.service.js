import axios from "./_base";
import { ENDPOINT } from "../constants/shared";

export const getNomesTiposAlimento = async () =>
  axios.get(`/${ENDPOINT.TIPOS_ALIMENTO}/lista-nomes/`);

export const consultaTiposAlimento = async (params) =>
  await axios.get(`/${ENDPOINT.TIPOS_ALIMENTO}/`, { params });

export const cadastrarTipoAlimento = async (payload) =>
  await axios.post(`/${ENDPOINT.TIPOS_ALIMENTO}/`, payload);

export const atualizarTipoAlimento = async (payload, uuid) =>
  await axios.patch(`/${ENDPOINT.TIPOS_ALIMENTO}/${uuid}/`, payload);

export const deletarTipoAlimento = async (uuid) =>
  await axios.delete(`/${ENDPOINT.TIPOS_ALIMENTO}/${uuid}/`);
