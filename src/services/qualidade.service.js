import axios from "./_base";

export const getListaNomesEmbalagens = async () =>
  await axios.get("/embalagens/lista-nomes-embalagens/");

export const getEmbalagens = async () => await axios.get("/embalagens/");

export const getEmbalagem = async uuid =>
  await axios.get(`/embalagens/${uuid}/`);

export const cadastraEmbalagens = async payload =>
  await axios.post("/embalagens/", payload);

export const editaEmbalagem = async (payload, uuid) =>
  await axios.put(`/embalagens/${uuid}/`, payload);
