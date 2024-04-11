import axios from "../_base";

import {
  PayloadAtribuirQuestoesPorProduto,
  ResponseAtribuirQuestoesPorProduto,
  ResponseListarQuestoesConferencia,
  ResponseListarQuestoesConferenciaSimples,
  ResponseListarQuestoesPorProduto,
} from "interfaces/recebimento.interface";
import { toastError } from "components/Shareable/Toast/dialogs";
import { getMensagemDeErro } from "helpers/statusErrors";
import { URLSearchParams } from "url";

export const listarQuestoesConferencia =
  async (): Promise<ResponseListarQuestoesConferencia> => {
    try {
      return await axios.get("/questoes-conferencia/");
    } catch (error) {
      toastError(getMensagemDeErro(error.response.status));
    }
  };

export const listarQuestoesConferenciaSimples =
  async (): Promise<ResponseListarQuestoesConferenciaSimples> => {
    try {
      return await axios.get("/questoes-conferencia/lista-simples-questoes/");
    } catch (error) {
      toastError(getMensagemDeErro(error.response.status));
    }
  };

export const listarQuestoesPorProduto = async (
  params: URLSearchParams
): Promise<ResponseListarQuestoesPorProduto> => {
  try {
    return await axios.get("/questoes-por-produto/", { params });
  } catch (error) {
    toastError(getMensagemDeErro(error.response.status));
  }
};

export const atribuirQuestoesPorProduto = async (
  payload: PayloadAtribuirQuestoesPorProduto
): Promise<ResponseAtribuirQuestoesPorProduto> => {
  try {
    return await axios.post("/questoes-por-produto/", payload);
  } catch (error) {
    toastError(getMensagemDeErro(error.response.status));
  }
};
