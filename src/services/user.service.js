import { JWT_AUTH, USER_URL } from '../constants/config.constants';
import { authHeader } from '../helpers/auth-headers';

export const userService = {
  login,
  logout,
  getAll
}

function login(email, password) {
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify({ email: email, password: password }),
    headers: { 'Content-Type': 'application/json' }
  }

  return fetch(JWT_AUTH, requestOptions)
    .then(handleResponse)
    .then(user => {
      localStorage.setItem('user', JSON.stringify(user));
      return user.status;
    });
}


function logout() {
  localStorage.removeItem('user');
}


function getAll() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  }

  return fetch(USER_URL, requestOptions)
    .then(handleResponse);
}


function handleResponse(response) {
  return response.text()
    .then(text => {
      const data = text && JSON.parse(text);

      if (!response.ok) {
        if (response.status === 401) {
          logout();
          // location.reload(reload);
        }

        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
      }

      return data;
    });
}
