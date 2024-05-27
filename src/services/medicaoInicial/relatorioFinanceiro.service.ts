import {
  FiltrosInterface,
  RelatorioFinanceiroResponse,
} from "interfaces/relatorio_financeiro.interface";
import axios from "../_base";

export const getRelatoriosFinanceiros = async (
  page: number,
  filtros: FiltrosInterface
) => {
  let url = "/medicao-inicial/relatorio-financeiro/";
  const params = { page, ...filtros };

  return await axios.get<RelatorioFinanceiroResponse>(url, { params });
};
