import {
  ArquivoInterface,
  EscolaLabelInterface,
  NovoRelatorioVisitasFormInterface,
} from "./interfaces";
import { deepCopy } from "helpers/utilities";

export const formataPayload = (
  values: NovoRelatorioVisitasFormInterface,
  escolaSelecionada: EscolaLabelInterface,
  anexos: Array<ArquivoInterface>
) => {
  let values_ = deepCopy(values);
  values_.escola = escolaSelecionada.uuid;
  values_.acompanhou_visita = values.acompanhou_visita === "sim";

  const ocorrencias_nao_se_aplica = [];
  Object.keys(values_).forEach((key) => {
    if (key.includes("ocorrencia_") && values_[key] === "nao_se_aplica") {
      const tipoOcorrenciaUUID = key.split("_")[1];
      const descricao = values_[`descricao_${tipoOcorrenciaUUID}`];
      ocorrencias_nao_se_aplica.push({
        tipo_ocorrencia: tipoOcorrenciaUUID,
        descricao,
      });
    }
  });
  return { ...values_, ocorrencias_nao_se_aplica, anexos };
};
