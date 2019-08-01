import { API_URL } from "../constants/config.constants";
import authService from "./auth";

const authToken = {
  Authorization: `JWT ${authService.getToken()}`,
  "Content-Type": "application/json"
};


export const getDiretoriaRegional = async () => {
  const OBJ_REQUEST = {
    headers: authToken,
    method: "GET"
  };

  const url = API_URL + "/lotes/";
  OBJ_REQUEST["method"] = "GET";
  return await fetch(url, OBJ_REQUEST)
    .then(response => {
      return response.json();
    })
};
