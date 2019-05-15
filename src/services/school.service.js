import { API_URL } from '../constants/config.constants'

export const getPeriods = (user_uuid) => {
  const url = API_URL + `/school/${user_uuid}/get_periods/`
  return fetch(url)
      .then(result => {
          return result.json()
      }).catch(error => {
          return error.json()
      })
}
