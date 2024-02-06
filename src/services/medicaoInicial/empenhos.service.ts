import {
  ResponseContratosVigentesInterface,
  NovoEmpenhoPayload,
} from "interfaces/empenhos.interface";
import axios from "../_base";

export const getContratosVigentes = async () => {
  return await axios.get<ResponseContratosVigentesInterface>(
    "/vigencias/contratos-vigentes/"
  );
};

export const cadastraEmpenho = async (payload: NovoEmpenhoPayload) => {
  return await axios.post("/medicao-inicial/empenhos/", payload);
};
