import axios from "./_base";

export const cadastraLayoutEmbalagem = async (payload) =>
  await axios.post("/layouts-de-embalagem/", payload);

export const listarLayoutsEmbalagens = async (params) =>
  await axios.get("/layouts-de-embalagem/", { params });

export const detalharLayoutEmabalagem = async (uuid) =>
  await axios.get(`/layouts-de-embalagem/${uuid}/`);
