import { API_URL } from '../constants/config.constants'

export const TOKEN_ALIAS = "TOKEN";

export const getKitsByApi = ()=>{
    
    const url = API_URL + '/kit-lanche/'
    const token = localStorage.getItem(TOKEN_ALIAS)

    const obj = {
        headers : {
            'Authorization' : `Token ${token}`,
            'Content-Type': 'application/json'
        }
    }

    return fetch(url, obj)
           .then(response => {
               return response.json()
           })
           .catch(error => {
               console.log(error.json())
           })
}