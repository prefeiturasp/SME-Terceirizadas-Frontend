import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { permissionReducer } from "./reducers/permission.reducers";
import alteracaoCardapioReducer from "./reducers/alteracaoCardapioReducer";
import foodInclusionReducer from "./reducers/foodInclusionReducer";
import suspensaoDeAlimentacaoReducer from "./reducers/suspensaoDeAlimentacaoReducer";
import { tourRequestReducer } from "./reducers/tourRequest.reducer";
import loadUnifiedReducer from "./reducers/unifiedSolicitation.reducer";

// Junta todos os reducers do sistema! Vai pra store
const rootReducer = combineReducers({
  form: formReducer,
  permissions: permissionReducer,
  tourRequests: tourRequestReducer,
  alteracaoCardapio: alteracaoCardapioReducer,
  unifiedSolicitation: loadUnifiedReducer,
  foodInclusion: foodInclusionReducer,
  suspensaoDeAlimentacao: suspensaoDeAlimentacaoReducer
});

export default rootReducer;
