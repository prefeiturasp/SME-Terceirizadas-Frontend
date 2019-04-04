import { MenuActionEnum } from './menuEnum'

const INITIAL_STATE = { description: 'MEU ESTADO INICIAL2' }

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MenuActionEnum.ADD_CYCLE:
      return {...state, description: 'ALTEROOOUUU'}
    default:
      return state
  }
}
