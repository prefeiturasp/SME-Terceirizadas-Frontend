import { API_URL } from "../constants/config.constants";

const authHeader = {
  "Content-Type": "application/json"
};

export const getAPIVersion = () => {
  const url = `${API_URL}/api-version/`;

  const OBJ_REQUEST = {
    headers: authHeader,
    method: "GET"
  };
  return fetch(url, OBJ_REQUEST)
    .then(result => {
      return result.json();
    })
    .catch(error => {
      console.log(error);
    });
};
