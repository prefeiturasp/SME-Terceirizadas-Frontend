import axios from "../../_base";
import { API_URL } from "constants/config";
import { ErrorHandlerFunction } from "../../service-helpers";

export const getPeriodosVisita = async () => {
  const url = `${API_URL}/imr/periodos-de-visita/`;
  const response = await axios.get(url).catch(ErrorHandlerFunction);
  if (response) {
    const data = { data: response.data, status: response.status };
    return data;
  }
};
