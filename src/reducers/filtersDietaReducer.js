//actions
export const UPDATE_STATUS = "UPDATE_STATUS";
export const UPDATE_TITULO = "UPDATE_TITULO";
export const UPDATE_LOTE = "UPDATE_LOTE";

export const updateStatusDieta = status => ({
  type: UPDATE_STATUS,
  payload: status
});

export const updateTituloDieta = titulo => ({
  type: UPDATE_TITULO,
  payload: titulo
});

export const updateLoteDieta = lote => ({
  type: UPDATE_LOTE,
  payload: lote
});

const initialState = {
  statusDieta: "",
  tituloDieta: "",
  loteDieta: ""
};

//reducer
export const filtersDietaReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_STATUS:
      return {
        ...state,
        statusDieta: action.payload
      };
    case UPDATE_TITULO:
      return {
        ...state,
        tituloDieta: action.payload
      };
    case UPDATE_LOTE:
      return {
        ...state,
        loteDieta: action.payload
      };
    default:
      return state;
  }
};
