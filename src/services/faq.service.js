import axios from "./_base";
import { ENDPOINT } from "../constants";

export const getFaq = async () => {
  return axios.get(
    `/${ENDPOINT.CATEGORIA_PERGUNTAS_FREQUENTES}/perguntas-por-categoria/`
  );
};
