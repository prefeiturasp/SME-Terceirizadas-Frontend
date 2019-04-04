import { combineReducers } from 'redux'
import menuReducer from './reducers/menuReducer'
import dayChangeReducer from './reducers/dayChangeReducer';

// Junta todos os reducers do sistema! Vai pra store
const rootReducer = combineReducers({
  menu: menuReducer,
  dayChange: dayChangeReducer
})

export default rootReducer
