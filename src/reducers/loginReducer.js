import React from 'react';
import { userConstants } from "../constants/user.constants";
import {Redirect} from 'react-router-dom'
const INITIAL_STATE = {
  email: '',
  password: '',
  subimitted: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userConstants.LOGIN_SUCCESS:
      return () =>(
        <Redirect to="/" />
      );
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
