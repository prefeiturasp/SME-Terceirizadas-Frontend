import { deepCopy } from "helpers/utilities";
import {
  OcorrenciaFormInterface,
  RegistrarNovaOcorrenciaFormInterface,
} from "./interfaces";

const formatOcorrencias = (values_: RegistrarNovaOcorrenciaFormInterface) => {
  let respostas: Array<OcorrenciaFormInterface> = [];

  Object.keys(values_).forEach((key) => {
    if (key.includes(`resposta_`)) {
      const tipoOcorrenciaUUID = key.split("_")[2];
      const parametrizacaoUUID = key.split("_")[4];
      const resposta = values_[key];
      respostas.push({
        tipoOcorrencia: tipoOcorrenciaUUID,
        parametrizacao: parametrizacaoUUID,
        resposta: resposta,
      });
    }
  });
  return respostas;
};

export const formataPayload = (
  values: RegistrarNovaOcorrenciaFormInterface,
  solicitacaoMedicaoInicialUuid: string
) => {
  const values_ = deepCopy(values);
  values_["solicitacao_medicao_inicial"] = solicitacaoMedicaoInicialUuid;
  values_.ocorrencias = formatOcorrencias(values_);

  return values_;
};
