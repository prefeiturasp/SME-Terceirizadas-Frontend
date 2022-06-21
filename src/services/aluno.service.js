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

export const updateFotoAluno = async (codigo_eol_aluno, files) => {
  const url = `/alunos/${codigo_eol_aluno}/atualizar-foto/`;
  const headers = { "content-type": "multipart/form-data" };
  const formData = new FormData();
  formData.append("file", files[0]);
  const response = await axios
    .post(url, formData, {
      headers: headers
    })
    .catch(ErrorHandlerFunction);
  if (response) {
    const data = { data: response.data, status: response.status };
    return data;
  }
};

export const deleteFotoAluno = async codigo_eol_aluno => {
  const url = `/alunos/${codigo_eol_aluno}/deletar-foto/`;
  const response = await axios.delete(url).catch(ErrorHandlerFunction);
  if (response) {
    const data = { data: response.data, status: response.status };
    return data;
  }
};
