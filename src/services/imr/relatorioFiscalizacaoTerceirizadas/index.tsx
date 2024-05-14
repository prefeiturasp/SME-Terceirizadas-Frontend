import axios from "../../_base";
import { API_URL } from "constants/config";
import { ErrorHandlerFunction } from "../../service-helpers";
import { NovoRelatorioVisitasFormInterface } from "components/screens/IMR/Terceirizadas/RelatorioFiscalizacaoTerceirizadas/NovoRelatorioVisitas/interfaces";
import {
  ResponseFormularioSupervisaoTiposOcorrenciasInterface,
  ResponsePeriodosDeVisitaInterface,
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
