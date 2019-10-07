import { API_URL } from "../constants/config.constants";
import {
  filtraNoLimite,
  filtraPrioritarios,
  filtraRegular
} from "./../components/InversaoDeDiaDeCardapio/Terceirizada/PainelPedidos/helper";
import authService from "./auth";
import { AUTH_TOKEN, SOLICITACOES } from "./contants";
import { getTerceirizadaPedidosDeAlteracaoCardapio } from "./alteracaoDecardapio.service";
import { getTerceirizadaPedidosDeInclusaoAlimentacaoAvulsa } from "./inclusaoDeAlimentacaoAvulsa.service";
import { getTerceirizadaPedidosDeInclusaoAlimentacaoContinua } from "./inclusaoDeAlimentacaoContinua.service";
import { getTerceirizadaPedidosDeInversoes } from "./inversaoDeDiaDeCardapio.service";
import { getTerceirizadasPedidosDeKitLanche } from "./solicitacaoDeKitLanche.service";
import { getTerceirizadasPedidosSolicitacoesUnificadas } from "./solicitacaoUnificada.service";
// TODO Verificar/Resolver porque Kit Lanche tem um services exclusivo.
import { getSuspensoesDeAlimentacaoInformadas } from "./suspensaoDeAlimentacao.service.js";

const authToken = {
  Authorization: `JWT ${authService.getToken()}`,
  "Content-Type": "application/json"
};

export const getPendentesAprovacaoList = () => {
  const url = `${API_URL}/terceirizada-pendentes-aprovacao/`;

  const OBJ_REQUEST = {
    headers: authToken,
    method: "GET"
  };
  return fetch(url, OBJ_REQUEST)
    .then(result => {
      return result.json();
    })
    .catch(error => {
      console.log(error);
    });
};

export const getResumoPendenciasTerceirizadaAlteracoesDeCardapio = async (
  TerceirizadaUuid,
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

  const solicitacoes = await getTerceirizadaPedidosDeAlteracaoCardapio(filtro);

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

export const getResumoPendenciasTerceirizadaInclusaoDeAlimentacaoAvulsa = async (
  TerceirizadaUuid,
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

  const solicitacoes = await getTerceirizadaPedidosDeInclusaoAlimentacaoAvulsa(
    filtro
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

export const getResumoPendenciasTerceirizadaInclusaoDeAlimentacaoContinua = async (
  TerceirizadaUuid,
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

  const solicitacoes = await getTerceirizadaPedidosDeInclusaoAlimentacaoContinua(
    filtro
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
    regular: 0
  };

  const resumoAvulsa = await getResumoPendenciasTerceirizadaInclusaoDeAlimentacaoAvulsa(
    filtro
  );
  const resumoContinua = await getResumoPendenciasTerceirizadaInclusaoDeAlimentacaoContinua(
    filtro
  );

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
    regular: 0
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
    regular: 0
  };

  let pedidosPrioritarios = [];
  let pedidosLimite = [];
  let pedidosRegular = [];

  const solicitacoes = await getTerceirizadasPedidosDeKitLanche(filtro);

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

export const getResumoPendenciasTerceirizadaSuspensaoDeAlimentacao = async (
  TerceirizadaUuid,
  filtro = "sem_filtro"
) => {
  let resposta = {
    total: 0,
    prioritario: 0,
    limite: 0,
    regular: 0
  };

  const solicitacoes = await getSuspensoesDeAlimentacaoInformadas(filtro);
  resposta.prioritario = solicitacoes.count;
  resposta.total = resposta.prioritario;
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
    regular: 0
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
export const getSolicitacoesPendentesParaTerceirizada = (
  uuid,
  filtro = "sem_filtro"
) => {
  const url = `${API_URL}/terceirizadas/${uuid}/solicitacoes-pendentes-para-mim/${filtro}/`;

  const OBJ_REQUEST = {
    headers: authToken,
    method: "GET"
  };
  return fetch(url, OBJ_REQUEST)
    .then(result => {
      return result.json();
    })
    .catch(error => {
      console.log(error);
    });
};

export const getResumoPendenciasTerceirizadaPorLote = async (
  Terceirizadae_uuid,
  filtro
) => {
  // TODO Algoritimo de prioridade desse endpoint não bate com usado para os cards por tipo de doc
  const solicitacoes = (await getSolicitacoesPendentesParaTerceirizada(
    Terceirizadae_uuid,
    filtro
  )).results;

  const reducer = (resumoPorLote, corrente) => {
    if (!resumoPorLote[corrente.lote]) {
      resumoPorLote[corrente.lote] = {};
    }
    if (corrente.prioridade !== "VENCIDO") {
      resumoPorLote[corrente.lote][corrente.prioridade] = resumoPorLote[
        corrente.lote
      ][corrente.prioridade]
        ? (resumoPorLote[corrente.lote][corrente.prioridade] += 1)
        : 1;
      resumoPorLote[corrente.lote]["TOTAL"] = resumoPorLote[corrente.lote][
        "TOTAL"
      ]
        ? (resumoPorLote[corrente.lote]["TOTAL"] += 1)
        : 1;
    }
    return resumoPorLote;
  };

  let resumoPorLote = solicitacoes.reduce(reducer, {});

  return resumoPorLote;
};

export const getResumoPendenciasTerceirizadaEscolas = async (
  Terceirizadae_uuid,
  filtro
) => {
  // TODO Algoritimo de prioridade desse endpoint não bate com usado para os cards por tipo de doc
  const solicitacoes = (await getSolicitacoesPendentesParaTerceirizada(
    Terceirizadae_uuid,
    filtro
  )).results;

  const reducer = (resumoPorEscola, corrente) => {
    if (!resumoPorEscola[corrente.escola]) {
      resumoPorEscola[corrente.escola] = {};
    }
    if (corrente.prioridade !== "VENCIDO") {
      resumoPorEscola[corrente.escola][corrente.prioridade] = resumoPorEscola[
        corrente.escola
      ][corrente.prioridade]
        ? (resumoPorEscola[corrente.escola][corrente.prioridade] += 1)
        : 1;
      resumoPorEscola[corrente.escola]["TOTAL"] = resumoPorEscola[
        corrente.escola
      ]["TOTAL"]
        ? (resumoPorEscola[corrente.escola]["TOTAL"] += 1)
        : 1;
    }
    return resumoPorEscola;
  };

  let resumoPorEscola = solicitacoes.reduce(reducer, {});

  return resumoPorEscola;
};

const SOLICITACOES_TERCEIRIZADA = `${API_URL}/terceirizada-solicitacoes`;

const retornoBase = async url => {
  const OBJ_REQUEST = {
    headers: AUTH_TOKEN,
    method: "GET"
  };
  try {
    const result = await fetch(url, OBJ_REQUEST);
    const status = result.status;
    const json = await result.json();
    return { results: json.results, status };
  } catch (error) {
    console.log(error);
  }
};

export const getSolicitacoesPendentesTerceirizada = async TerceirizadaUuid => {
  const url = `${SOLICITACOES_TERCEIRIZADA}/${
    SOLICITACOES.PENDENTES
  }/${TerceirizadaUuid}/`;
  return retornoBase(url);
};

export const getSolicitacoesAutorizadasTerceirizada = async TerceirizadaUuid => {
  const url = `${SOLICITACOES_TERCEIRIZADA}/${
    SOLICITACOES.AUTORIZADOS
  }/${TerceirizadaUuid}/`;
  return retornoBase(url);
};

export const getSolicitacoesCanceladasTerceirizada = async TerceirizadaUuid => {
  const url = `${SOLICITACOES_TERCEIRIZADA}/${
    SOLICITACOES.CANCELADOS
  }/${TerceirizadaUuid}/`;
  return retornoBase(url);
};

export const getSolicitacoesRecusadasTerceirizada = async TerceirizadaUuid => {
  const url = `${SOLICITACOES_TERCEIRIZADA}/${
    SOLICITACOES.NEGADOS
  }/${TerceirizadaUuid}/`;
  return retornoBase(url);
};
