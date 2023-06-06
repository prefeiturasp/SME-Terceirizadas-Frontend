import axios from "../_base";
import { ErrorHandlerFunction } from "services/service-helpers";

export const getTiposDeContagemAlimentacao = async () =>
  axios.get("medicao-inicial/tipo-contagem-alimentacao/");

export const getSolicitacaoMedicaoInicial = async params => {
  const url = `medicao-inicial/solicitacao-medicao-inicial/`;
  const response = await axios.get(url, { params }).catch(ErrorHandlerFunction);
  if (response) {
    const data = { data: response.data };
    return data;
  }
};

export const setSolicitacaoMedicaoInicial = async payload => {
  const url = `medicao-inicial/solicitacao-medicao-inicial/`;
  const response = await axios.post(url, payload).catch(ErrorHandlerFunction);
  if (response) {
    const data = { data: response.data, status: response.status };
    return data;
  }
};

export const updateSolicitacaoMedicaoInicial = async (uuid, params) => {
  const url = `medicao-inicial/solicitacao-medicao-inicial/${uuid}/`;
  const headers = { "content-type": "multipart/form-data" };
  const response = await axios
    .patch(url, params, {
      headers: headers
    })
    .catch(ErrorHandlerFunction);
  if (response) {
    const data = { data: response.data, status: response.status };
    return data;
  }
};

export const updateOcorrenciaSolicitacaoMedicaoInicial = async (
  uuid,
  params
) => {
  const url = `medicao-inicial/solicitacao-medicao-inicial/${uuid}/ue-atualiza-ocorrencia/`;
  const headers = { "content-type": "multipart/form-data" };
  const response = await axios
    .patch(url, params, {
      headers: headers
    })
    .catch(ErrorHandlerFunction);
  if (response) {
    const data = { data: response.data, status: response.status };
    return data;
  }
};

export const retrieveSolicitacaoMedicaoInicial = async uuid => {
  const url = `medicao-inicial/solicitacao-medicao-inicial/${uuid}/`;
  const response = await axios.get(url).catch(ErrorHandlerFunction);
  if (response) {
    const data = { data: response.data, status: response.status };
    return data;
  }
};

export const getPeriodosGruposMedicao = async params => {
  const url = `medicao-inicial/solicitacao-medicao-inicial/periodos-grupos-medicao/`;
  const response = await axios.get(url, { params }).catch(ErrorHandlerFunction);
  if (response) {
    const data = { data: response.data, status: response.status };
    return data;
  }
};

export const dreAprovaMedicao = async uuid => {
  const url = `medicao-inicial/medicao/${uuid}/dre-aprova-medicao/`;
  const response = await axios.patch(url).catch(ErrorHandlerFunction);
  if (response) {
    const data = { data: response.data, status: response.status };
    return data;
  }
};

export const drePedeCorrecaMedicao = async (uuid, params) => {
  const url = `medicao-inicial/medicao/${uuid}/dre-pede-correcao-medicao/`;
  const response = await axios.patch(url, params).catch(ErrorHandlerFunction);
  if (response) {
    const data = { data: response.data, status: response.status };
    return data;
  }
};

export const escolaCorrigeMedicao = async (uuid, params) => {
  const url = `medicao-inicial/medicao/${uuid}/escola-corrige-medicao/`;
  const response = await axios.patch(url, params).catch(ErrorHandlerFunction);
  if (response) {
    const data = { data: response.data, status: response.status };
    return data;
  }
};

export const getQuantidadeAlimentacoesLancadasPeriodoGrupo = async params => {
  const url = `medicao-inicial/solicitacao-medicao-inicial/quantidades-alimentacoes-lancadas-periodo-grupo/`;
  const response = await axios.get(url, { params }).catch(ErrorHandlerFunction);
  if (response) {
    const data = { data: response.data, status: response.status };
    return data;
  }
};

export const drePedeCorrecaoOcorrencia = async (uuid, params) => {
  const url = `medicao-inicial/ocorrencia/${uuid}/dre-pede-correcao-ocorrencia/`;
  const response = await axios.patch(url, params).catch(ErrorHandlerFunction);
  if (response) {
    const data = { data: response.data, status: response.status };
    return data;
  }
};

export const drePedeAprovacaoOcorrencia = async uuid => {
  const url = `medicao-inicial/ocorrencia/${uuid}/dre-aprova-ocorrencia/`;
  const response = await axios.patch(url).catch(ErrorHandlerFunction);
  if (response) {
    const data = { data: response.data, status: response.status };
    return data;
  }
};

export const dreAprovaSolicitacaoMedicao = async uuid => {
  const url = `medicao-inicial/solicitacao-medicao-inicial/${uuid}/dre-aprova-solicitacao-medicao/`;
  const response = await axios.patch(url).catch(ErrorHandlerFunction);
  if (response) {
    const data = { data: response.data, status: response.status };
    return data;
  }
};

export const dreSolicitaCorrecaoUE = async uuid => {
  const url = `medicao-inicial/solicitacao-medicao-inicial/${uuid}/dre-solicita-correcao-medicao/`;
  const response = await axios.patch(url).catch(ErrorHandlerFunction);
  if (response) {
    const data = { data: response.data, status: response.status };
    return data;
  }
};
