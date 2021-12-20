import {
  extrairTiposALimentacao,
  formatarDiasSemana
} from "../components/InclusaoDeAlimentacao/helper";
const LOAD_FOOD_INCLUSION = "LOAD_FOOD_INCLUSION";

export default function reducer(state = {}, action) {
  switch (action.type) {
    case LOAD_FOOD_INCLUSION:
      if (action.data !== null) {
        action.data.quantidades_periodo.forEach(function(quantidade_periodo) {
          action.data[
            `quantidades_periodo_${quantidade_periodo.periodo_escolar.nome}`
          ] = {
            check: true,
            tipos_alimentacao: extrairTiposALimentacao(
              quantidade_periodo.tipos_alimentacao
            ),
            numero_alunos: quantidade_periodo.numero_alunos
          };
        });
        if (action.data.data_inicial !== undefined) {
          action.data[`inclusoes_0`] = {
            id: 0,
            data_inicial: action.data.data_inicial,
            data_final: action.data.data_final,
            motivo: action.data.motivo.uuid,
            outro_motivo: action.data.outro_motivo,
            observacao: action.data.observacao,
            dias_semana: formatarDiasSemana(action.data.dias_semana)
          };
        } else {
          action.data.inclusoes.forEach((inclusao, indice) => {
            action.data[`inclusoes_${indice}`] = {
              data: inclusao.data,
              motivo: inclusao.motivo.uuid,
              outro_motivo: inclusao.outro_motivo,
              observacao: inclusao.observacao
            };
          });
        }
      }

      return {
        data: {
          ...action.data
        }
      };
    default:
      return state;
  }
}

export const loadFoodInclusion = data => dispatch =>
  dispatch({ type: LOAD_FOOD_INCLUSION, data });
