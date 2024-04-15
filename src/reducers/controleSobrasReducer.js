// Actions

const SET_DADOS_RESULTADOS =
  "SME-Terceirizadas-Frontend/controle-sobras/SET_DADOS_RESULTADOS";
const SET_TOTAL_RESULTADOS =
  "SME-Terceirizadas-Frontend/controle-sobras/SET_TOTAL_RESULTADOS";

const SET_EXIBIR_RESULTADOS =
  "SME-Terceirizadas-Frontend/controle-sobras/SET_EXIBIR_RESULTADOS";
const SET_FILTROS =
  "SME-Terceirizadas-Frontend/dieta-especial/controle-sobras/SET_FILTROS";

const SET_PAGE = "SME-Terceirizadas-Frontend/controle-sobras/SET_PAGE";

const SET_ESCOLAS = "SME-Terceirizadas-Frontend/controle-sobras/SET_ESCOLAS";

const SET_DIRETORIAS_REGIONAIS =
  "SME-Terceirizadas-Frontend/controle-sobras/SET_SET_DIRETORIAS_REGIONAIS";

const SET_TIPOS_ALIMENTO =
  "SME-Terceirizadas-Frontend/controle-sobras/SET_TIPOS_ALIMENTO";

const SET_TIPOS_RECIPIENTE =
  "SME-Terceirizadas-Frontend/controle-sobras/SET_SET_TIPOS_RECIPIENTE";

const SET_MEUS_DADOS =
  "SME-Terceirizadas-Frontend/controle-sobras/SET_SET_MEUS_DADOS";

const RESET = "SME-Terceirizadas-Frontend/controle-sobras/RESET";

const initialValues = {
  filtros: undefined,
  dadosResultados: undefined,
  exibirResultados: false,
  totalResultados: 0,
  page: 1,
  escolas: [],
  diretoriasRegionais: [],
  tiposAlimento: [],
  tiposRecipiente: [],
  meusDados: undefined,
};

// Reducer
export default function controleSobrasReducer(
  state = initialValues,
  action = {}
) {
  switch (action.type) {
    case SET_DADOS_RESULTADOS:
      return {
        ...state,
        dadosResultados: action.payload,
      };
    case SET_TOTAL_RESULTADOS:
      return {
        ...state,
        totalResultados: action.payload,
      };
    case SET_EXIBIR_RESULTADOS:
      return {
        ...state,
        exibirResultados: action.payload,
      };
    case SET_FILTROS:
      return {
        ...state,
        filtros: action.payload,
      };
    case SET_PAGE:
      return {
        ...state,
        page: action.payload,
      };
    case SET_ESCOLAS:
      return {
        ...state,
        escolas: action.payload,
      };
    case SET_DIRETORIAS_REGIONAIS:
      return {
        ...state,
        diretoriasRegionais: action.payload,
      };
    case SET_TIPOS_ALIMENTO:
      return {
        ...state,
        tiposAlimento: action.payload,
      };
    case SET_TIPOS_RECIPIENTE:
      return {
        ...state,
        tiposRecipiente: action.payload,
      };
    case SET_MEUS_DADOS:
      return {
        ...state,
        meusDados: action.payload,
      };

    case RESET:
      return {
        ...state,
        ...initialValues,
      };
    default:
      return state;
  }
}

// Action Creators
export const setDadosResultados = (dadosResultados) => ({
  type: SET_DADOS_RESULTADOS,
  payload: dadosResultados,
});

export const setTotalResultados = (totalResultados) => ({
  type: SET_TOTAL_RESULTADOS,
  payload: totalResultados,
});

export const setExibirResultados = (exibirResultados) => ({
  type: SET_EXIBIR_RESULTADOS,
  payload: exibirResultados,
});

export const setFiltros = (filtros) => ({
  type: SET_FILTROS,
  payload: filtros,
});

export const setPage = (pageNumber) => ({
  type: SET_PAGE,
  payload: pageNumber,
});

export const setEscolas = (escolas) => ({
  type: SET_ESCOLAS,
  payload: escolas,
});

export const setDiretoriasRegionais = (dre) => ({
  type: SET_DIRETORIAS_REGIONAIS,
  payload: dre,
});

export const setTiposAlimento = (tiposAlimento) => ({
  type: SET_TIPOS_ALIMENTO,
  payload: tiposAlimento,
});

export const setTiposRecipiente = (tiposRecipiente) => ({
  type: SET_TIPOS_RECIPIENTE,
  payload: tiposRecipiente,
});

export const setMeusDados = (meusDados) => ({
  type: SET_MEUS_DADOS,
  payload: meusDados,
});

export const reset = () => ({
  type: RESET,
});
