import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { permissionReducer } from "./reducers/permission.reducers";
import foodInclusionReducer from "./reducers/foodInclusionReducer";
import foodSuspensionReducer from "./reducers/foodSuspensionReducer";
import inversaoDeDiaDeCardapioReducer from "./reducers/inversaoDeDiaDeCardapio.reducer";
import alteracaoCardapioReducer from "./reducers/alteracaoCardapioReducer";
import { tourRequestReducer } from "./reducers/tourRequest.reducer";
import loadUnifiedReducer from "./reducers/unifiedSolicitation.reducer";

// Junta todos os reducers do sistema! Vai pra store
const rootReducer = combineReducers({
  form: formReducer,
  inversaoDeDiaDeCardapioForm: inversaoDeDiaDeCardapioReducer,
  permissions: permissionReducer,
  tourRequests: tourRequestReducer,
  alteracaoCardapio: alteracaoCardapioReducer,
  unifiedSolicitation: loadUnifiedReducer,
  foodInclusion: foodInclusionReducer,
  foodSuspension: foodSuspensionReducer
});

export default rootReducer;
