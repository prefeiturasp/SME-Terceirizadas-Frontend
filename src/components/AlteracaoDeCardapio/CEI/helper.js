import { converterDDMMYYYYparaYYYYMMDD } from "../../../helpers/utilities";

export const parseFormValues = ({
  observacao,
  motivo,
  data_alteracao,
  ...dadosSubstituicoes
}) => {
  const substituicoes = [];
  delete dadosSubstituicoes.status;
  for (let dadosSubstituicao of Object.values(dadosSubstituicoes)) {
    const {
      periodo,
      check,
      tipo_alimentacao_de,
      tipo_alimentacao_para,
      ...dadosFaixasEtarias
    } = dadosSubstituicao;
    delete dadosFaixasEtarias.alunosPorFaixaEtaria;
    if (!check) {
      continue;
    }
    let faixas_etarias = [];
    Object.entries(dadosFaixasEtarias.faixas_etarias).forEach(([k, v]) => {
      faixas_etarias.push({
        faixa_etaria: k,
        quantidade: parseInt(v)
      });
    });
    substituicoes.push({
      periodo_escolar: periodo,
      tipo_alimentacao_de,
      tipo_alimentacao_para,
      faixas_etarias
    });
  }
  return {
    observacao,
    motivo,
    data: converterDDMMYYYYparaYYYYMMDD(data_alteracao),
    substituicoes
  };
};
