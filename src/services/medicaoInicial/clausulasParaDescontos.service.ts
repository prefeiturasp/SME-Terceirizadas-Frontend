import { ClausulaParaDescontoInterface } from "interfaces/clausulas_para_descontos.interface";
import axios from "../_base";

export const cadastraClausulaParaDesconto = async (
  payload: ClausulaParaDescontoInterface
) => {
  return await axios.post("/medicao-inicial/clausulas-de-descontos/", payload);
};
