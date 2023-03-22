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

export const getListagemSolicitacaoAlteracaoCronograma = async params => {
  const url = `/solicitacao-de-alteracao-de-cronograma/`;
  return await axios.get(url, { params });
};

export const cronogramaAssina = async (uuid, password) => {
  const url = `/cronogramas/${uuid}/cronograma-assina/`;
  return await axios.patch(url, {
    password: password
  });
};

export const dinutreAssinaCronograma = async (uuid, password) => {
  console.log(uuid);
  const url = `/cronogramas/${uuid}/dinutre-assina/`;
  return await axios.patch(url, {
    password: password
  });
};

export const codaeAssinaCronograma = async (uuid, password) => {
  console.log(uuid);
  const url = `/cronogramas/${uuid}/codae-assina/`;
  return await axios.patch(url, {
    password: password
  });
};

export const getDashboardCronograma = async (params = null) =>
  await axios.get(`/cronogramas/dashboard/`, { params });

export const getDashboardCronogramaComFiltros = async params =>
  await axios.get(`/cronogramas/dashboard-com-filtro/`, { params });

export const getDashboardSolicitacoesAlteracao = async (params = null) =>
  await axios.get(`/solicitacao-de-alteracao-de-cronograma/dashboard/`, {
    params
  });
