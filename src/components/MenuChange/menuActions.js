import { MenuActionEnum } from '../../constants/menuEnum'

export const addCycle = event => ({
  type: MenuActionEnum.ADD_CYCLE,
  payload: 'ADD CYCLE CLICKED'
})

export const addDay = event => ({
  type: MenuActionEnum.ADD_DAY,
  payload: 'ADD DAY CLICKED'
})

export const rfInputEdited = (event) => ({
  //TODO: quando tiver um RF valido, buscar da api e preencher no reducer.
  type: MenuActionEnum.RF_EDITED,
  payload: event.target.value
})

export const changeDescription = event => ({
  type: 'DESCRIPTION_CHANGED',
  payload: event.target.value
})
