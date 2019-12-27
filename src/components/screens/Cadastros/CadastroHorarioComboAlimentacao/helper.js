import moment from "moment";
import { postHorariosCombosPorEscola } from "../../../../services/cadastroTipoAlimentacao.service";

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

export const verificaSeCampoEhValido = (
  vinculosDeCombos,
  periodoEscolar,
  comboAlimentacaoAtual
) => {
  const hora_inicial = moment(
    vinculosDeCombos[periodoEscolar].combos[comboAlimentacaoAtual].hora_inicial,
    "HH:mm:ss A"
  );
  const hora_final = moment(
    vinculosDeCombos[periodoEscolar].combos[comboAlimentacaoAtual].hora_final,
    "h:mm:ss A"
  );
  return hora_inicial <= hora_final;
};

export const todosOsCamposValidos = (
  vinculosDeCombos,
  periodoEscolar,
  comboAlimentacaoAtual
) => {
  const hora_inicial = moment(
    vinculosDeCombos[periodoEscolar].combos[comboAlimentacaoAtual].hora_inicial,
    "HH:mm:ss A"
  );
  const hora_final = moment(
    vinculosDeCombos[periodoEscolar].combos[comboAlimentacaoAtual].hora_final,
    "HH:mm:ss A"
  );
  const horaZero = moment("00:00:00", "HH:mm:ss A");
  return (
    hora_final > horaZero &&
    hora_inicial > horaZero &&
    hora_inicial < hora_final
  );
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

export const salvaComboEHorarios = (
  vinculosDeCombos,
  periodoEscolar,
  comboAlimentacaoAtual
) => {
  const comboHorario =
    vinculosDeCombos[periodoEscolar].combos[comboAlimentacaoAtual];
  const request = {
    combo_tipos_alimentacao: comboHorario.combo_tipos_alimentacao,
    escola: comboHorario.escola,
    hora_inicial: comboHorario.hora_inicial,
    hora_final: comboHorario.hora_final
  };
  let response = null;
  postHorariosCombosPorEscola(request).then(resp => {
    response = resp;
  });
  return response;
};
