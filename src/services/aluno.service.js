import { ErrorHandlerFunction } from "./service-helpers";
import axios from "./_base";

export const getAlunoPertenceAEscola = (codigo_eol, escola_codigo_eol) => {
  const url = `/alunos/${codigo_eol}/aluno-pertence-a-escola/${escola_codigo_eol}/`;
  return axios.get(url);
};

export const getFotoAluno = async codigo_eol => {
  const url = `/alunos/${codigo_eol}/pegar-foto/`;
  const response = await axios.get(url).catch(ErrorHandlerFunction);
  if (response) {
    const data = { data: response.data, status: response.status };
    return data;
  }
};
