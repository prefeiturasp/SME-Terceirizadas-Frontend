import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { permissionReducer } from './reducers/permission.reducers'
import foodInclusionReducer from './reducers/foodInclusionReducer'

// Junta todos os reducers do sistema! Vai pra store
const rootReducer = combineReducers({
  form: formReducer,
  permissions : permissionReducer,
  foodInclusion: foodInclusionReducer
});

export default rootReducer;
