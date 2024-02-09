import { EditalContratoListadoInterface } from "../interfaces";
import { deepCopy } from "helpers/utilities";

export const formataEditalContratoParaForm = (
  editalContrato: EditalContratoListadoInterface
) => {
  const editalContratoFormatado = deepCopy(editalContrato);
  editalContratoFormatado.contratos.forEach((contrato) => {
    contrato.terceirizada = contrato.terceirizada.uuid;
    contrato.diretorias_regionais = contrato.diretorias_regionais.map(
      (dre) => dre.uuid
    );
    contrato.lotes = contrato.lotes.map((lote) => lote.uuid);
  });
  return editalContratoFormatado;
};
