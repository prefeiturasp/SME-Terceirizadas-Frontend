import { API_URL } from "../constants/config";
import axios from "./_base";
import {
  filtraNoLimite,
  filtraPrioritarios,
  filtraRegular,
} from "./../components/InversaoDeDiaDeCardapio/Terceirizada/PainelPedidos/helper";
import { SOLICITACOES } from "./constants";
import { getTerceirizadaPedidosDeAlteracaoCardapio } from "services/alteracaoDeCardapio";
import { terceirizadaListarSolicitacoesDeInclusaoDeAlimentacao } from "services/inclusaoDeAlimentacao";
import { getTerceirizadaPedidosDeInversoes } from "./inversaoDeDiaDeCardapio.service";
import { getTerceirizadasPedidosDeKitLanche } from "services/kitLanche";
import { getTerceirizadasPedidosSolicitacoesUnificadas } from "./solicitacaoUnificada.service";
// TODO Verificar/Resolver porque Kit Lanche tem um services exclusivo.
import { getTerceirizadasSuspensoesDeAlimentacao } from "./suspensaoDeAlimentacao.service.js";
import { TIPO_SOLICITACAO } from "constants/shared";
import { safeConcatOn } from "helpers/utilities";
import { ErrorHandlerFunction } from "./service-helpers";

export const getResumoPendenciasTerceirizadaAlteracoesDeCardapio = async (
  TerceirizadaUuid,
  filtro = "sem_filtro"
) => {
  let resposta = {
    total: 0,
    prioritario: 0,
    limite: 0,
    regular: 0,
  };

  let pedidosPrioritarios = [];
  let pedidosLimite = [];
  let pedidosRegular = [];

  const [avulsos, cei] = await Promise.all([
    getTerceirizadaPedidosDeAlteracaoCardapio(
      filtro,
      TIPO_SOLICITACAO.SOLICITACAO_NORMAL
    ),
    getTerceirizadaPedidosDeAlteracaoCardapio(
      filtro,
      TIPO_SOLICITACAO.SOLICITACAO_CEI
    ),
  ]);

  if (avulsos) {
    const todos = safeConcatOn("results", avulsos, cei);
    pedidosPrioritarios = filtraPrioritarios(todos);
    pedidosLimite = filtraNoLimite(todos);
    pedidosRegular = filtraRegular(todos);
  }

  resposta.limite = pedidosLimite.length;
  resposta.prioritario = pedidosPrioritarios.length;
  resposta.regular = pedidosRegular.length;
  resposta.total = resposta.limite + resposta.prioritario + resposta.regular;

  return resposta;
};

const getResumoPendenciasTerceirizadaInclusaoDeAlimentacaoAvulsa = async (
  TerceirizadaUuid,
  filtro = "sem_filtro"
) => {
  let resposta = {
    total: 0,
    prioritario: 0,
    limite: 0,
    regular: 0,
  };

  let pedidosPrioritarios = [];
  let pedidosLimite = [];
  let pedidosRegular = [];

  const [continuas, avulsas, cei] = await Promise.all([
    terceirizadaListarSolicitacoesDeInclusaoDeAlimentacao(
      filtro,
      TIPO_SOLICITACAO.SOLICITACAO_CONTINUA
    ),
    terceirizadaListarSolicitacoesDeInclusaoDeAlimentacao(
      filtro,
      TIPO_SOLICITACAO.SOLICITACAO_NORMAL
    ),
    terceirizadaListarSolicitacoesDeInclusaoDeAlimentacao(
      filtro,
      TIPO_SOLICITACAO.SOLICITACAO_CEI
    ),
  ]);

  if (continuas) {
    const todas = safeConcatOn("results", continuas, avulsas, cei);
    pedidosPrioritarios = filtraPrioritarios(todas);
    pedidosLimite = filtraNoLimite(todas);
    pedidosRegular = filtraRegular(todas);
  }

  resposta.limite = pedidosLimite.length;
  resposta.prioritario = pedidosPrioritarios.length;
  resposta.regular = pedidosRegular.length;
  resposta.total = resposta.limite + resposta.prioritario + resposta.regular;

  return resposta;
};

const getResumoPendenciasTerceirizadaInclusaoDeAlimentacaoContinua = async (
  TerceirizadaUuid,
  filtro = "sem_filtro"
) => {
  let resposta = {
    total: 0,
    prioritario: 0,
    limite: 0,
    regular: 0,
  };

  let pedidosPrioritarios = [];
  let pedidosLimite = [];
  let pedidosRegular = [];

  const solicitacoes =
    await terceirizadaListarSolicitacoesDeInclusaoDeAlimentacao(
      filtro,
      TIPO_SOLICITACAO.SOLICITACAO_CONTINUA
    );

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

export const getResumoPendenciasTerceirizadaInclusaoDeAlimentacao = async (
  TerceirizadaUuid,
  filtro = "sem_filtro"
) => {
  let resposta = {
    total: 0,
    prioritario: 0,
    limite: 0,
    regular: 0,
  };

  const resumoAvulsa =
    await getResumoPendenciasTerceirizadaInclusaoDeAlimentacaoAvulsa(filtro);
  const resumoContinua =
    await getResumoPendenciasTerceirizadaInclusaoDeAlimentacaoContinua(filtro);

  resposta.limite = resumoAvulsa.limite + resumoContinua.limite;
  resposta.prioritario = resumoAvulsa.prioritario + resumoContinua.prioritario;
  resposta.regular = resumoAvulsa.regular + resumoContinua.regular;
  resposta.total = resumoAvulsa.total + resumoContinua.total;

  return resposta;
};

export const getResumoPendenciasTerceirizadaInversaoDeDiaDeCardapio = async (
  TerceirizadaUuid,
  filtro = "sem_filtro"
) => {
  let resposta = {
    total: 0,
    prioritario: 0,
    limite: 0,
    regular: 0,
  };

  let pedidosPrioritarios = [];
  let pedidosLimite = [];
  let pedidosRegular = [];

  const solicitacoes = await getTerceirizadaPedidosDeInversoes(filtro);

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

export const getResumoPendenciasTerceirizadaKitLanche = async (
  TerceirizadaUuid,
  filtro = "sem_filtro"
) => {
  let resposta = {
    total: 0,
    prioritario: 0,
    limite: 0,
    regular: 0,
  };

  let pedidosPrioritarios = [];
  let pedidosLimite = [];
  let pedidosRegular = [];

  const [avulsos, cei] = await Promise.all([
    getTerceirizadasPedidosDeKitLanche(
      filtro,
      TIPO_SOLICITACAO.SOLICITACAO_NORMAL
    ),
    getTerceirizadasPedidosDeKitLanche(
      filtro,
      TIPO_SOLICITACAO.SOLICITACAO_CEI
    ),
  ]);

  if (avulsos) {
    const todos = safeConcatOn("results", avulsos, cei);
    pedidosPrioritarios = filtraPrioritarios(todos);
    pedidosLimite = filtraNoLimite(todos);
    pedidosRegular = filtraRegular(todos);
  }

  resposta.limite = pedidosLimite.length;
  resposta.prioritario = pedidosPrioritarios.length;
  resposta.regular = pedidosRegular.length;
  resposta.total = resposta.limite + resposta.prioritario + resposta.regular;

  return resposta;
};

export const getResumoPendenciasTerceirizadaSuspensaoDeAlimentacao = async (
  TerceirizadaUuid,
  filtro = "sem_filtro"
) => {
  let resposta = {
    total: 0,
    prioritario: 0,
    limite: 0,
    regular: 0,
  };
  let pedidosPrioritarios = [];
  let pedidosLimite = [];
  let pedidosRegular = [];

  const solicitacoes = await getTerceirizadasSuspensoesDeAlimentacao(filtro);
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

export const getResumoPendenciasTerceirizadaSolicitacoesUnificadas = async (
  TerceirizadaUuid,
  filtro = "sem_filtro"
) => {
  let resposta = {
    total: 0,
    prioritario: 0,
    limite: 0,
    regular: 0,
  };

  let pedidosPrioritarios = [];
  let pedidosLimite = [];
  let pedidosRegular = [];

  const solicitacoes = await getTerceirizadasPedidosSolicitacoesUnificadas(
    filtro
  );

  if (solicitacoes) {
    pedidosPrioritarios = filtraPrioritarios(
      solicitacoes.results,
      (filtro = "solicitacao_kit_lanche")
    );
    pedidosLimite = filtraNoLimite(
      solicitacoes.results,
      (filtro = "solicitacao_kit_lanche")
    );
    pedidosRegular = filtraRegular(
      solicitacoes.results,
      (filtro = "solicitacao_kit_lanche")
    );
  }

  resposta.limite = pedidosLimite.length;
  resposta.prioritario = pedidosPrioritarios.length;
  resposta.regular = pedidosRegular.length;
  resposta.total = resposta.limite + resposta.prioritario + resposta.regular;

  return resposta;
};

const SOLICITACOES_TERCEIRIZADA = `${API_URL}/terceirizada-solicitacoes`;

export const getSolicitacoesPendentesTerceirizada = async (params) => {
  const url = `${SOLICITACOES_TERCEIRIZADA}/${SOLICITACOES.PENDENTES}/`;
  const response = await axios.get(url, { params }).catch(ErrorHandlerFunction);
  if (response) {
    const data = { data: response.data, status: response.status };
    return data;
  }
};

export const getSolicitacoesCanceladasTerceirizada = async (params) => {
  const url = `${SOLICITACOES_TERCEIRIZADA}/${SOLICITACOES.CANCELADOS}/`;
  const response = await axios.get(url, { params }).catch(ErrorHandlerFunction);
  if (response) {
    const data = { data: response.data, status: response.status };
    return data;
  }
};

export const getSolicitacoesAutorizadasTerceirizada = async (params) => {
  const url = `${SOLICITACOES_TERCEIRIZADA}/${SOLICITACOES.AUTORIZADOS}/`;
  const response = await axios.get(url, { params }).catch(ErrorHandlerFunction);
  if (response) {
    const data = { data: response.data, status: response.status };
    return data;
  }
};

export const getSolicitacoesNegadasTerceirizada = async (params) => {
  const url = `${SOLICITACOES_TERCEIRIZADA}/${SOLICITACOES.NEGADOS}/`;
  const response = await axios.get(url, { params }).catch(ErrorHandlerFunction);
  if (response) {
    const data = { data: response.data, status: response.status };
    return data;
  }
};

export const getSolicitacoesPendenteCienciaTerceirizada = async (
  TerceirizadaUuid,
  filtroAplicado,
  tipoVisao
) => {
  const url = `${SOLICITACOES_TERCEIRIZADA}/${SOLICITACOES.PENDENTES_CIENCIA}/${TerceirizadaUuid}/${filtroAplicado}/${tipoVisao}/`;
  const response = await axios.get(url).catch(ErrorHandlerFunction);
  if (response) {
    const data = { data: response.data, status: response.status };
    return data;
  }
};

export const getSolicitacoesComQuestionamento = async (params) => {
  const url = `${SOLICITACOES_TERCEIRIZADA}/${SOLICITACOES.QUESTIONAMENTOS}/`;
  const response = await axios.get(url, { params }).catch(ErrorHandlerFunction);
  if (response) {
    const data = { data: response.data, status: response.status };
    return data;
  }
};
