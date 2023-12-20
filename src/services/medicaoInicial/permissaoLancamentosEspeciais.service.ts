import {
  ResponseEscolasComPermissoesLancamentosEspeciaisInterface,
  ResponsePermissoesLancamentosEspeciaisInterface,
} from "interfaces/responses.interface";
import axios from "../_base";
import { ErrorHandlerFunction } from "services/service-helpers";

export const getPermissoesLancamentosEspeciais = async (
  params: { page?: number; escola__uuid?: string } = null
) => {
  const url = "medicao-inicial/permissao-lancamentos-especiais/";
  const response: ResponsePermissoesLancamentosEspeciaisInterface = await axios
    .get(url, { params })
    .catch(ErrorHandlerFunction);
  if (response) {
    const data = { data: response.data, status: response.status };
    return data;
  }
};

export const getEscolasComPermissoesLancamentosEspeciais = async () => {
  const url =
    "medicao-inicial/permissao-lancamentos-especiais/escolas-permissoes-lancamentos-especiais/";
  const response: ResponseEscolasComPermissoesLancamentosEspeciaisInterface =
    await axios.get(url).catch(ErrorHandlerFunction);
  if (response) {
    const data = { data: response.data, status: response.status };
    return data;
  }
};

export const getPermissoesLancamentosEspeciaisMesAno = async (params: any) => {
  const url =
    "medicao-inicial/permissao-lancamentos-especiais/permissoes-lancamentos-especiais-mes-ano/";
  const response: any = await axios
    .get(url, { params })
    .catch(ErrorHandlerFunction);
  if (response) {
    const data = { data: response.data, status: response.status };
    return data;
  }
};
