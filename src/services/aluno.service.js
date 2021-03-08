import axios from "./_base";

export const getAlunoPertenceAEscola = (codigo_eol, escola_codigo_eol) => {
  const url = `/alunos/${codigo_eol}/aluno-pertence-a-escola/${escola_codigo_eol}/`;
  return axios.get(url);
};
