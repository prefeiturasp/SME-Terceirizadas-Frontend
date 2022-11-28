import axios from "./_base";

export const getListaLaboratorios = async () =>
  await axios.get("/laboratorios/lista-laboratorios/");

export const cadastraLaboratorio = async payload =>
  await axios.post("/laboratorios/", payload);
