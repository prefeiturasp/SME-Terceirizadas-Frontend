//actions
export const UPDATE_TITULO = "UPDATE_TITULO";
export const UPDATE_LOTE = "UPDATE_LOTE";
export const UPDATE_STATUS = "UPDATE_STATUS";
export const UPDATE_TIPO_SOLICITACAO = "UPDATE_TIPO_SOLICITACAO";
export const UPDATE_DATA_EVENTO = "UPDATE_DATA_EVENTO";
export const RESET_CAMPOS = "RESET_CAMPOS";

export const updateTituloAlimentacao = titulo => ({
  type: UPDATE_TITULO,
  payload: titulo
});

export const updateStatusAlimentacao = status => ({
  type: UPDATE_STATUS,
  payload: status
});

export const updateLoteAlimentacao = lote => ({
  type: UPDATE_LOTE,
  payload: lote
});

export const updateTipoSolicitacaoAlimentacao = tipo_solicitacao => ({
  type: UPDATE_TIPO_SOLICITACAO,
  payload: tipo_solicitacao
});

export const updateDataEventoAlimentacao = data_evento => ({
  type: UPDATE_DATA_EVENTO,
  payload: data_evento
});

export const resetCamposAlimentacao = () => {
  return {
    type: RESET_CAMPOS
  };
};

const initialState = {
  tituloAlimentacao: "",
  statusAlimentacao: "",
  loteAlimentacao: "",
  tipoSolicitacaoAlimentacao: "",
  dataEventoAlimentacao: ""
};

//reducer
export const filtersAlimentacaoReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_STATUS:
      console.log(action.payload, "filter status");
      return {
        ...state,
        statusAlimentacao: action.payload
      };
    case UPDATE_TITULO:
      console.log(action.payload, "filter pesquisar");
      return {
        ...state,
        tituloAlimentacao: action.payload
      };
    case UPDATE_LOTE:
      console.log(action.payload, "filter lote");
      return {
        ...state,
        loteAlimentacao: action.payload
      };
    case UPDATE_TIPO_SOLICITACAO:
      console.log(action.payload, "filter solicitacao");
      return {
        ...state,
        tipoSolicitacaoAlimentacao: action.payload
      };
    case UPDATE_DATA_EVENTO:
      console.log(action.payload, "filter data");
      return {
        ...state,
        dataEventoAlimentacao: action.payload
      };
    case RESET_CAMPOS:
      return {
        ...state,
        tituloAlimentacao: "",
        statusAlimentacao: "",
        loteAlimentacao: "",
        tipoSolicitacaoAlimentacao: "",
        dataEventoAlimentacao: ""
      };
    default:
      return state;
  }
};
