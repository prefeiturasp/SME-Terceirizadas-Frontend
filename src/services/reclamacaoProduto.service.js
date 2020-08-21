import axios from "./_base";

export const CODAEAceitaReclamacao = async (uuid, params) =>
  await axios.patch(`/reclamacoes-produtos/${uuid}/codae-aceita/`, params);

export const CODAERecusaReclamacao = async (uuid, params) =>
  await axios.patch(`/reclamacoes-produtos/${uuid}/codae-recusa/`, params);

export const CODAEQuestionaTerceirizada = async (uuid, params) =>
  await axios.patch(`/reclamacoes-produtos/${uuid}/codae-questiona/`, params);

export const CODAERespondeReclamante = async (uuid, params) =>
  await axios.patch(`/reclamacoes-produtos/${uuid}/codae-responde/`, params);
