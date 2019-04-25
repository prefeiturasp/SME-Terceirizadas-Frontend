import { userConstants } from "../constants/user.constants";
import { userService } from "../services/user.service";

export const userActions = {
  login,
  logout,
  getAll
};

function login(email, password) {
  debugger;
  userService.login(email, password).then(
    user => {
      window.location.href = "/";
    },
    error => {
      console.log(error);
    }
  );
}

function logout() {
  userService.logout();
  return { type: userConstants.LOGOUT };
}

function getAll() {
  return dispatch => {
    dispatch(request());

    userService
      .getAll()
      .then(
        users => dispatch(success(users)),
        error => dispatch(failure(error))
      );
  };
}

function request() {
  return { type: userConstants.GETALL_REQUEST };
}
function success(users) {
  return { type: userConstants.GETALL_SUCCESS, users };
}
function failure(error) {
  return { type: userConstants.GETALL_FAILURE, error };
}
