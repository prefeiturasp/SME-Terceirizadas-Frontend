import axios from "../../_base";
import { API_URL } from "constants/config";
import { ErrorHandlerFunction } from "../../service-helpers";
import { NovoRelatorioVisitasFormInterface } from "interfaces/imr.interface";
import {
  ResponseEquipamentoInterface,
  ResponseFormularioSupervisaoTiposOcorrenciasInterface,
  ResponseInsumoInterface,
  ResponseMobiliarioInterface,
  ResponsePeriodosDeVisitaInterface,
  ResponseReparoEAdaptacaoInterface,
  ResponseUtensilioCozinhaInterface,
  ResponseUtensilioMesaInterface,
} from "interfaces/responses.interface";

export const getPeriodosVisita = async () => {
  const url = `${API_URL}/imr/periodos-de-visita/`;
  const response: ResponsePeriodosDeVisitaInterface = await axios
    .get(url)
    .catch(ErrorHandlerFunction);
  if (response) {
    const data = { data: response.data, status: response.status };
    return data;
  }
};

export const createFormularioSupervisao = async (
  params: NovoRelatorioVisitasFormInterface
) => {
  const url = `${API_URL}/imr/formulario-supervisao/`;
  const response = await axios.post(url, params).catch(ErrorHandlerFunction);
  if (response) {
    const data = { data: response.data, status: response.status };
    return data;
  }
};

export const getTiposOcorrenciaPorEdital = async (params: {
  edital_uuid: string;
}) => {
  const url = `${API_URL}/imr/formulario-supervisao/tipos-ocorrencias/`;
  const response: ResponseFormularioSupervisaoTiposOcorrenciasInterface =
    await axios.get(url, { params }).catch(ErrorHandlerFunction);
  if (response) {
    const data = { data: response.data, status: response.status };
    return data;
  }
};

export const getUtensiliosCozinha = async () => {
  const url = `${API_URL}/imr/utensilios-cozinha/`;
  const response: ResponseUtensilioCozinhaInterface = await axios
    .get(url)
    .catch(ErrorHandlerFunction);
  if (response) {
    const data = { data: response.data, status: response.status };
    return data;
  }
};

export const getUtensiliosMesa = async () => {
  const url = `${API_URL}/imr/utensilios-mesa/`;
  const response: ResponseUtensilioMesaInterface = await axios
    .get(url)
    .catch(ErrorHandlerFunction);
  if (response) {
    const data = { data: response.data, status: response.status };
    return data;
  }
};

export const getEquipamentos = async () => {
  const url = `${API_URL}/imr/equipamentos/`;
  const response: ResponseEquipamentoInterface = await axios
    .get(url)
    .catch(ErrorHandlerFunction);
  if (response) {
    const data = { data: response.data, status: response.status };
    return data;
  }
};

export const getMobiliarios = async () => {
  const url = `${API_URL}/imr/mobiliarios/`;
  const response: ResponseMobiliarioInterface = await axios
    .get(url)
    .catch(ErrorHandlerFunction);
  if (response) {
    const data = { data: response.data, status: response.status };
    return data;
  }
};

export const getReparosEAdaptacoes = async () => {
  const url = `${API_URL}/imr/reparos-e-adaptacoes/`;
  const response: ResponseReparoEAdaptacaoInterface = await axios
    .get(url)
    .catch(ErrorHandlerFunction);
  if (response) {
    const data = { data: response.data, status: response.status };
    return data;
  }
};

export const getInsumos = async () => {
  const url = `${API_URL}/imr/insumos/`;
  const response: ResponseInsumoInterface = await axios
    .get(url)
    .catch(ErrorHandlerFunction);
  if (response) {
    const data = { data: response.data, status: response.status };
    return data;
  }
};
