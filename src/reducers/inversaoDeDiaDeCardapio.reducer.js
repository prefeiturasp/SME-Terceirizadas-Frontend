const LOAD_INVERSAO_DIA_CARDAPIO = "LOAD_INVERSAO_DIA_CARDAPIO";

export default function reducer(state = {}, action) {
  switch (action.type) {
    case LOAD_INVERSAO_DIA_CARDAPIO:
      if (action.data !== null) {
        action.data.data_de = action.data.cardapio_de
          ? action.data.cardapio_de.data
          : action.data.data_de_inversao;
        action.data.data_para = action.data.cardapio_para
          ? action.data.cardapio_para.data
          : action.data.data_para_inversao;
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

export const loadInversaoDeDiaDeCardapio = data => dispatch =>
  dispatch({ type: LOAD_INVERSAO_DIA_CARDAPIO, data });
