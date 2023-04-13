//actions
export const UPDATE_MARCA = "UPDATE_MARCA";
export const UPDATE_NOME = "UPDATE_NOME";
export const UPDATE_EDITAL = "UPDATE_EDITAL";

export const updateMarcaProduto = marca => ({
  type: UPDATE_MARCA,
  payload: marca
});

export const updateNomeProduto = nome => ({
  type: UPDATE_NOME,
  payload: nome
});

export const updateEditalProtudo = edital => ({
  type: UPDATE_EDITAL,
  payload: edital
});

const initialState = {
  marcaProduto: "",
  nomeProduto: "",
  editalProduto: ""
};

//reducer
export const filtersProdutoReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_MARCA:
      return {
        ...state,
        marcaProduto: action.payload
      };
    case UPDATE_NOME:
      return {
        ...state,
        nomeProduto: action.payload
      };
    case UPDATE_EDITAL:
      return {
        ...state,
        editalProduto: action.payload
      };
    default:
      return state;
  }
};
