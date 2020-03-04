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
      tipo_alimentacao_de,
      tipo_alimentacao_para,
      ...dadosFaixasEtarias
    } = dadosSubstituicao;
    delete dadosFaixasEtarias.check;
    let faixas_etarias = [];
    for (let [chave, qtde] of Object.entries(dadosFaixasEtarias)) {
      const faixa_etaria = chave.slice(11);
      faixas_etarias.push({
        faixa_etaria,
        quantidade: parseInt(qtde)
      });
    }
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
