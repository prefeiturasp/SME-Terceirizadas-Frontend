import { MenuActionEnum } from '../constants/menuEnum'

const INITIAL_STATE = {
  rf: '',
  cargo: 'ESTADO INICIAL CARGO',
  nome: ''
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MenuActionEnum.ADD_CYCLE:
      return { ...state, rf: action.payload }
    case MenuActionEnum.ADD_DAY:
      return { ...state, cargo: action.payload }
    case MenuActionEnum.RF_EDITED:
      return { ...state, nome: action.payload, cargo: 'outro campo sendo alterado'}
    default:
      return state
  }
}
