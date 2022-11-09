import axios from "./_base";

export const getEtapas = async () =>
  await axios.get("/cronogramas/opcoes-etapas/");

export const cadastraCronograma = async payload =>
  await axios.post("/cronogramas/", payload);

export const getRascunhos = async () =>
  await axios.get("/cronogramas/rascunhos/");
