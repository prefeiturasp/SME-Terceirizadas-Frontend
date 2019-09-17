import { API_URL } from "../constants/config.constants";
import {
  getDiretoriaRegionalPedidosDeAlteracaoCardapio
} from "./alteracaoDecardapio.service";

import {
  getDiretoriaRegionalPedidosDeInclusaoAlimentacaoAvulsa
} from "./inclusaoDeAlimentacaoAvulsa.service";

import {
  getDiretoriaRegionalPedidosDeInclusaoAlimentacaoContinua
} from "./inclusaoDeAlimentacaoContinua.service";

import { getDiretoriaRegionalPedidosDeInversoes } from "./inversaoDeDiaDeCardapio.service";
import {
  filtraNoLimite,
  filtraPrioritarios,
  filtraRegular
} from "./../components/InversaoDeDiaDeCardapio/DRE/PainelPedidos/helper";
import { getDiretoriaRegionalPedidosDeKitLanche } from "./solicitacaoDeKitLanche.service";
// TODO Verificar/Resolver porque Kit Lanche tem um services exclusivo.

import { getSuspensoesDeAlimentacaoInformadas } from "./suspensaoDeAlimentacao.service.js";
import { getCODAEPedidosSolicitacoesUnificadas } from "./solicitacaoUnificada.service";
import authService from "./auth";

const authToken = {
  Authorization: `JWT ${authService.getToken()}`,
  "Content-Type": "application/json"
};

export const getPendentesAprovacaoList = () => {
  const url = `${API_URL}/dre-pendentes-aprovacao/`;

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

export const getSolicitacoesAutorizadasPelaDRE = dreUuid => {
  const url = `${API_URL}/diretorias-regionais/${dreUuid}/solicitacoes-autorizadas-por-mim/`;

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

export const getSolicitacoesPendentesParaDRE = (
  dreUuid,
  filtro = "sem_filtro"
) => {
  const url = `${API_URL}/diretorias-regionais/${dreUuid}/solicitacoes-pendentes-para-mim/${filtro}/`;

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



export const getResumoPendenciasDREAlteracoesDeCardapio = async (
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

  const solicitacoes = await getDiretoriaRegionalPedidosDeAlteracaoCardapio(filtro);

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

export const getResumoPendenciasDREInclusaoDeAlimentacaoAvulsa = async (
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

  const solicitacoes = await getDiretoriaRegionalPedidosDeInclusaoAlimentacaoAvulsa(filtro);

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

export const getResumoPendenciasDREInclusaoDeAlimentacaoContinua = async (
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

  const solicitacoes = await getDiretoriaRegionalPedidosDeInclusaoAlimentacaoContinua(filtro);

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


export const getResumoPendenciasDREInclusaoDeAlimentacao = async (
  dreUuid,
  filtro = "sem_filtro"
) => {
  let resposta = {
    total: 0,
    prioritario: 0,
    limite: 0,
    regular: 0
  };

  const resumoAvulsa = await getResumoPendenciasDREInclusaoDeAlimentacaoAvulsa(
    filtro
  );
  const resumoContinua = await getResumoPendenciasDREInclusaoDeAlimentacaoContinua(
    filtro
  );

  resposta.limite = resumoAvulsa.limite + resumoContinua.limite;
  resposta.prioritario = resumoAvulsa.prioritario + resumoContinua.prioritario;
  resposta.regular = resumoAvulsa.regular + resumoContinua.regular;
  resposta.total = resumoAvulsa.total + resumoContinua.total;

  return resposta;
};

export const getResumoPendenciasDREInversaoDeDiaDeCardapio = async (
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

  const solicitacoes = await getDiretoriaRegionalPedidosDeInversoes(filtro);

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

export const getResumoPendenciasDREKitLanche = async (
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

  const solicitacoes = await getDiretoriaRegionalPedidosDeKitLanche(filtro);

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

export const getResumoPendenciasDRESuspensaoDeAlimentacao = async (
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

export const getResumoPendenciasDRESolicitacoesUnificadas = async (
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

  const solicitacoes = await getCODAEPedidosSolicitacoesUnificadas(filtro);

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

export const getResumoPendenciasDREPorLote = async (
  dree_uuid,
  filtro = "sem_filtro"
) => {
  // TODO Algoritimo de prioridade desse endpoint não bate com usado para os cards por tipo de doc
  const solicitacoes = (await getSolicitacoesPendentesParaDRE(
    dree_uuid,
    filtro
  )).results;

  const reducer = (resumoPorLote, corrente) => {
    if (!resumoPorLote[corrente.lote]) {
      resumoPorLote[corrente.lote] = {}
    }
    if (corrente.prioridade !== "VENCIDO") {
      resumoPorLote[corrente.lote][corrente.prioridade] = resumoPorLote[corrente.lote][corrente.prioridade] ? (resumoPorLote[corrente.lote][corrente.prioridade] += 1): 1;
      resumoPorLote[corrente.lote]["TOTAL"] = resumoPorLote[corrente.lote]["TOTAL"] ? (resumoPorLote[corrente.lote]["TOTAL"] += 1): 1;
    }
    return resumoPorLote;
  };


  let resumoPorLote = solicitacoes.reduce(reducer, {});

  return resumoPorLote;
};
