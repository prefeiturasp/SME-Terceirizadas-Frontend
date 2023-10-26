import { DocumentosRecebimentoPayload } from "components/screens/PreRecebimento/DocumentosRecebimento/interfaces";
import axios from "./_base";

export const cadastraDocumentoRecebimento = async (
  payload: DocumentosRecebimentoPayload
) => await axios.post("/documentos-de-recebimento/", payload);
