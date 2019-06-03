import { API_URL } from '../constants/config.constants'
import authService from "./auth";

const authToken = {
  'Authorization': `JWT ${authService.getToken()}`,
  'Content-Type': 'application/json'
}

export const createOrUpdateUnifiedSolicitation = (payload) => {
  const url = API_URL + `/solicitacao-unificada/salvar/`
  return fetch(url, {
      method: "POST",
        body: payload,
        headers: authToken
      })
      .then(result => {
          console.log(result.json());
          return result.json()
      }).catch(error => {
          return error.json()
      })
}

export const getUnifiedSolicitations = async () => {
  const OBJ_REQUEST = {
      headers: authToken,
      method: 'GET'
  }
  const url = API_URL + '/solicitacao-unificada/'
  return await fetch(url, OBJ_REQUEST)
      .then(response => {
          return response.json()
      })
      .catch(error => {
          console.log('Error Kit Lanche: ', error)
          return {}
      })
}
