import axios from "./_base";

export const getSolicitacoesDisponibilizadas = async () =>
  await axios.get("/solicitacao-remessa/");
