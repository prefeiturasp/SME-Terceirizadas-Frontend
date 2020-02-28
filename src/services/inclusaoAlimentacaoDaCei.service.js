import axios from "./_base";

export const meusRascunhosDeInclusaoDeAlimentacao = async () => {
  return await axios.get(`/inclusoes-alimentacao-da-cei/minhas-solicitacoes/`);
};

export const minhasFaixasEtarias = async () => {
  return await axios.get(`/faixas-etarias/`);
};

export const getQuantidadeAlunosFaixaEtaria = async (
  uuid,
  data_referencia_str
) => {
  return await axios.get(
    `/quantidade-alunos-por-periodo/${uuid}/alunos-por-faixa-etaria/${data_referencia_str}/`
  );
};

export const getQuantidadeAlunosPeriodoEscolar = async uuidEscola => {
  return await axios.get(
    `/quantidade-alunos-por-periodo/escola/${uuidEscola}/`
  );
};
