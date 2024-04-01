import axios from "../_base";

import { ParametrizacaoFinanceiraPayload } from "./parametrizacao_financeira.interface";

const BASE_URL = "medicao-inicial/parametrizacao-financeira";

export default class ParametrizacaoFinanceiraService {
  static async addParametrizacaoFinanceira(
    payload: ParametrizacaoFinanceiraPayload
  ): Promise<void> {
    await axios.post(`${BASE_URL}/`, payload);
  }
}
