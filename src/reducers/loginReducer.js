import { userConstants } from "../constants/user.constants";
const INITIAL_STATE = {
  email: "weslei.souza@amcom.com.br",
  password: "admin123456",
  subimitted: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userConstants.LOGIN_SUCCESS:
      return "xzxxx";
    case userConstants.LOGIN_REQUEST:
      return "xzxxx";
    case userConstants.LOGIN_FAILURE:
      return "xzxxx";
    case userConstants.EMAIL_EDITED:
      return { ...state, email: action.payload };
    case userConstants.PASSWD_EDITED:
      return { ...state, password: action.payload };
    default:
      return state;
  }
};
