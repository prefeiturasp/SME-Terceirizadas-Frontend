import { filtraNoLimite, filtraPrioritarios, filtraRegular } from "../components/InversaoDeDiaDeCardapio/CODAE/PainelPedidos/helper";
import { API_URL } from "../constants/config.constants";
import authService from "./auth";
import { getCODAEPedidosDeInversoes } from "./inversaoDeDiaDeCardapio.service";

const authToken = {
  Authorization: `JWT ${authService.getToken()}`,
  "Content-Type": "application/json"
};

export const getSolicitacoesAprovadosCodae = async () => {
  const url = `${API_URL}/codae-solicitacoes/aprovados/`;

  const OBJ_REQUEST = {
    headers: authToken,
    method: "GET"
  };
  try {
    const result = await fetch(url, OBJ_REQUEST);
    const json = await result.json();
    return json.results;
  } catch (error) {}
};

export const getSolicitacoesCanceladasCodae = async () => {
  const url = `${API_URL}/codae-solicitacoes/cancelados/`;

  const OBJ_REQUEST = {
    headers: authToken,
    method: "GET"
  };
  try {
    const result = await fetch(url, OBJ_REQUEST);
    const json = await result.json();
    return json.results;
  } catch (error) {}
};

export const getSolicitacoesPendentesAprovacaoCodae = async () => {
  const url = `${API_URL}/codae-solicitacoes/pendentes-aprovacao/`;

  const OBJ_REQUEST = {
    headers: authToken,
    method: "GET"
  };
  try {
    const result = await fetch(url, OBJ_REQUEST);
    const json = await result.json();
    return json.results;
  } catch (error) {}
};

export const getSolicitacoesRevisaoAprovacaoCodae = async () => {
  const url = `${API_URL}/codae-solicitacoes/solicitacoes-revisao/`;

  const OBJ_REQUEST = {
    headers: authToken,
    method: "GET"
  };
  try {
    const result = await fetch(url, OBJ_REQUEST);
    const json = await result.json();
    return json.results;
  } catch (error) {}
};

export const getResumoPendenciasInversoesCardapio = async (
  filtro = "sem_filtro"
) => {
  let resposta = {
    total: 0,
    prioritario: 0,
    limite: 0,
    regular: 0
  };

  let pedidosPrioritarios = [];
  let pedidosLimite = [];
  let pedidosRegular = [];

  const solicitacoes = await getCODAEPedidosDeInversoes(filtro);

  if (solicitacoes) {
    pedidosPrioritarios = filtraPrioritarios(solicitacoes.results);
    pedidosLimite = filtraNoLimite(solicitacoes.results);
    pedidosRegular = filtraRegular(solicitacoes.results);
  }

  resposta.limite = pedidosLimite.length;
  resposta.prioritario = pedidosPrioritarios.length;
  resposta.regular = pedidosRegular.length;
  resposta.total = resposta.limite + resposta.prioritario + resposta.regular;

  return resposta;
};
