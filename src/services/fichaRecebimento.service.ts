import { FichaRecebimentoPayload } from "components/screens/Recebimento/FichaRecebimento/interfaces";
import axios from "./_base";
import { ResponseFichaRecebimento } from "interfaces/responses.interface";

export const cadastraRascunhoFichaRecebimento = async (
  payload: FichaRecebimentoPayload
): Promise<ResponseFichaRecebimento> =>
  await axios.post("/rascunho-ficha-de-recebimento/", payload);
