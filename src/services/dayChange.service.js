import { API_URL } from '../constants/config.constants'
import authService from "./auth";

const authToken = {
    Authorization: `JWT ${authService.getToken()}`,
    "Content-Type": "application/json"
};

export const carregarInversoes = async () => {
    const url = API_URL + `/inverter-dia-cardapio/`
    const OBJ_REQUEST = {
        headers: authToken,
        method: "GET"
    };

    return await fetch(url, OBJ_REQUEST)
        .then(response => {
            return response.json()
        }).catch(error => {
            console.log('ERROR GET INVERSÃO DE DIA CARDAPIO', error)
        })
}

export const salvarInversao = async (values) => {
    const url = API_URL + `/inverter-dia-cardapio/salvar/`
    const OBJ_REQUEST = {
        headers: authToken,
        method: 'POST',
        body: JSON.stringify(values)
    }
    return await fetch(url, OBJ_REQUEST)
        .then(response => {
            return response.json()
        }).catch(erro => {
            console.log('ERROR SALVAR INVERSÃO DE DIA CARDAPIO', erro)
        })
}

export const solicitarInversao = async (values) => {
    const url = API_URL + `/inverter-dia-cardapio/`
    const OBJ_REQUEST = {
        headers: authToken,
        method: 'POST',
        body: JSON.stringify(values)
    }

    return await fetch(url, OBJ_REQUEST)
        .then(response => {
            return response.json()
        }).catch(erro => {
            console.log('ERROR SOLICITAÇÃO INVERSÃO DE DIA CARDAPIO', erro)
        })
}

export const deletaInversao = async (uuid) => {
    const url = API_URL + `/inverter-dia-cardapio/${uuid}`
    const OBJ_REQUEST = {
        headers: authToken,
        method: 'DELETE',
    }

    return await fetch(url, OBJ_REQUEST)
        .then(response => {
            return response.json()
        }).catch(erro => {
            console.log('ERROR DELETAR INVERSÃO DE DIA CARDAPIO', erro)
        })
}