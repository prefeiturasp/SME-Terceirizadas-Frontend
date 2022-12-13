import {
  converterDDMMYYYYparaYYYYMMDD,
  deepCopy
} from "../../../helpers/utilities";

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
      tipos_alimentacao_de,
      tipo_alimentacao_para,
      ...dadosFaixasEtarias
    } = dadosSubstituicao;
    const matriculados = dadosFaixasEtarias.alunosPorFaixaEtaria;
    delete dadosFaixasEtarias.alunosPorFaixaEtaria;
    if (!check) {
      continue;
    }
    let faixas_etarias = [];
    Object.entries(dadosFaixasEtarias.faixas_etarias).forEach(([k, v]) => {
      const matriculados_quando_criado = matriculados.find(
        f => f.faixa_etaria.uuid === k
      );
      faixas_etarias.push({
        faixa_etaria: k,
        quantidade: parseInt(v),
        matriculados_quando_criado: parseInt(matriculados_quando_criado.count)
      });
    });
    substituicoes.push({
      periodo_escolar: periodo,
      tipos_alimentacao_de,
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

export const totalAlunosPorPeriodo = (values, index) => {
  let totalAlunos = 0;
  return (
    values.substituicoes[index].faixas_etarias &&
    values.substituicoes[index].faixas_etarias.reduce(function(total, faixa) {
      return total + faixa.count;
    }, totalAlunos)
  );
};

export const totalAlunosInputPorPeriodo = (values, index) => {
  let totalAlunos = 0;
  const faixas = values.substituicoes[index].faixas;
  if (!faixas) return 0;
  return Object.values(faixas).reduce(function(total, faixa) {
    return total + parseInt(faixa);
  }, totalAlunos);
};

export const formataPayload = values => {
  const values_ = deepCopy(values);
  values_.data = values_.data
    .split("/")
    .reverse()
    .join("-");
  const faixas_etarias = [];
  values_.substituicoes.forEach(substituicao => {
    substituicao.periodo_escolar = substituicao.uuid;
    substituicao.faixas_etarias.forEach(faixa => {
      faixas_etarias.push({
        faixa_etaria: faixa.faixa_etaria.uuid,
        quantidade: substituicao.faixas[faixa.faixa_etaria.uuid],
        matriculados_quando_criado: faixa.count
      });
    });
    substituicao.faixas_etarias = faixas_etarias;
    if (typeof substituicao.tipos_alimentacao_de === "string") {
      substituicao.tipos_alimentacao_de = [substituicao.tipos_alimentacao_de];
    }
    if (substituicao.tipos_alimentacao_de_selecionados) {
      substituicao.tipos_alimentacao_de =
        substituicao.tipos_alimentacao_de_selecionados;
    }
  });

  return values_;
};
