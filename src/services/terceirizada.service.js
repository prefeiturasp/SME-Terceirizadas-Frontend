import { API_URL } from "../constants/config.constants";
import authService from "./auth";

const authToken = {
  Authorization: `JWT ${authService.getToken()}`,
  "Content-Type": "application/json"
};

export const getTerceirizada = () => {
  const url = `${API_URL}/terceirizadas/`;
  let status = 0;
  return fetch(url, {
    headers: authToken,
    method: "GET"
  })
    .then(response => {
      status = response.status;
      return response.json();
    })
    .then(data => {
      return { data: data, status: status };
    })
    .catch(error => {
      return error.json();
    });
};
