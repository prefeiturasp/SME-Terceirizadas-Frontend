import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

// Junta todos os reducers do sistema! Vai pra store
const rootReducer = combineReducers({
  form: formReducer
});

export default rootReducer;
