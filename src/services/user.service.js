import { JWT_AUTH, USER_URL } from '../constants/config.constants';
import { authHeader } from '../helpers/auth-headers';


const login = async (email, password) => {
  try {
    const response = await fetch(JWT_AUTH, {
      method: 'POST',
      body: JSON.stringify({ email: email, password: password }),
      headers: { 'Content-Type': 'application/json' },
    });
    const json = await response.json();
    localStorage.setItem('user', JSON.stringify(json));

    return json
  } catch (error) {
    console.log(error);
  }
};


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
export const userService = {
  login,
  logout,
  getAll
}
