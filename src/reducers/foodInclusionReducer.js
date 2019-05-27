const LOAD_FOOD_INCLUSION = 'LOAD_FOOD_INCLUSION'

export default function reducer (state = {}, action) {
  switch (action.type) {
    case LOAD_FOOD_INCLUSION:
      if (action.data != null)
      action.data.day_reasons.forEach(function(day_reason) {
        action.data[`day_reasons_${day_reason.id}`] = day_reason
      });
      return {
        data: {
          ...action.data,
        }
      }
    default:
      return state
  }
}

export const loadFoodInclusion = data => dispatch =>
  dispatch({ type: LOAD_FOOD_INCLUSION, data })
