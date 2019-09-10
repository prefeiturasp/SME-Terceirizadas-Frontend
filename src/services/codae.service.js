import { API_URL } from "../constants/config.constants";
import authService from "./auth";

const authToken = {
  Authorization: `JWT ${authService.getToken()}`,
  "Content-Type": "application/json"
};

export const getTotalAlunos = async () => {
  const url = `${API_URL}/codae/`;
  const OBJ_REQUEST = {
    headers: authToken,
    method: "GET"
  };
  try {
    const result = await fetch(url, OBJ_REQUEST);
    const json = await result.json();
    return json.results[0].quantidade_alunos;
  } catch (error) {
    return error.json;
  }
};
