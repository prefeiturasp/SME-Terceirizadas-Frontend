import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import foodInclusionReducer from "./reducers/foodInclusionReducer";
import suspensaoDeAlimentacaoReducer from "./reducers/suspensaoDeAlimentacaoReducer";
import inversaoDeDiaDeCardapioReducer from "./reducers/inversaoDeDiaDeCardapio.reducer";
import alteracaoCardapioReducer from "./reducers/alteracaoCardapioReducer";
import loteReducer from "./reducers/lote.reducer";
import loadUnifiedReducer from "./reducers/unifiedSolicitation.reducer";
import editalReducer from "./reducers/edital.reducer";
import loadTipoAlimentacao from "./reducers/tipoAlimentacaoReducer";
import loadEmpresa from "./reducers/empresa.reducer";
import loadFiltroBusca from "./reducers/loadFiltroBusca";

// Junta todos os reducers do sistema! Vai pra store
const rootReducer = combineReducers({
  form: formReducer,
  inversaoDeDiaDeCardapioForm: inversaoDeDiaDeCardapioReducer,
  alteracaoCardapio: alteracaoCardapioReducer,
  unifiedSolicitation: loadUnifiedReducer,
  foodInclusion: foodInclusionReducer,
  loteForm: loteReducer,
  suspensaoDeAlimentacao: suspensaoDeAlimentacaoReducer,
  cadastroEditaisForm: editalReducer,
  TipoDeAlimentacaoForm: loadTipoAlimentacao,
  cadastroEmpresaForm: loadEmpresa,
  FiltrosDeBuscaForm: loadFiltroBusca
});

export default rootReducer;
