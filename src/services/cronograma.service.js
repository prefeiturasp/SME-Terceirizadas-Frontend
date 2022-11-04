import axios from "./_base";

export const getEtapas = async () =>
  await axios.get("/cronogramas/opcoes-etapas/");

export const cadastraCronograma = async payload =>
  await axios.post("/cronogramas/", payload);
