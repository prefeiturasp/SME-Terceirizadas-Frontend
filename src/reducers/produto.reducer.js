const LOAD_PRODUTO = "LOAD_PRODUTO";

export default function reducer(state = {}, action) {
  switch (action.type) {
    case LOAD_PRODUTO:
      if (action.data !== null) {
        action.data.eh_para_alunos_com_dieta = action.data
          .eh_para_alunos_com_dieta
          ? "1"
          : "0";
        action.data.tem_aditivos_alergenicos = action.data
          .tem_aditivos_alergenicos
          ? "1"
          : "0";
        action.data.marca = action.data.marca.nome;
        action.data.fabricante = action.data.fabricante.nome;
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

export const loadProduto = data => dispatch =>
  dispatch({ type: LOAD_PRODUTO, data });
