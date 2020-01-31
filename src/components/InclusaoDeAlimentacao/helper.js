export const formatarTiposDeAlimentacao = tiposAlimentacao => {
  return tiposAlimentacao.map(element => {
    return { value: element.uuid, label: element.nome };
  });
};

export const formatarPeriodos = periodos => {
  periodos.forEach(periodo => {
    periodo["checked"] = false;
    periodo["tipos_alimentacao_selecionados"] = [];
    periodo["numero_alunos"] = null;
  });
  return periodos;
};

export const construirPeriodosECombos = periodos => {
  let periodosCombo = [];
  periodos.forEach(periodo => {
    let dicionarioPeriodo = {
      checked: false,
      tipos_alimentacao_selecionados: [],
      numero_alunos: null,
      nome: periodo.periodo_escolar.nome,
      uuid: periodo.periodo_escolar.uuid,
      tipos_alimentacao: periodo.combos.map(combo => {
        return {
          nome: combo.label,
          uuid: combo.uuid
        };
      })
    };
    periodosCombo.push(dicionarioPeriodo);
  });
  return periodosCombo;
};

export const extrairTiposALimentacao = tiposAlimentacao => {
  let uuidsTiposAlimentacao = [];
  tiposAlimentacao.forEach(tipoAlimentacao => {
    uuidsTiposAlimentacao.push(tipoAlimentacao.uuid);
  });
  return uuidsTiposAlimentacao;
};

export const formatarDiasSemana = diasSemana => {
  let paraStringDiasSemana = [];
  diasSemana.forEach(diaSemana => {
    paraStringDiasSemana.push(diaSemana.toString());
  });
  return paraStringDiasSemana;
};

export const formatarSubmissaoSolicitacaoContinua = (values, meusDados) => {
  let dataFormatada = {};
  dataFormatada.escola = meusDados.vinculo_atual.instituicao.uuid;
  dataFormatada.motivo = values.inclusoes[0].motivo;
  dataFormatada.data_inicial = values.inclusoes[0].data_inicial;
  dataFormatada.data_final = values.inclusoes[0].data_final;
  dataFormatada.dias_semana = values.inclusoes[0].dias_semana;
  dataFormatada.outro_motivo = values.inclusoes[0].outro_motivo;
  let quantidades_periodo = [];
  values.quantidades_periodo.forEach(quantidade_periodo => {
    if (quantidade_periodo.checked) {
      let quantidade_periodo_formatado = {};
      quantidade_periodo_formatado["numero_alunos"] =
        quantidade_periodo.numero_alunos;
      quantidade_periodo_formatado["periodo_escolar"] = quantidade_periodo.uuid;
      quantidade_periodo_formatado["tipos_alimentacao"] =
        quantidade_periodo.tipos_alimentacao_selecionados;
      quantidades_periodo.push(quantidade_periodo_formatado);
    }
  });
  dataFormatada.quantidades_periodo = quantidades_periodo;
  dataFormatada.descricao = values.descricao;
  return dataFormatada;
};

export const formatarSubmissaoSolicitacaoNormal = (values, meusDados) => {
  let dataFormatada = {};
  dataFormatada.escola = meusDados.vinculo_atual.instituicao.uuid;
  let inclusoes = [];
  values.inclusoes.forEach(inclusao => {
    let inclusao_formatada = {};
    inclusao_formatada["data"] = inclusao.data;
    inclusao_formatada["motivo"] = inclusao.motivo;
    inclusao_formatada["outro_motivo"] = inclusao.outro_motivo;
    inclusoes.push(inclusao_formatada);
  });
  dataFormatada.inclusoes = inclusoes;
  let quantidades_periodo = [];
  values.quantidades_periodo.forEach(quantidade_periodo => {
    if (quantidade_periodo.checked) {
      let quantidade_periodo_formatado = {};
      quantidade_periodo_formatado["numero_alunos"] =
        quantidade_periodo.numero_alunos;
      quantidade_periodo_formatado["periodo_escolar"] = quantidade_periodo.uuid;
      quantidade_periodo_formatado["tipos_alimentacao"] =
        quantidade_periodo.tipos_alimentacao_selecionados;
      quantidades_periodo.push(quantidade_periodo_formatado);
    }
  });
  dataFormatada.quantidades_periodo = quantidades_periodo;
  dataFormatada.descricao = values.descricao;
  return dataFormatada;
};

const retornaQuantidadeDeAlunosNoPeriodoEscolar = (
  periodoUuid,
  periodosQuantidadeAlunos
) => {
  let quantidadeAlunos = null;
  periodosQuantidadeAlunos.forEach(periodo => {
    if (periodo.periodo_escolar.uuid === periodoUuid) {
      quantidadeAlunos = periodo.quantidade_alunos;
    }
  });
  return quantidadeAlunos;
};

export const abstraiPeriodosComAlunosMatriculados = (
  periodos,
  periodosQuantidadeAlunos
) => {
  periodos.forEach(periodo => {
    periodo["maximo_alunos"] = retornaQuantidadeDeAlunosNoPeriodoEscolar(
      periodo.uuid,
      periodosQuantidadeAlunos
    );
    periodo["multiselect"] = "multiselect-wrapper-disabled";
    periodo["validador"] = [];
  });
  return periodos;
};
