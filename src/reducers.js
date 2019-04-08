import { combineReducers } from "redux";
import loginReducer from "./reducers/loginReducer";
import { reducer as formReducer } from "redux-form";

// Junta todos os reducers do sistema! Vai pra store
const rootReducer = combineReducers({
  login: loginReducer,
  form: formReducer
});

export default rootReducer;
