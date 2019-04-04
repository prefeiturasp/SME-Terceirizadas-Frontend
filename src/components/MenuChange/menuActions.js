import { MenuActionEnum } from './menuEnum'

export const addCycle = event => ({
  type: MenuActionEnum.ADD_CYCLE,
  payload: event.target.value
})
