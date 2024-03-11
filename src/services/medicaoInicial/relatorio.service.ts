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
    const response = await axios.get(`${BASE_URL}/relatorio-adesao/`, {
      params,
    });
    return response.data;
  }

  static async exportarRelatorioAdesaoParaXLSX(
    params: RelatorioAdesaoParams
  ): Promise<RelatorioAdesaoResponse> {
    const response = await axios.get(
      `${BASE_URL}/relatorio-adesao/exportar-xlsx/`,
      {
        params,
      }
    );
    return response.data;
  }
}
