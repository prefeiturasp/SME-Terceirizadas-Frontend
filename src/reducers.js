import { combineReducers } from "redux";
import dayChangeReducer from "./reducers/dayChangeReducer";
import loginReducer from "./reducers/loginReducer";
import { reducer as formReducer } from "redux-form";

// Junta todos os reducers do sistema! Vai pra store
const rootReducer = combineReducers({
  dayChange: dayChangeReducer,
  login: loginReducer,
  form: formReducer
});

export default rootReducer;
