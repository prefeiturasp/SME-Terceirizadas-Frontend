import axios from "../../_base";
import { API_URL } from "constants/config";
import { ErrorHandlerFunction } from "../../service-helpers";
import { FiltrosRelatoriosVisitasInterface } from "interfaces/imr.interface";

export const getDashboardPainelGerencialSupervisao = async (
  params: FiltrosRelatoriosVisitasInterface
) => {
  const url = `${API_URL}/imr/formulario-supervisao/dashboard/`;
  const response = await axios.get(url, { params }).catch(ErrorHandlerFunction);
  if (response) {
    const data = { data: response.data, status: response.status };
    return data;
  }
};
