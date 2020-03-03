import axios from "./_base";
import { ENDPOINT } from "../constants";

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

export const criarInclusoesDaCEI = async payload => {
  return await axios.post(
    `/${ENDPOINT.INCLUSOES_ALIMENTACAO_DA_CEI}/`,
    payload
  );
};

export const excluirInclusoesDaCei = async uuid => {
  return await axios.delete(
    `/${ENDPOINT.INCLUSOES_ALIMENTACAO_DA_CEI}/${uuid}/`
  );
};
