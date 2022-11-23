import axios from "./_base";

export const getEtapas = async () =>
  await axios.get("/cronogramas/opcoes-etapas/");

export const getDetalharCronograma = async uuid =>
  await axios.get(`/cronogramas/${uuid}/`);

export const getCronograma = async uuid =>
  await axios.get(`/cronogramas/${uuid}/`);

export const cadastraCronograma = async payload =>
  await axios.post("/cronogramas/", payload);

export const editaCronograma = async (payload, uuid) =>
  await axios.put(`/cronogramas/${uuid}/`, payload);

export const getRascunhos = async () =>
  await axios.get("/cronogramas/rascunhos/");

export const getListagemCronogramas = async params => {
  const url = `/cronogramas/`;
  return await axios.get(url, { params });
};
