import { API_URL } from "../constants/config.constants";
import {
  filtraNoLimite,
  filtraPrioritarios,
  filtraRegular
} from "./../components/InversaoDeDiaDeCardapio/Terceirizada/PainelPedidos/helper";
import { AUTH_TOKEN, SOLICITACOES } from "./constants";
import { getTerceirizadaPedidosDeAlteracaoCardapio } from "services/alteracaoDeCardapio";
import { terceirizadaListarSolicitacoesDeInclusaoDeAlimentacao } from "services/inclusaoDeAlimentacao";
import { getTerceirizadaPedidosDeInversoes } from "./inversaoDeDiaDeCardapio.service";
import { getTerceirizadasPedidosDeKitLanche } from "services/kitLanche";
import { getTerceirizadasPedidosSolicitacoesUnificadas } from "./solicitacaoUnificada.service";
// TODO Verificar/Resolver porque Kit Lanche tem um services exclusivo.
import { getTerceirizadasSuspensoesDeAlimentacao } from "./suspensaoDeAlimentacao.service.js";
import { TIPO_SOLICITACAO } from "constants/shared";

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

  const [avulsos, cei] = await Promise.all([
    getTerceirizadaPedidosDeAlteracaoCardapio(
      filtro,
      TIPO_SOLICITACAO.SOLICITACAO_NORMAL
      ),
      getTerceirizadaPedidosDeAlteracaoCardapio(
      filtro,
      TIPO_SOLICITACAO.SOLICITACAO_CEI
    ),
  ])

  if (avulsos) {
    const todos = avulsos.results.concat(cei.results)
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
    regular: 0
  };

  let pedidosPrioritarios = [];
  let pedidosLimite = [];
  let pedidosRegular = [];

  const [solicitacoesContinuas,
    soliticacoesAvulsas,
    solicitacoesCei 
   ] = await Promise.all([
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
   )
 ])

 if (solicitacoesContinuas) {
   const todas = solicitacoesContinuas.results.concat(
     soliticacoesAvulsas.results,
     solicitacoesCei.results,
   );

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
    regular: 0
  };

  let pedidosPrioritarios = [];
  let pedidosLimite = [];
  let pedidosRegular = [];

  const solicitacoes = await terceirizadaListarSolicitacoesDeInclusaoDeAlimentacao(
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

const SOLICITACOES_TERCEIRIZADA = `${API_URL}/terceirizada-solicitacoes`;

// TODO: colocar essa função num arquivo separado, está sendo copiada/colada
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

export const getSolicitacoesCanceladasTerceirizada = async TerceirizadaUuid => {
  const url = `${SOLICITACOES_TERCEIRIZADA}/${
    SOLICITACOES.CANCELADOS
  }/${TerceirizadaUuid}/`;
  return retornoBase(url);
};

export const getSolicitacoesAutorizadasTerceirizada = async TerceirizadaUuid => {
  const url = `${SOLICITACOES_TERCEIRIZADA}/${
    SOLICITACOES.AUTORIZADOS
  }/${TerceirizadaUuid}/`;
  return retornoBase(url);
};

export const getSolicitacoesNegadasTerceirizada = async TerceirizadaUuid => {
  const url = `${SOLICITACOES_TERCEIRIZADA}/${
    SOLICITACOES.NEGADOS
  }/${TerceirizadaUuid}/`;
  return retornoBase(url);
};

export const getSolicitacoesPendenteCienciaTerceirizada = async (
  TerceirizadaUuid,
  filtroAplicado,
  tipoVisao
) => {
  const url = `${SOLICITACOES_TERCEIRIZADA}/${
    SOLICITACOES.PENDENTES_CIENCIA
  }/${TerceirizadaUuid}/${filtroAplicado}/${tipoVisao}/`;
  return retornoBase(url);
};

export const getSolicitacoesComQuestionamento = async TerceirizadaUuid => {
  const url = `${SOLICITACOES_TERCEIRIZADA}/${
    SOLICITACOES.QUESTIONAMENTOS
  }/${TerceirizadaUuid}/`;
  return retornoBase(url);
};
