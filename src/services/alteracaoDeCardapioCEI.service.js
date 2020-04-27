import axios from "./_base";
import { ENDPOINT } from "../constants";
import { PEDIDOS } from "./constants";

export const getAlunosPorFaixaEtariaNumaData = async (
  periodoUUID,
  dataReferencia
) => {
  return await axios.get(
    `/${
      ENDPOINT.PERIODOS_ESCOLARES
    }/${periodoUUID}/alunos-por-faixa-etaria/${dataReferencia}/`
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

export const atualizaAlteracaoCardapioCei = async data => {
  return axios.patch(`${ENDPOINT.ALTERACOES_CARDAPIO_CEI}/${data.uuid}/`, data);
};

export const deleteAlteracaoCardapioCei = async uuid => {
  return axios.delete(`${ENDPOINT.ALTERACOES_CARDAPIO_CEI}/${uuid}/`);
};

export const getDREPedidosAlteracaoCardapioCei = async filtroAplicado => {
  const url = `${ENDPOINT.ALTERACOES_CARDAPIO_CEI}/${
    PEDIDOS.DRE
  }/${filtroAplicado}/`;
  const response = await axios.get(url);
  const results = response.data.results;
  return {
    results: results.map(el => ({
      ...el,
      isCei: true
    })),
    status: response.status
  };
};

export const getCODAEPedidosAlteracaoCardapioCei = async filtroAplicado => {
  const url = `${ENDPOINT.ALTERACOES_CARDAPIO_CEI}/${
    PEDIDOS.CODAE
  }/${filtroAplicado}/`;
  const response = await axios.get(url);
  const results = response.data.results;
  return {
    results: results.map(el => ({
      ...el,
      isCei: true
    })),
    status: response.status
  };
};
