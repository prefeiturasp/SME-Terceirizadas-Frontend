import axios from "./_base";
import authService from "./auth";
import { ENDPOINT } from "../constants";
import { PEDIDOS } from "./constants";
import { API_URL } from "../constants/config.constants";


const URL_INCLUSAO_ALIMENTACAO_CEI = `${API_URL}/inclusoes-alimentacao-da-cei`;

const {
    QUANTIDADE_ALUNOS_POR_PERIODO,
    INCLUSOES_ALIMENTACAO_DA_CEI,
} = ENDPOINT

const authToken = {
  Authorization: `JWT ${authService.getToken()}`,
  "Content-Type": "application/json"
};

export const getDREPedidosDeInclusaoAlimentacaoDaCei = async filtroAplicado => {
  const url = `${URL_INCLUSAO_ALIMENTACAO_CEI}/${PEDIDOS.DRE}/${filtroAplicado}/`;
  const OBJ_REQUEST = {
    headers: authToken,
    method: "GET"
  };
  try {
    const result = await fetch(url, OBJ_REQUEST);
    const status = result.status;
    const json = await result.json();
    return { results: json.results.map(el=>({
      ...el,
      isCei: true,
    })) ,
       status };
  } catch (error) {
    console.log(error); //FIXME: show error ui
  }
};

export const meusRascunhosDeInclusaoDeAlimentacao = async () => {
  return await axios.get(`/${INCLUSOES_ALIMENTACAO_DA_CEI}/minhas-solicitacoes/`);
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
  return await axios.post(
    `/${INCLUSOES_ALIMENTACAO_DA_CEI}/`,
    payload
  );
};

export const excluirInclusoesDaCei = async uuid => {
  return await axios.delete(
    `/${INCLUSOES_ALIMENTACAO_DA_CEI}/${uuid}/`
  );
};

export const atualizarInclusoesDaCEI = async (payload, uuid) => {
  return await axios.put(
    `/${INCLUSOES_ALIMENTACAO_DA_CEI}/${uuid}/`,
    payload
  );
};

export const iniciarInclusoesDaCEI = async uuid => {
  return await axios.patch(
    `/${INCLUSOES_ALIMENTACAO_DA_CEI}/${uuid}/inicio-pedido/`
  );
};
