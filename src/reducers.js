import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { permissionReducer } from './reducers/permission.reducers'
import foodInclusionReducer from './reducers/foodInclusionReducer'
import { tourRequestReducer } from './reducers/tourRequest.reducer'

// Junta todos os reducers do sistema! Vai pra store
const rootReducer = combineReducers({
  form: formReducer,
  permissions : permissionReducer,
  foodInclusion: foodInclusionReducer,
  tourRequests : tourRequestReducer
});

export default rootReducer;
