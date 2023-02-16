import axios from "./_base";

export const getEtapas = async () =>
  await axios.get("/cronogramas/opcoes-etapas/");

export const getCronograma = async uuid =>
  await axios.get(`/cronogramas/${uuid}/`);

export const cadastraCronograma = async payload =>
  await axios.post("/cronogramas/", payload);

export const editaCronograma = async (payload, uuid) =>
  await axios.put(`/cronogramas/${uuid}/`, payload);

export const getRascunhos = async () =>
  await axios.get("/cronogramas/rascunhos/");

export const getListagemCronogramas = async params => {
  const url = `/cronogramas/`;
  return await axios.get(url, { params });
};

export const fornecedorAssinaCronograma = async (uuid, password) => {
  const url = `/cronogramas/${uuid}/fornecedor-assina-cronograma/`;
  return await axios.patch(url, {
    password: password
  });
};

export const cadastraSolicitacaoAlteracaoCronograma = async payload => {
  return await axios.post("solicitacao-de-alteracao-de-cronograma/", payload);
};

export const cronogramaAssina = async (uuid, password) => {
  const url = `/cronogramas/${uuid}/cronograma-assina/`;
  return await axios.patch(url, {
    password: password
  });
};

export const getDashboardCronograma = async () =>
  await axios.get(`/cronogramas/dashboard/`);
