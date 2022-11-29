import axios from "./_base";

export const getLaboratorios = async () => await axios.get("/laboratorios/");

export const getListaLaboratorios = async () =>
  await axios.get("/laboratorios/lista-laboratorios/");

export const cadastraLaboratorio = async payload =>
  await axios.post("/laboratorios/", payload);
