import axios from "./_base";
import { API_URL } from "../constants/config";

export const getDiasUteis = async (params) => {
  const url = `${API_URL}/dias-uteis/`;
  try {
    return await axios.get(url, { params });
  } catch (error) {
    console.log(error);
  }
};

export const getFeriadosAno = async () => {
  const url = `${API_URL}/feriados-ano/`;
  try {
    return await axios.get(url);
  } catch (error) {
    console.log(error);
  }
};
