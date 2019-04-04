import { combineReducers } from 'redux'
import menuReducer from './components/MenuChange/menuReducer'

// Junta todos os reducers do sistema! Vai pra store
const rootReducer = combineReducers({
  menu: menuReducer
})

export default rootReducer
