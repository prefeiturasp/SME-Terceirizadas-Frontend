import { MenuActionEnum } from '../constants/menuEnum'

const INITIAL_STATE = {
  rf: 'ESTADO INICIAL RF',
  cargo: 'ESTADO INICIAL CARGO',
  nome: 'ESTADO INICIAL NOME',
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MenuActionEnum.ADD_CYCLE:
      return { ...state, rf: action.payload }
    case MenuActionEnum.ADD_DAY:
      return { ...state, cargo: action.payload }
    case MenuActionEnum.RF_EDITED:
      return {
        ...state,
        nome: action.payload,
        rf: action.payload,
        cargo: action.payload
      }
    default:
      return state
  }
}

