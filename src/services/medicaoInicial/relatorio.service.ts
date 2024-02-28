import axios from "../_base";

import {
  RelatorioAdesaoParams,
  RelatorioAdesaoResponse,
} from "./relatorio.interface";

const BASE_URL = "medicao-inicial/relatorios";

export default class RelatorioService {
  static async getRelatorioAdesao(
    params: RelatorioAdesaoParams
  ): Promise<RelatorioAdesaoResponse> {
    return await axios.get(`${BASE_URL}/relatorio-adesao/`, { params });
  }
}
