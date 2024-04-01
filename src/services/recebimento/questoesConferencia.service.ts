import axios from "../_base";

import {
  PayloadAtribuirQuestoesPorProduto,
  ResponseAtribuirQuestoesPorProduto,
  ResponseListarQuestoesConferencia,
} from "interfaces/recebimento.interface";
import { toastError } from "components/Shareable/Toast/dialogs";
import { getMensagemDeErro } from "helpers/statusErrors";

export const listarQuestoesConferencia =
  async (): Promise<ResponseListarQuestoesConferencia> => {
    try {
      return await axios.get("/questoes-conferencia/");
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
