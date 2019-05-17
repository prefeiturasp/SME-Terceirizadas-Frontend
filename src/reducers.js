import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import {permissionReducer} from './reducers/permission.reducers'
import { tourRequestReducer } from './reducers/tourRequest.reducer'

// Junta todos os reducers do sistema! Vai pra store
const rootReducer = combineReducers({
  form: formReducer,
  permissions : permissionReducer,
  tourRequests : tourRequestReducer
});

export default rootReducer;
