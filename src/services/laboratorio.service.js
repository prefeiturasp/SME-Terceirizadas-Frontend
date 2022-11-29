import axios from "./_base";

export const getLaboratorio = async uuid =>
  await axios.get(`/laboratorios/${uuid}/`);

export const getListaLaboratorios = async () =>
  await axios.get("/laboratorios/lista-laboratorios/");

export const cadastraLaboratorio = async payload =>
  await axios.post("/laboratorios/", payload);
