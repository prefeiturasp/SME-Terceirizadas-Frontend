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
  let grupos = {};
  Object.keys(values_).forEach((key: string) => {
    if (key.includes("ocorrencia_") && values_[key] === "nao") {
      const tipoOcorrenciaUUID = key.split("_")[1];
      ocorrenciasNao.push(tipoOcorrenciaUUID);
      Object.keys(values_).forEach((_key) => {
        if (_key.includes(`grupos_${tipoOcorrenciaUUID}`)) {
          const gruposDeRespostas = values_[_key];
          grupos[tipoOcorrenciaUUID] = gruposDeRespostas;
          if (gruposDeRespostas) {
            gruposDeRespostas.forEach((grupo: string, indexGrupo: number) => {
              if (grupo) {
                Object.keys(grupo).forEach((keyGrupo: string) => {
                  const parametrizacaoUUID = keyGrupo.split("_")[4];
                  const resposta = grupo[keyGrupo];
                  const respostaDuplicada = respostas.find(
                    (resposta) =>
                      resposta.parametrizacao === parametrizacaoUUID &&
                      resposta.grupo === indexGrupo + 1
                  );
                  if (respostaDuplicada) {
                    if (typeof respostaDuplicada.resposta === "string") {
                      respostaDuplicada.resposta = resposta;
                    }
                  } else {
                    respostas.push({
                      tipoOcorrencia: tipoOcorrenciaUUID,
                      parametrizacao: parametrizacaoUUID,
                      resposta: resposta,
                      grupo: indexGrupo + 1,
                    });
                  }
                });
              }
            });
          }
        }
      });
    }
  });

  return { ocorrenciasNao, respostas, grupos };
};

export const validarFormulariosTiposOcorrencia = (
  values: NovoRelatorioVisitasFormInterface,
  tiposOcorrencia: Array<TipoOcorrenciaInterface>
) => {
  const { respostas, ocorrenciasNao, grupos } = formatOcorrencias(values);

  // valida todos os tipos de ocorrência assinalados como "não"
  const resultadoValidacaoPorTipoOcorrencia = ocorrenciasNao.map(
    (_ocorrenciaUUID) => {
      const _tipoOcorrencia = tiposOcorrencia.find(
        (_tipo_ocorrencia) => _tipo_ocorrencia.uuid === _ocorrenciaUUID
      );

      if (!_tipoOcorrencia) {
        return { tipo_ocorrencia: _ocorrenciaUUID, valid: false };
      }
      let _validacaoTodosOsGrupos = [];
      // pega os grupos de resposta por tipo de ocorrência
      const gruposPorTipoOcorrencia = grupos[_tipoOcorrencia.uuid];
      if (gruposPorTipoOcorrencia) {
        _validacaoTodosOsGrupos = gruposPorTipoOcorrencia.map(
          (_respostas, indexGrupo) => {
            const _validacaoPorGrupo = _tipoOcorrencia.parametrizacoes.map(
              (_parametrizacao) => {
                // valida a existência de resposta de cada parametrização da ocorrência
                const _resposta = respostas.find(
                  (_resp) =>
                    _resp.grupo === indexGrupo + 1 &&
                    _resp.parametrizacao === _parametrizacao.uuid
                );
                return (_resposta && _resposta.resposta) || false;
              }
            );
            const grupoIsValid = _validacaoPorGrupo.every(Boolean);
            return grupoIsValid;
          }
        );
      }
      // checa o resultado da validação de todas as parametrizações do tipo de ocorrência
      const isValid = _validacaoTodosOsGrupos.every(Boolean);

      return { tipo_ocorrencia: _ocorrenciaUUID, valid: isValid };
    }
  );

  return resultadoValidacaoPorTipoOcorrencia;
};
