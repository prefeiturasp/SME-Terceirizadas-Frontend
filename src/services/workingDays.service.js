import { API_URL } from "../constants/config.constants";

export const getWorkingDays = () => {
  const url = `${API_URL}/dias-uteis/`
  return fetch(url)
    .then(result => {
      return result.json();
    })
    .catch(error => {
      console.log(error);
    });
};

export const diasUteis = () => {
  const url = API_URL + `/dias-uteis/`;
  return fetch(url)
    .then(resultado => {
      return resultado.json();
    })
    .catch(error => {
      console.log(error);
    });
};
