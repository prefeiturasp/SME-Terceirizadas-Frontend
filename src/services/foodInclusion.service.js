import { API_URL } from '../constants/config.constants'

export const createOrUpdateFoodInclusion = (user_uuid, payload) => {
  const url = API_URL + `/food_inclusion/${user_uuid}/create_or_update/`
  return fetch(url, {
      method: "POST",
        body: payload,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      })
      .then(result => {
          return result.json()
      }).catch(error => {
          return error.json()
      })
}

export const deleteFoodInclusion = (user_uuid, payload) => {
  const url = API_URL + `/food_inclusion/${user_uuid}/delete/`
  return fetch(url, {
      method: "DELETE",
        body: payload,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      })
      .then(result => {
          return result.json()
      }).catch(error => {
          return error.json()
      })
}

export const getSavedFoodInclusions = (user_uuid) => {
  const url = API_URL + `/food_inclusion/${user_uuid}/get_saved_food_inclusions/`
  return fetch(url)
      .then(result => {
          return result.json()
      }).catch(error => {
          console.log(error);
      })
}

export const getReasons = (user_uuid) => {
  const url = API_URL + `/food_inclusion/${user_uuid}/get_reasons/`
  return fetch(url)
      .then(result => {
          return result.json()
      }).catch(error => {
          console.log(error);
      })
}
