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
    periodo["multiselect"] = "multiselect-wrapper-disabled";
    periodo["dias_semana"] = [];
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
      tipos_alimentacao: periodo.tipos_alimentacao.map(alimento => {
        return {
          nome: alimento.nome,
          uuid: alimento.uuid
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

export const formatarSubmissaoSolicitacaoContinua = values => {
  values.motivo = values.inclusoes[0].motivo;
  values.data_inicial = values.inclusoes[0].data_inicial;
  values.data_final = values.inclusoes[0].data_final;
  return values;
};

export const formatarSubmissaoSolicitacaoNormal = values => {
  values.quantidades_periodo
    .filter(qp => qp.checked)
    .forEach(quantidade_periodo => {
      quantidade_periodo["periodo_escolar"] = quantidade_periodo.uuid;
      quantidade_periodo["tipos_alimentacao"] =
        quantidade_periodo.tipos_alimentacao_selecionados;
    });
  values.quantidades_periodo = values.quantidades_periodo.filter(
    qp => qp.checked
  );
  return values;
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
