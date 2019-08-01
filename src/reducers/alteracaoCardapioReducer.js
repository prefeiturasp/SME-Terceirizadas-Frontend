const LOAD_ALTERACAO_CARDAPIO = "LOAD_ALTERACAO_CARDAPIO";

export default function reducer(state = {}, action) {
  switch (action.type) {
    case LOAD_ALTERACAO_CARDAPIO:
      if (action.data != null) {
        console.log(action.data)
        console.log(action.data.motivo)
        action.data.motivo = action.data.motivo.uuid;
        // action.data.dias_razoes.forEach(function(dia_razao) {
        //   action.data[`dias_razoes_${dia_razao.id}`] = dia_razao;
        // })
        // action.data.substituicoes.forEach(function(substituicao) {
        //   action.data[`substituicoes_${substituicao.periodo}`] = substituicao;
        //   action.data[`substituicoes_${substituicao.periodo}`]['check'] = true;
        // })

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

export const loadAlteracaoCardapio = data => dispatch =>
  dispatch({ type: LOAD_ALTERACAO_CARDAPIO, data });
