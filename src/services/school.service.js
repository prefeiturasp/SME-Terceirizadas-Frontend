import { API_URL } from '../constants/config.constants'

export const getPeriods = (user_uuid) => {
  const url = API_URL + `/school/${user_uuid}/get_periods/`;
  return fetch(url)
      .then(result => {
          return result.json()
      }).catch(error => {
          return error.json()
      })
}

export const getSchools = () => {
  var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
      targetUrl = 'https://pratoaberto.sme.prefeitura.sp.gov.br/api/escolas'
  return fetch(proxyUrl + targetUrl)
      .then(result => {
          return result.json()
      }).catch(error => {
          return error.json()
      })
  }
