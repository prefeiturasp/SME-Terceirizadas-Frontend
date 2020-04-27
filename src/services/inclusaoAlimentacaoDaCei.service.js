import axios from "./_base";
import { ENDPOINT } from "../constants";
import { PEDIDOS, FLUXO } from "./constants";

const {
  QUANTIDADE_ALUNOS_POR_PERIODO,
  INCLUSOES_ALIMENTACAO_DA_CEI
} = ENDPOINT;

export const getInclusaoDeAlimentacaoDaCei = async uuid => {
  const response = await axios.get(`${INCLUSOES_ALIMENTACAO_DA_CEI}/${uuid}/`);
  return response.data;
};

export const getDREPedidosDeInclusaoAlimentacaoDaCei = async filtroAplicado => {
  const url = `${INCLUSOES_ALIMENTACAO_DA_CEI}/${
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

export const getCODAEPedidosDeInclusaoAlimentacaoDaCei = async filtroAplicado => {
  const url = `${INCLUSOES_ALIMENTACAO_DA_CEI}/${
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

export const DREValidaInclusaoDeAlimentacaoCei = async uuid => {
  const url = `${INCLUSOES_ALIMENTACAO_DA_CEI}/${uuid}/${FLUXO.DRE_VALIDA}/`;
  const response = await axios.patch(url);
  return {
    data: response.data,
    status: response.data.status
  };
};

export const DRENaoValidaInclusaoDeAlimentacaoCei = async (
  uuid,
  justificativa
) => {
  const url = `${INCLUSOES_ALIMENTACAO_DA_CEI}/${uuid}/${FLUXO.DRE_VALIDA}/`;
  const response = await axios.patch(url, { justificativa });
  return {
    data: response.data,
    status: response.data.status
  };
};

export const meusRascunhosDeInclusaoDeAlimentacao = async () => {
  return await axios.get(
    `/${INCLUSOES_ALIMENTACAO_DA_CEI}/minhas-solicitacoes/`
  );
};

export const minhasFaixasEtarias = async () => {
  return await axios.get(`/faixas-etarias/`);
};

export const getQuantidadeAlunosFaixaEtaria = async (
  uuid,
  data_referencia_str
) => {
  return await axios.get(
    `/${QUANTIDADE_ALUNOS_POR_PERIODO}/${uuid}/alunos-por-faixa-etaria/${data_referencia_str}/`
  );
};

export const getQuantidadeAlunosPeriodoEscolar = async uuidEscola => {
  return await axios.get(
    `/${QUANTIDADE_ALUNOS_POR_PERIODO}/escola/${uuidEscola}/`
  );
};

export const criarInclusoesDaCEI = async payload => {
  return await axios.post(`/${INCLUSOES_ALIMENTACAO_DA_CEI}/`, payload);
};

export const excluirInclusoesDaCei = async uuid => {
  return await axios.delete(`/${INCLUSOES_ALIMENTACAO_DA_CEI}/${uuid}/`);
};

export const atualizarInclusoesDaCEI = async (payload, uuid) => {
  return await axios.put(`/${INCLUSOES_ALIMENTACAO_DA_CEI}/${uuid}/`, payload);
};

export const iniciarInclusoesDaCEI = async uuid => {
  return await axios.patch(
    `/${INCLUSOES_ALIMENTACAO_DA_CEI}/${uuid}/inicio-pedido/`
  );
};
