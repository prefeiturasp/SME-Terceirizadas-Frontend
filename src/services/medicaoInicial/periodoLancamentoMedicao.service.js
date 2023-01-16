import axios from "../_base";
import { ErrorHandlerFunction } from "services/service-helpers";

export const getCategoriasDeMedicao = async () =>
  axios.get("medicao-inicial/categorias-medicao/");

export const setPeriodoLancamento = async payload => {
  const url = "medicao-inicial/medicao/";
  const response = await axios.post(url, payload).catch(ErrorHandlerFunction);
  if (response) {
    const data = { data: response.data, status: response.status };
    return data;
  }
};

export const getValoresPeriodosLancamentos = async params => {
  const url = "medicao-inicial/valores-medicao/";
  const response = await axios.get(url, { params }).catch(ErrorHandlerFunction);
  if (response) {
    const data = { data: response.data };
    return data;
  }
};

export const deleteObservacaoValoresPeriodosLancamentos = async uuid => {
  const url = `medicao-inicial/valores-medicao/${uuid}/`;
  const response = await axios.delete(url).catch(ErrorHandlerFunction);
  if (response) {
    const data = { data: response.data, status: response.status };
    return data;
  }
};

export const updateValoresPeriodosLancamentos = async (uuid, params) => {
  const url = `medicao-inicial/medicao/${uuid}/`;
  const response = await axios.patch(url, params).catch(ErrorHandlerFunction);
  if (response) {
    const data = { data: response.data, status: response.status };
    return data;
  }
};

export const getMatriculadosPeriodo = async params => {
  const url = "matriculados-no-mes/";
  const response = await axios.get(url, { params }).catch(ErrorHandlerFunction);
  if (response) {
    const data = { data: response.data };
    return data;
  }
};

export const getDiasCalendario = async params => {
  const url = "dias-calendario/";
  const response = await axios.get(url, { params }).catch(ErrorHandlerFunction);
  if (response) {
    const data = { data: response.data };
    return data;
  }
};

export const getLogDietasAutorizadasPeriodo = async params => {
  const url = "log-quantidade-dietas-autorizadas/";
  const response = await axios.get(url, { params }).catch(ErrorHandlerFunction);
  if (response) {
    const data = { data: response.data };
    return data;
  }
};

export const getSolicitacoesInclusoesAutorizadasEscola = async params => {
  const url = "escola-solicitacoes/inclusoes-autorizadas/";
  const response = await axios.get(url, { params }).catch(ErrorHandlerFunction);
  if (response) {
    const data = { data: response.data, status: response.status };
    return data;
  }
};
