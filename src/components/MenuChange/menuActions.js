import { MenuActionEnum } from '../../constants/menuEnum'

export const addCycle = event => ({
  type: MenuActionEnum.ADD_CYCLE,
  payload: 'ADD CYCLE CLICKED'
})


export const addDay = event => ({
  type: MenuActionEnum.ADD_DAY,
  payload: 'ADD DAY CLICKED'
})

export const rfInputEdited = (payload) => ({
  //TODO: quando tiver um RF valido, buscar da api e preencher no reducer.
  type: MenuActionEnum.RF_EDITED,
  payload: payload.target.value
})
