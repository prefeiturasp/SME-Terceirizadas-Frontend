import { API_URL } from "../constants/config";

export const getDiasUteis = () => {
  const url = `${API_URL}/dias-uteis/`;
  return fetch(url)
    .then(resultado => {
      return resultado.json();
    })
    .catch(error => {
      console.log(error);
    });
};
