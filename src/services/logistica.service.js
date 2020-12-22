import axios from "./_base";

export const getNomesDistribuidores = async () =>
  await axios.get("/terceirizadas/lista-nomes-distribuidores/");

export const getNumerosRequisicoes = async () =>
  await axios.get("/solicitacao-remessa/lista-numeros/");

export const getRequisicoesDoFiltro = async queryparams => {
  let url = `/solicitacao-remessa/lista-requisicoes-para-envio/`;
  if (queryparams) url += "?" + queryparams + "&&param=01/";
  return await axios.get(url);
};

export const getRequisicoesDistribuidor = async params => {
  const url = `/solicitacao-remessa/consulta-requisicoes-distribuidor/`;
  return await axios.get(url, { params });
};

export const getRequisicoesDilog = async params => {
  const url = `/solicitacao-remessa/`;
  return await axios.get(url, { params });
};

export const getNomesUnidadesEscolares = async params => {
  const url = "/guias-da-requisicao/unidades-escolares/";
  return await axios.get(url, { params });
};
