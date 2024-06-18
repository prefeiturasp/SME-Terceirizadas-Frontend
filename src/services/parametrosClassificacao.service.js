import axios from "./_base";
import { ENDPOINT } from "../constants/shared";

export const consultaParametrosClassificacao = async () =>
  await axios.get(`/${ENDPOINT.PARAMETROS_CLASSIFICACAO}/`);

export const cadastrarParametrosClassificacao = async (payload) =>
  await axios.post(`/${ENDPOINT.PARAMETROS_CLASSIFICACAO}/`, payload);

export const atualizarParametrosClassificacao = async (payload, uuid) =>
  await axios.patch(`/${ENDPOINT.PARAMETROS_CLASSIFICACAO}/${uuid}/`, payload);

export const deletarParametrosClassificacao = async (uuid) =>
  await axios.delete(`/${ENDPOINT.PARAMETROS_CLASSIFICACAO}/${uuid}/`);
