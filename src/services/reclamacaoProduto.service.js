import axios from "./_base";

export const CODAEAceitaReclamacao = async (uuid, params) =>
  await axios.patch(`/reclamacoes-produtos/${uuid}/codae-aceita/`, params);

export const CODAERecusaReclamacao = async (uuid, params) =>
  await axios.patch(`/reclamacoes-produtos/${uuid}/codae-recusa/`, params);

export const CODAEQuestionaTerceirizada = async (uuid, params) =>
  await axios.patch(
    `/reclamacoes-produtos/${uuid}/codae-questiona-terceirizada/`,
    params
  );

export const CODAEQuestionaUE = async (uuid, params) =>
  await axios.patch(
    `/reclamacoes-produtos/${uuid}/codae-questiona-ue/`,
    params
  );

export const CODAERespondeReclamante = async (uuid, params) =>
  await axios.patch(`/reclamacoes-produtos/${uuid}/codae-responde/`, params);

export const CODAEPedeAnaliseSensorialProdutoReclamacao = (
  uuid,
  justificativa,
  uuidTerceirizada
) => {
  const url = `/reclamacoes-produtos/${uuid}/codae-pede-analise-sensorial/`;
  let status = 0;
  const params = JSON.stringify({ justificativa, uuidTerceirizada });
  return axios
    .patch(url, params)
    .then(res => {
      status = res.status;
      return res;
    })
    .then(data => {
      return { data: data, status: status };
    })
    .catch(error => {
      return error;
    });
};
