import axios from "./_base";

export const getListaEmbalagens = async () =>
  await axios.get("/embalagens/lista-nomes-embalagens/");

export const cadastraEmbalagens = async payload =>
  await axios.post("/embalagens/", payload);
