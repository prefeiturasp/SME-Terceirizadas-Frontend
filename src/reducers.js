import { combineReducers } from 'redux'
import menuReducer from './reducers/menuReducer'
import dayChangeReducer from './reducers/dayChangeReducer';
import loginReducer from './reducers/loginReducer';

// Junta todos os reducers do sistema! Vai pra store
const rootReducer = combineReducers({
  menu: menuReducer,
  dayChange: dayChangeReducer,
  login: loginReducer
  // login: loginReducer,
  // addfood: reducer dele
})

export default rootReducer
