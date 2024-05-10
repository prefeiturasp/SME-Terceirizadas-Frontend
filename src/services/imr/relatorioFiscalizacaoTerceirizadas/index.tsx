import axios from "../../_base";
import { API_URL } from "constants/config";
import { ErrorHandlerFunction } from "../../service-helpers";
import { NovoRelatorioVisitasFormInterface } from "components/screens/IMR/Terceirizadas/RelatorioFiscalizacaoTerceirizadas/NovoRelatorioVisitas/interfaces";
import { ResponsePeriodosDeVisita } from "interfaces/responses.interface";

export const getPeriodosVisita = async () => {
  const url = `${API_URL}/imr/periodos-de-visita/`;
  const response: ResponsePeriodosDeVisita = await axios
    .get(url)
    .catch(ErrorHandlerFunction);
  if (response) {
    const data = { data: response.data, status: response.status };
    return data;
  }
};

export const createFormularioNutrisupervisao = async (
  params: NovoRelatorioVisitasFormInterface
) => {
  const url = `${API_URL}/imr/formulario-nutricionista/`;
  const response = await axios.post(url, params).catch(ErrorHandlerFunction);
  if (response) {
    const data = { data: response.data, status: response.status };
    return data;
  }
};
