import { MenuActionEnum } from '../constants/menuEnum'
import { userConstants } from '../constants/user.constants'
const INITIAL_STATE = {
  email: 'weslei.souza@amcom.com.br',
  password: 'admin123456',
  subimitted: false
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userConstants.LOGIN_SUCCESS:
      console.log(userConstants.LOGIN_SUCCESS, 'xxx')
      return 'xzxxx'
    case userConstants.LOGIN_REQUEST:
      console.log(userConstants.LOGIN_REQUEST, 'xxx')
      return 'xzxxx'
    case userConstants.LOGIN_FAILURE:
      console.log(userConstants.LOGIN_FAILURE, 'xxx')
      return 'xzxxx'
    default:
      return state
  }
}

