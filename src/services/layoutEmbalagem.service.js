import axios from "./_base";

export const cadastraLayoutEmbalagem = async (payload) =>
  await axios.post("/layouts-de-embalagem/", payload);

export const listarLayoutsEmbalagens = async (params) =>
  await axios.get("/layouts-de-embalagem/", { params });

export const detalharLayoutEmabalagem = async (uuid) =>
  await axios.get(`/layouts-de-embalagem/${uuid}/`);

export const getDashboardLayoutEmbalagem = async (params = null) =>
  await axios.get(`/layouts-de-embalagem/dashboard/`, { params });

export const corrigirLayoutEmbalagem = async (uuid, payload) =>
  await axios.patch(
    `/layouts-de-embalagem/${uuid}/fornecedor-realiza-correcao/`,
    payload
  );

export const analiseCodaeLayoutEmbalagem = async (uuid, payload) =>
  await axios.patch(
    `/layouts-de-embalagem/${uuid}/codae-aprova-ou-solicita-correcao/`,
    payload
  );

export const atualizacaoLayoutEmbalagem = async (uuid, payload) =>
  await axios.patch(`/layouts-de-embalagem/${uuid}/`, payload);
