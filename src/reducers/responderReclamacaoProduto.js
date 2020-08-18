// Actions
const SET_PRODUTOS =
  "SME-Terceirizadas-Frontend/responderReclamacaoProduto/SET_PRODUTOS";
const SET_ATIVOS =
  "SME-Terceirizadas-Frontend/responderReclamacaoProduto/SET_ATIVOS";
const RESET = "SME-Terceirizadas-Frontend/responderReclamacaoProduto/RESET";

// Reducer
export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    case SET_PRODUTOS:
      return {
        ...state,
        produtos: action.payload
      };
    case SET_ATIVOS:
      return {
        ...state,
        ativos: action.payload
      };
    case RESET:
      return {
        ...state,
        ativos: undefined,
        produtos: undefined
      };
    default:
      return state;
  }
}

// Action Creators
export const setProdutos = listaProdutos => ({
  type: SET_PRODUTOS,
  payload: listaProdutos
});

export const setAtivos = ativos => ({
  type: SET_ATIVOS,
  payload: ativos
});

export const reset = () => ({
  type: RESET
});
