import moment from "moment";

const temHorariosDeCombosParaEscola = horariosDosCombos => {
  return horariosDosCombos.length > 0;
};

const retornaArrayDeCombosComHorarios = (combos, uuidEscola) => {
  let arrayCombos = [];
  combos.forEach(combo => {
    arrayCombos.push({
      uuid: null,
      combo_tipos_alimentacao: combo.uuid,
      escola: uuidEscola,
      hora_inicial: "00:00",
      hora_final: "00:00",
      label: combo.label
    });
  });
  return arrayCombos;
};

const comboPossuiHorario = (combo, horariosDosCombos) => {
  let arrayHorario = [];
  horariosDosCombos.forEach(horario => {
    if (horario.combo_tipos_alimentacao.uuid === combo.uuid) {
      arrayHorario.push(horario);
    }
  });
  return arrayHorario;
};

const montaArrayDeCombos = (combos, horariosDosCombos, uuidEscola) => {
  let arrayDosCombos = [];
  combos.forEach(combo => {
    let arrayTempCombo = comboPossuiHorario(combo, horariosDosCombos);
    arrayTempCombo.length > 0
      ? arrayDosCombos.push({
          uuid: arrayTempCombo[0].uuid,
          combo_tipos_alimentacao:
            arrayTempCombo[0].combo_tipos_alimentacao.uuid,
          escola: uuidEscola,
          hora_inicial: arrayTempCombo[0].hora_inicial,
          hora_final: arrayTempCombo[0].hora_final,
          label: arrayTempCombo[0].combo_tipos_alimentacao.label
        })
      : arrayDosCombos.push({
          uuid: null,
          combo_tipos_alimentacao: combo.uuid,
          escola: uuidEscola,
          hora_inicial: "00:00",
          hora_final: "00:00",
          label: combo.label
        });
  });
  return arrayDosCombos;
};

const obtemQuantidadeDeAlunosPeloPeriodoEscolar = (
  uuidPeriodo,
  periodosEQuantidadeAlunos
) => {
  let periodo_alunos = {
    uuid: null,
    quantidade_alunos_anterior: 0,
    quantidade_alunos: 0,
    justificativa: null,
    escola: null,
    periodo_escolar: null,
    ativo: true
  };
  periodosEQuantidadeAlunos.forEach(periodo => {
    if (periodo.periodo_escolar.uuid === uuidPeriodo) {
      periodo_alunos.quantidade_alunos_anterior = periodo.quantidade_alunos;
      periodo_alunos.escola = periodo.escola.uuid;
      periodo_alunos.periodo_escolar = periodo.periodo_escolar.uuid;
      periodo_alunos.uuid = periodo.uuid;
    }
  });
  return periodo_alunos;
};

const montaVinculosDeCombosIniciais = (
  vinculosTipoAlimentacaoDaEscola,
  uuidEscola,
  periodosEQuantidadeAlunos
) => {
  let arrayVinculos = [];
  vinculosTipoAlimentacaoDaEscola.forEach(vinculo => {
    const info_alunos = obtemQuantidadeDeAlunosPeloPeriodoEscolar(
      vinculo.periodo_escolar.uuid,
      periodosEQuantidadeAlunos
    );
    arrayVinculos.push({
      ativo: false,
      periodo_escolar: vinculo.periodo_escolar,
      combos: retornaArrayDeCombosComHorarios(vinculo.combos, uuidEscola),
      quantidade_alunos: info_alunos
    });
  });
  return arrayVinculos;
};

const montaVinculosDeCombosExistentes = (
  vinculosTipoAlimentacaoDaEscola,
  horariosDosCombos,
  uuidEscola,
  periodosEQuantidadeAlunos
) => {
  let arrayVinculos = [];
  vinculosTipoAlimentacaoDaEscola.forEach(vinculo => {
    const info_alunos = obtemQuantidadeDeAlunosPeloPeriodoEscolar(
      vinculo.periodo_escolar.uuid,
      periodosEQuantidadeAlunos
    );
    arrayVinculos.push({
      ativo: false,
      periodo_escolar: vinculo.periodo_escolar,
      combos: montaArrayDeCombos(vinculo.combos, horariosDosCombos, uuidEscola),
      quantidade_alunos: info_alunos
    });
  });
  return arrayVinculos;
};

export const montavinculosDeCombosInicial = (
  vinculosTipoAlimentacaoDaEscola,
  horariosDosCombos,
  uuidEscola,
  periodosEQuantidadeAlunos
) => {
  let vinculosDeCombos = null;
  temHorariosDeCombosParaEscola(horariosDosCombos)
    ? (vinculosDeCombos = montaVinculosDeCombosExistentes(
        vinculosTipoAlimentacaoDaEscola,
        horariosDosCombos,
        uuidEscola,
        periodosEQuantidadeAlunos
      ))
    : (vinculosDeCombos = montaVinculosDeCombosIniciais(
        vinculosTipoAlimentacaoDaEscola,
        uuidEscola,
        periodosEQuantidadeAlunos
      ));
  return vinculosDeCombos;
};

export const verificaSeCampoEhValido = (
  vinculosDeCombos,
  periodoEscolar,
  comboAlimentacaoAtual
) => {
  const hora_inicial = moment(
    vinculosDeCombos[periodoEscolar].combos[comboAlimentacaoAtual].hora_inicial,
    "HH:mm"
  );
  const hora_final = moment(
    vinculosDeCombos[periodoEscolar].combos[comboAlimentacaoAtual].hora_final,
    "h:mm"
  );
  return hora_inicial <= hora_final;
};

export const todosOsCamposValidos = (
  vinculosDeCombos,
  periodoEscolar,
  comboAlimentacaoAtual
) => {
  if (vinculosDeCombos[periodoEscolar].combos[comboAlimentacaoAtual]) {
    const hora_inicial = moment(
      vinculosDeCombos[periodoEscolar].combos[comboAlimentacaoAtual]
        .hora_inicial,
      "HH:mm"
    );
    const hora_final = moment(
      vinculosDeCombos[periodoEscolar].combos[comboAlimentacaoAtual].hora_final,
      "HH:mm"
    );
    const horaZero = moment("00:00", "HH:mm");
    return (
      hora_final > horaZero &&
      hora_inicial > horaZero &&
      hora_inicial < hora_final
    );
  }
};

export const ultimoComboDisponivel = (
  vinculosDeCombos,
  periodoEscolar,
  comboAlimentacaoAtual
) => {
  const quantidadeDeCombos = vinculosDeCombos[periodoEscolar].combos.length;
  return quantidadeDeCombos === comboAlimentacaoAtual + 1;
};

export const ultimoPeriodoDaEscola = (vinculosDeCombos, periodoEscolar) => {
  return vinculosDeCombos.length === periodoEscolar + 1;
};
