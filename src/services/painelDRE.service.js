import { API_URL } from "../constants/config.constants";
import {
  getDiretoriaRegionalPedidosPrioritarios as getDREAlteracaoCardapioPrioritario,
  getDiretoriaRegionalPedidosNoPrazoLimite as getDREAlteracaoCardapioLimite,
  getDiretoriaRegionalPedidosNoPrazoRegular as getDREAlteracaoCardapioRegular
} from "./alteracaoDecardapio.service";

import {
  getDiretoriaRegionalPedidosPrioritarios as getDREInclusaoAlimentacaoAvulsaPrioritario,
  getDiretoriaRegionalPedidosNoPrazoLimite as getDREInclusaoAlimentacaoAvulsaLimite,
  getDiretoriaRegionalPedidosNoPrazoRegular as getDREInclusaoAlimentacaoAvulsaRegular
} from "./inclusaoDeAlimentacaoAvulsa.service";

import {
  getDiretoriaRegionalPedidosPrioritarios as getDREInclusaoAlimentacaoContinuaPrioritario,
  getDiretoriaRegionalPedidosNoPrazoLimite as getDREInclusaoAlimentacaoContinuaLimite,
  getDiretoriaRegionalPedidosNoPrazoRegular as getDREInclusaoAlimentacaoContinuaRegular
} from "./inclusaoDeAlimentacaoContinua.service";

import { getDiretoriaRegionalPedidosDeInversoes } from "./inversaoDeDiaDeCardapio.service";
import {
  filtraNoLimite,
  filtraPrioritarios,
  filtraRegular
} from "./../components/InversaoDeDiaDeCardapio/DRE/PainelPedidos/helper";
import { getDiretoriaRegionalPedidosDeKitLanche } from "../components/SolicitacaoDeKitLanche/services";
// TODO Verificar/Resolver porque Kit Lanche tem um services exclusivo.

import { getSuspensoesDeAlimentacaoInformadas } from "./suspensaoDeAlimentacao.service.js";
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

export const getSolicitacoesPendentesParaDRE = dreUuid => {
  const url = `${API_URL}/diretorias-regionais/${dreUuid}/solicitacoes-pendentes-para-mim/`;

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

const getResumoPendenciasDRE = async ({
  filtro,
  getSolicitacoesLimite,
  getSolicitacoesPrioritario,
  getSolicitacoesRegular
}) => {
  let resposta = {
    total: 0,
    prioritario: 0,
    limite: 0,
    regular: 0
  };

  const pedidosLimite = await getSolicitacoesLimite(filtro);
  const pedidosPrioritarios = await getSolicitacoesPrioritario(filtro);
  const pedidosRegular = await getSolicitacoesRegular(filtro);

  resposta.limite = pedidosLimite ? pedidosLimite.count : 0;
  resposta.prioritario = pedidosPrioritarios ? pedidosPrioritarios.count : 0;
  resposta.regular = pedidosRegular ? pedidosRegular.count : 0;
  resposta.total = resposta.limite + resposta.prioritario + resposta.regular;

  return resposta;
};

export const getResumoPendenciasDREAlteracoesDeCardapio = async (
  dreUuid,
  filtro = "sem_filtro"
) => {
  return getResumoPendenciasDRE({
    filtro,
    getSolicitacoesLimite: getDREAlteracaoCardapioLimite,
    getSolicitacoesPrioritario: getDREAlteracaoCardapioPrioritario,
    getSolicitacoesRegular: getDREAlteracaoCardapioRegular
  });
};

const getResumoPendenciasDREInclusaoDeAlimentacaoAvulsa = async (
  filtro = "sem_filtro"
) => {
  return getResumoPendenciasDRE({
    filtro,
    getSolicitacoesLimite: getDREInclusaoAlimentacaoAvulsaLimite,
    getSolicitacoesPrioritario: getDREInclusaoAlimentacaoAvulsaPrioritario,
    getSolicitacoesRegular: getDREInclusaoAlimentacaoAvulsaRegular
  });
};

const getResumoPendenciasDREInclusaoDeAlimentacaoContinua = async (
  filtro = "sem_filtro"
) => {
  return getResumoPendenciasDRE({
    filtro,
    getSolicitacoesLimite: getDREInclusaoAlimentacaoContinuaLimite,
    getSolicitacoesPrioritario: getDREInclusaoAlimentacaoContinuaPrioritario,
    getSolicitacoesRegular: getDREInclusaoAlimentacaoContinuaRegular
  });
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

  resposta.limite = solicitacoes.count;
  resposta.total = resposta.limite;

  return resposta;
};
