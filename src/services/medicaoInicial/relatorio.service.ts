import axios from "../_base";

import {
  RelatorioAdesaoExportResponse,
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
  ): Promise<RelatorioAdesaoExportResponse> {
    const response = await axios.get(
      `${BASE_URL}/relatorio-adesao/exportar-xlsx/`,
      {
        params,
      }
    );
    return response.data;
  }

  static async exportarRelatorioAdesaoParaPDF(
    params: RelatorioAdesaoParams
  ): Promise<RelatorioAdesaoExportResponse> {
    const response = await axios.get(
      `${BASE_URL}/relatorio-adesao/exportar-pdf/`,
      {
        params,
      }
    );
    return response.data;
  }
}
