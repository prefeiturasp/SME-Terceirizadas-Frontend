import {
  ArquivoInterface,
  TipoOcorrenciaInterface,
  EscolaLabelInterface,
  NovoRelatorioVisitasFormInterface,
} from "interfaces/imr.interface";
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

  const { respostas: ocorrencias } = formatOcorrencias(values);

  return { ...values_, ocorrencias_nao_se_aplica, ocorrencias, anexos };
};

const formatOcorrencias = (values: NovoRelatorioVisitasFormInterface) => {
  let values_ = deepCopy(values);
  let respostas = [];
  let ocorrenciasNao = [];

  Object.keys(values_).forEach((key) => {
    if (key.includes("ocorrencia_") && values_[key] === "nao") {
      const tipoOcorrenciaUUID = key.split("_")[1];
      ocorrenciasNao.push(tipoOcorrenciaUUID);
      Object.keys(values_).forEach((_key) => {
        if (_key.includes(`resposta_${tipoOcorrenciaUUID}`)) {
          const parametrizacaoUUID = _key.split("_")[4];
          const resposta = values_[_key];
          respostas.push({
            tipoOcorrencia: tipoOcorrenciaUUID,
            parametrizacao: parametrizacaoUUID,
            resposta: resposta,
          });
        }
      });
    }
  });

  return { ocorrenciasNao, respostas };
};

export const validarFormulariosTiposOcorrencia = (
  values: NovoRelatorioVisitasFormInterface,
  tiposOcorrencia: Array<TipoOcorrenciaInterface>
) => {
  const { respostas, ocorrenciasNao } = formatOcorrencias(values);

  // valida todos os tipos de ocorrência assinalados como "não"
  const resultadoValidacaoPorTipoOcorrencia = ocorrenciasNao.map(
    (_ocorrenciaUUID) => {
      const _tipoOcorrencia = tiposOcorrencia.find(
        (_tipo_ocorrencia) => _tipo_ocorrencia.uuid === _ocorrenciaUUID
      );

      if (!_tipoOcorrencia) {
        return { tipo_ocorrencia: _ocorrenciaUUID, valid: false };
      }

      // valida a existência de resposta de cada parametrização da ocorrência
      const resultadoValidacaoParametrizacoes =
        _tipoOcorrencia.parametrizacoes.map((_parametrizacao) => {
          const _resposta = respostas.find(
            (_resp) => _resp.parametrizacao === _parametrizacao.uuid
          );
          return _resposta && _resposta.resposta;
        });

      // checa o resultado da validação de todas as parametrizações do tipo de ocorrência
      const isValid = resultadoValidacaoParametrizacoes.every(Boolean);

      return { tipo_ocorrencia: _ocorrenciaUUID, valid: isValid };
    }
  );

  return resultadoValidacaoPorTipoOcorrencia;
};
