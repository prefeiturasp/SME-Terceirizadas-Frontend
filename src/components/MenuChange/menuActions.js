import { MenuActionEnum } from '../../constants/menuEnum'

export const addCycle = event => ({
  type: MenuActionEnum.ADD_CYCLE,
  payload: 'ADD CYCLE CLICKED'
})


export const addDay = event => ({
  type: MenuActionEnum.ADD_DAY,
  payload: 'ADD DAY CLICKED'
})
