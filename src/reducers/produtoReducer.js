const initialState = {
  list: [],
  nomesProdutos: [],
  nomesMarcas: [],
  nomesFabricantes: []
};

export const produtoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "PRODUTOS_SEARCH":
      return {
        ...state,
        list: action.payload.data.results
      };
    case "NOMES_PRODUTOS":
      return {
        ...state,
        nomesProdutos: action.payload.data.results.map(res => {
          return res.nome;
        })
      };
    case "NOMES_MARCAS":
      return {
        ...state,
        nomesMarcas: action.payload.data.results.map(res => {
          return res.nome;
        })
      };
    case "NOMES_FABRICANTES":
      return {
        ...state,
        nomesFabricantes: action.payload.data.results.map(res => {
          return res.nome;
        })
      };
    default:
      return state;
  }
};
