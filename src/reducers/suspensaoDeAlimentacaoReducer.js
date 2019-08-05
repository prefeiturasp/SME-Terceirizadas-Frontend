const LOAD_FOOD_SUSPENSION = "LOAD_FOOD_SUSPENSION";

export default function reducer(state = {}, action) {
  switch (action.type) {
    case LOAD_FOOD_SUSPENSION:
      if (action.data != null) {
        action.data.dias_razoes.forEach(function(dia_razao) {
          action.data[`dias_razoes_${dia_razao.id}`] = dia_razao;
        });
        action.data.descricoes.forEach(function(descricao) {
          action.data[`descricoes_${descricao.periodo}`] = descricao;
          action.data[`descricoes_${descricao.periodo}`]['check'] = true;
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
