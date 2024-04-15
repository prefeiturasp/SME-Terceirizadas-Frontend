import axios from "../_base";

import {
  ParametrizacaoFinanceiraPayload,
  ParametrizacaoFinanceiraParams,
  ParametrizacaoFinanceiraResponse,
} from "./parametrizacao_financeira.interface";

const BASE_URL = "medicao-inicial/parametrizacao-financeira";

export default class ParametrizacaoFinanceiraService {
  static async addParametrizacaoFinanceira(
    payload: ParametrizacaoFinanceiraPayload
  ): Promise<void> {
    await axios.post(`${BASE_URL}/`, payload);
  }

  static async getParametrizacaoFinanceira(
    page: number,
    filtros: ParametrizacaoFinanceiraParams
  ): Promise<ParametrizacaoFinanceiraResponse> {
    const params = { page, ...filtros };

    const response = await axios.get(`${BASE_URL}/`, { params });
    return response.data;
  }
}
