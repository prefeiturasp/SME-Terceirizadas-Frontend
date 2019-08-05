const LOAD_FOOD_SUSPENSION = "LOAD_FOOD_SUSPENSION";

export default function reducer(state = {}, action) {
  switch (action.type) {
    case LOAD_FOOD_SUSPENSION:
      if (action.data != null) {
        action.data.dias_razoes.forEach(function(dia_motivo) {
          action.data[`dias_razoes_${dia_motivo.id}`] = dia_motivo;
        });
        action.data.suspensoes.forEach(function(descricao) {
          action.data[`suspensoes_${descricao.periodo}`] = descricao;
          action.data[`suspensoes_${descricao.periodo}`]['check'] = true;
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
