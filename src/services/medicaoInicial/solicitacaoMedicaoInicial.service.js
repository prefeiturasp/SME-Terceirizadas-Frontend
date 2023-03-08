import axios from "../_base";
import { ErrorHandlerFunction } from "services/service-helpers";

export const getTiposDeContagemAlimentacao = async () =>
  axios.get("medicao-inicial/tipo-contagem-alimentacao/");

export const getSolicitacaoMedicaoInicial = async params => {
  const url = `medicao-inicial/solicitacao-medicao-inicial/`;
  const response = await axios.get(url, { params }).catch(ErrorHandlerFunction);
  if (response) {
    const data = { data: response.data };
    return data;
  }
};

export const setSolicitacaoMedicaoInicial = async payload => {
  const url = `medicao-inicial/solicitacao-medicao-inicial/`;
  const response = await axios.post(url, payload).catch(ErrorHandlerFunction);
  if (response) {
    const data = { data: response.data, status: response.status };
    return data;
  }
};

export const updateSolicitacaoMedicaoInicial = async (uuid, params) => {
  const url = `medicao-inicial/solicitacao-medicao-inicial/${uuid}/`;
  const headers = { "content-type": "multipart/form-data" };
  const response = await axios
    .patch(url, params, {
      headers: headers
    })
    .catch(ErrorHandlerFunction);
  if (response) {
    const data = { data: response.data, status: response.status };
    return data;
  }
};

export const retrieveSolicitacaoMedicaoInicial = async uuid => {
  const url = `medicao-inicial/solicitacao-medicao-inicial/${uuid}/`;
  const response = await axios.get(url).catch(ErrorHandlerFunction);
  if (response) {
    const data = { data: response.data, status: response.status };
    return data;
  }
};
