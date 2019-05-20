import { API_URL } from '../constants/config.constants'

export const TOKEN_ALIAS = "TOKEN";
export const TOKEN = localStorage.getItem(TOKEN_ALIAS)
export const URL_SOLICITAR = API_URL + '/solicitar-kit-lanche/'

export const OBJ_REQUEST = {
    headers: {
        'Authorization': `JWT ${TOKEN}`,
        'Content-Type': 'application/json'
    }
}

export const getKitsByApi = async () => {

    const url = API_URL + '/solicitar-kit-lanche/'
    OBJ_REQUEST['method'] = 'GET'
    return await fetch(url, OBJ_REQUEST)
        .then(response => {
            const resp = response.json()
            return resp
        })
        .catch(error => {
            console.log('Error Kit Lanche: ', error)
            return {}
        })
}


export const getQuatidadeAlunoApi = async () => {
    const url = API_URL + '/kit-lanche/students/'
    OBJ_REQUEST['method'] = 'GET'
    return await fetch(url, OBJ_REQUEST)
        .then(response => {
            return response.json()
        })
        .catch(erro => {
            console.log('Error quantidade de aluno: ', erro)
            return {}
        })
}

export const salvarKitLanche = async (values) => {
    OBJ_REQUEST['method'] = 'POST'
    OBJ_REQUEST['body'] = JSON.stringify(values)
    
    return await fetch(URL_SOLICITAR, OBJ_REQUEST)
        .then(response => {
            return response.json()
        })
        .catch(error => {
            console.log('Salvar Kit Lanche: ', error)
        })
}

export const atualizarKitLanche = async (values) => {
    OBJ_REQUEST['method'] = 'PUT'
    OBJ_REQUEST['body'] = JSON.stringify(values)

    return await fetch(URL_SOLICITAR, OBJ_REQUEST)
        .then(response => {
            return response.json()
        })
        .catch(erro => {
            console.log('Atualizar Kit Lanche: ', erro)
        })
}



export const removeKitLanche = async (idKit) => {
    OBJ_REQUEST['method'] = 'DELETE'
    OBJ_REQUEST['body'] = JSON.stringify({'id':idKit})

    return await fetch(URL_SOLICITAR + '/'+ idKit, OBJ_REQUEST)
        .then(response => {
            return response.json()
        })
        .catch(erro => {
            console.log('Remover Kit Lanche: ', erro)
        })
}