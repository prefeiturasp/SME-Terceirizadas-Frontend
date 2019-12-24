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
      hora_inicial: "00:00:00",
      hora_final: "00:00:00",
      label: combo.label
    });
  });
  return arrayCombos;
};

const montaVinculosDeCombosIniciais = (
  vinculosTipoAlimentacaoDaEscola,
  uuidEscola
) => {
  let arrayVinculos = [];
  vinculosTipoAlimentacaoDaEscola.forEach(vinculo => {
    arrayVinculos.push({
      periodo_escolar: vinculo.periodo_escolar,
      combos: retornaArrayDeCombosComHorarios(vinculo.combos, uuidEscola)
    });
  });
  return arrayVinculos;
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
          hora_inicial: "00:00:00",
          hora_final: "00:00:00",
          label: combo.label
        });
  });
  return arrayDosCombos;
};

const montaVinculosDeCombosExistentes = (
  vinculosTipoAlimentacaoDaEscola,
  horariosDosCombos,
  uuidEscola
) => {
  let arrayVinculos = [];
  vinculosTipoAlimentacaoDaEscola.forEach(vinculo => {
    arrayVinculos.push({
      periodo_escolar: vinculo.periodo_escolar,
      combos: montaArrayDeCombos(vinculo.combos, horariosDosCombos, uuidEscola)
    });
  });
  return arrayVinculos;
};

export const montavinculosDeCombosInicial = (
  vinculosTipoAlimentacaoDaEscola,
  horariosDosCombos,
  uuidEscola
) => {
  let vinculosDeCombos = null;
  temHorariosDeCombosParaEscola(horariosDosCombos)
    ? (vinculosDeCombos = montaVinculosDeCombosExistentes(
        vinculosTipoAlimentacaoDaEscola,
        horariosDosCombos,
        uuidEscola
      ))
    : (vinculosDeCombos = montaVinculosDeCombosIniciais(
        vinculosTipoAlimentacaoDaEscola,
        uuidEscola
      ));
  return vinculosDeCombos;
};
