import  {GET_PERMS}  from '../constants/permission.constants'
import { getPermissionsByApi } from '../services/permission.service'


export const getPermissions = () => ({
    type: GET_PERMS,
    payload: getPermissionsByApi()
})