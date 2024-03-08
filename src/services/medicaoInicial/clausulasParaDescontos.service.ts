import {
  ClausulaParaDescontoInterface,
  FiltrosInterface,
  ResponseClausulasInterface,
} from "interfaces/clausulas_para_descontos.interface";
import axios from "../_base";

export const cadastraClausulaParaDesconto = async (
  payload: ClausulaParaDescontoInterface
) => {
  return await axios.post("/medicao-inicial/clausulas-de-descontos/", payload);
};

export const getClausulasParaDescontos = async (
  page: number,
  filtros: FiltrosInterface
) => {
  let url = "/medicao-inicial/clausulas-de-descontos/";
  const params = { page, ...filtros };

  return await axios.get<ResponseClausulasInterface>(url, { params });
};
