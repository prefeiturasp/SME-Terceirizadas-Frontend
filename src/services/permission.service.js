import API_MOCK from '../constants/config.constants'

export const getPermissionsByApi = () => {
    const url = API_MOCK.API_MOCK + '/permissions'
    return fetch(url)
        .then(result => {
            return result.json()
        }).catch(error => {
            return error.json()
        })
}