import { API_URL } from "../constants/config.constants";
import authService from "./auth";
import { getCODAEPedidosInclusaoAvulsoPendentes } from "./inclusaoDeAlimentacaoAvulsa.service";
import { getCODAEPedidosInclusaoContinuosPendentes } from "./inclusaoDeAlimentacaoContinua.service";
import { getCODAEPedidosDeInversoes } from "./inversaoDeDiaDeCardapio.service";
import { getCODAEPedidosKitLanchePendentes } from "./solicitacaoDeKitLanche.service";
import { getCODAEPedidosSolicitacoesUnificadas } from "./solicitacaoUnificada.service";
import { getCODAEPedidosAlteracaoCardapio } from "./alteracaoDecardapio.service";
import {
  filtraPrioritarios,
  filtraNoLimite,
  filtraRegular
} from "../components/InversaoDeDiaDeCardapio/DRE/PainelPedidos/helper";

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

export const getResumoPendenciasInclusaoAlimentacao = async (
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

  const solicitacoesContinuas = await getCODAEPedidosInclusaoContinuosPendentes(
    filtro
  );
  const soliticacoesAvulsas = await getCODAEPedidosInclusaoAvulsoPendentes(
    filtro
  );

  if (solicitacoesContinuas && soliticacoesAvulsas) {
    const todasTmp = solicitacoesContinuas.results.concat(
      soliticacoesAvulsas.results
    );

    pedidosPrioritarios = filtraPrioritarios(todasTmp);
    pedidosLimite = filtraNoLimite(todasTmp);
    pedidosRegular = filtraRegular(todasTmp);
  }

  resposta.limite = pedidosLimite.length;
  resposta.prioritario = pedidosPrioritarios.length;
  resposta.regular = pedidosRegular.length;
  resposta.total = resposta.limite + resposta.prioritario + resposta.regular;

  return resposta;
};

export const getResumoPendenciasKitLancheAvulso = async (
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

  const solicitacoesContinuas = await getCODAEPedidosKitLanchePendentes(filtro);

  if (solicitacoesContinuas) {
    pedidosPrioritarios = filtraPrioritarios(solicitacoesContinuas.results);
    pedidosLimite = filtraNoLimite(solicitacoesContinuas.results);
    pedidosRegular = filtraRegular(solicitacoesContinuas.results);
  }

  resposta.limite = pedidosLimite.length;
  resposta.prioritario = pedidosPrioritarios.length;
  resposta.regular = pedidosRegular.length;
  resposta.total = resposta.limite + resposta.prioritario + resposta.regular;

  return resposta;
};

export const getResumoPendenciasKitLancheUnificado = async (
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

  const solicitacoesUnificadas = await getCODAEPedidosSolicitacoesUnificadas(
    filtro
  );

  if (solicitacoesUnificadas) {
    pedidosPrioritarios = filtraPrioritarios(solicitacoesUnificadas.results);
    pedidosLimite = filtraNoLimite(solicitacoesUnificadas.results);
    pedidosRegular = filtraRegular(solicitacoesUnificadas.results);
  }

  resposta.limite = pedidosLimite.length;
  resposta.prioritario = pedidosPrioritarios.length;
  resposta.regular = pedidosRegular.length;
  resposta.total = resposta.limite + resposta.prioritario + resposta.regular;

  return resposta;
};

export const getResumoPendenciasAlteracaoCardapio = async (
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

  const solicitacoesUnificadas = await getCODAEPedidosAlteracaoCardapio(filtro);

  if (solicitacoesUnificadas) {
    pedidosPrioritarios = filtraPrioritarios(solicitacoesUnificadas.results);
    pedidosLimite = filtraNoLimite(solicitacoesUnificadas.results);
    pedidosRegular = filtraRegular(solicitacoesUnificadas.results);
  }

  resposta.limite = pedidosLimite.length;
  resposta.prioritario = pedidosPrioritarios.length;
  resposta.regular = pedidosRegular.length;
  resposta.total = resposta.limite + resposta.prioritario + resposta.regular;

  return resposta;
};
