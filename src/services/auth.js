import { JWT_AUTH } from '../App.settings'

export const Authentication = (email, password) => {
  return fetch(JWT_AUTH, {
    method: 'POST',
    body: JSON.stringify({ email : email, password : password }),
    headers: {'Content-Type': 'application/json'}
  }).then(resp => {
    return resp.json();
  }).catch(error => error);
}
