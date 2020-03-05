import axios from "./_base";
import { ENDPOINT } from "../constants";

export const getAlunosPorFaixaEtariaNumaData = async (
  escolaPeriodoUUID,
  dataReferencia
) => {
  return await axios.get(
    `/${
      ENDPOINT.QUANTIDADE_ALUNOS_POR_PERIODO
    }/${escolaPeriodoUUID}/alunos-por-faixa-etaria/${dataReferencia}/`
  );
};

export const getEscolaPeriodoEscolares = async () => {
  const url = `/${ENDPOINT.QUANTIDADE_ALUNOS_POR_PERIODO}/`;
  return axios.get(url);
};

export const getMeusRascunhosAlteracoesCardapioCei = async () => {
  const url = `/${ENDPOINT.ALTERACOES_CARDAPIO_CEI}/${
    ENDPOINT.MINHAS_SOLICITACOES
  }/`;
  return axios.get(url);
};

export const criaAlteracaoCardapioCei = async data => {
  return axios.post(`${ENDPOINT.ALTERACOES_CARDAPIO_CEI}/`, data);
};

export const iniciaFluxoAlteracaoCardapioCei = async uuid => {
  return axios.patch(
    `${ENDPOINT.ALTERACOES_CARDAPIO_CEI}/${uuid}/${ENDPOINT.INICIO_PEDIDO}/`
  );
};

export const deleteAlteracaoCardapioCei = async uuid => {
  return axios.delete(`${ENDPOINT.ALTERACOES_CARDAPIO_CEI}/${uuid}/`);
};
