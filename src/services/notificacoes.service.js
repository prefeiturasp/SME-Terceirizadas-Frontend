import axios from "./_base";

export const getNotificacoesGerais = async () =>
  await axios.get("/notificacoes/gerais/");

export const getPendenciasNaoResolvidas = async () =>
  await axios.get("/notificacoes/pendencias-nao-resolvidas/");

export const setNotificacaoMarcarDesmarcarLida = async payload =>
  await axios.put("/notificacoes/marcar-lido/", payload);
