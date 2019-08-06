import { extrairTiposALimentacao } from "../components/InclusaoDeAlimentacao/helper";

const LOAD_FOOD_SUSPENSION = "LOAD_FOOD_SUSPENSION";

export default function reducer(state = {}, action) {
  switch (action.type) {
    case LOAD_FOOD_SUSPENSION:
      if (action.data != null) {
        console.log("suspensoes_alimentacao: ", action.data.suspensoes_alimentacao);

        action.data.suspensoes_alimentacao.forEach(function(dia_motivo) {
          let diaMotivo = {}
          diaMotivo["data"] = dia_motivo.data
          diaMotivo["motivo"] = dia_motivo.motivo.uuid
          action.data[`dias_razoes_${dia_motivo.data}`] = diaMotivo;
          console.log("dia_motivo: ", dia_motivo);

        });

        action.data.quantidades_por_periodo.forEach(function(quantidade_por_periodo) {
          let quantidade_por_periodo_ = {};
          quantidade_por_periodo_["check"] = true;
          quantidade_por_periodo_["tipo_de_refeicao"] = extrairTiposALimentacao(quantidade_por_periodo.tipos_alimentacao);
          quantidade_por_periodo_["numero_de_alunos"] = quantidade_por_periodo.numero_alunos;
          action.data[`suspensoes_${quantidade_por_periodo.periodo_escolar.nome}`] = quantidade_por_periodo_;
        });
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

export const loadFoodSuspension = data => dispatch =>
  dispatch({ type: LOAD_FOOD_SUSPENSION, data });
