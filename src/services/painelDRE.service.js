import { API_URL } from "../constants/config";
import {
  filtraNoLimite,
  filtraPrioritarios,
  filtraRegular
} from "../helpers/painelPedidos";
import { dreListarSolicitacoesDeAlteracaoDeCardapio } from "services/alteracaoDeCardapio";
import { AUTH_TOKEN, SOLICITACOES } from "./constants";
import { dreListarSolicitacoesDeInclusaoDeAlimentacao } from "services/inclusaoDeAlimentacao";
import { getDREPedidosDeKitLanche } from "services/kitLanche";
import { getCODAEPedidosSolicitacoesUnificadas } from "services/solicitacaoUnificada.service";
// TODO Verificar/Resolver porque Kit Lanche tem um services exclusivo.
import { getSuspensoesDeAlimentacaoInformadas } from "services/suspensaoDeAlimentacao.service.js";
import { TIPO_SOLICITACAO } from "constants/shared";

const SOLICITACOES_DRE = `${API_URL}/diretoria-regional-solicitacoes`;

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

  const [avulsos, cei] = await Promise.all([
    dreListarSolicitacoesDeAlteracaoDeCardapio(
      filtro,
      TIPO_SOLICITACAO.SOLICITACAO_NORMAL
    ),
    dreListarSolicitacoesDeAlteracaoDeCardapio(
      filtro,
      TIPO_SOLICITACAO.SOLICITACAO_CEI
    )
  ]);

  if (avulsos) {
    const all = avulsos.results.concat(cei.results);
    pedidosPrioritarios = filtraPrioritarios(all);
    pedidosLimite = filtraNoLimite(all);
    pedidosRegular = filtraRegular(all);
  }

  resposta.limite = pedidosLimite.length;
  resposta.prioritario = pedidosPrioritarios.length;
  resposta.regular = pedidosRegular.length;
  resposta.total = resposta.limite + resposta.prioritario + resposta.regular;

  return resposta;
};

const getResumoPendenciasDREInclusaoDeAlimentacaoAvulsa = async (
  //FIXME: must include CEI?
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

  const solicitacoes = await dreListarSolicitacoesDeInclusaoDeAlimentacao(
    filtro,
    TIPO_SOLICITACAO.SOLICITACAO_NORMAL
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

const getResumoPendenciasDREInclusaoDeAlimentacaoContinua = async (
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

  const solicitacoes = await dreListarSolicitacoesDeInclusaoDeAlimentacao(
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

export const getResumoPendenciasDREInclusaoDeAlimentacao = async (
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

export const getResumoPendenciasDREInversaoDeDiaDeCardapio = async () => {
  let resposta = {
    total: 0,
    prioritario: 0,
    limite: 0,
    regular: 0
  };

  let pedidosPrioritarios = [];
  let pedidosLimite = [];
  let pedidosRegular = [];

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

  const solicitacoes = await getDREPedidosDeKitLanche(filtro);

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

export const getSolicitacoesPendentesValidacaoDRE = async (
  filtroAplicado,
  tipoVisao
) => {
  const url = `${SOLICITACOES_DRE}/${
    SOLICITACOES.PENDENTES_VALIDACAO_DRE
  }/${filtroAplicado}/${tipoVisao}/`;
  return retornoBase(url);
};

export const getSolicitacoesPendentesDRE = async () => {
  const url = `${SOLICITACOES_DRE}/${SOLICITACOES.PENDENTES}/`;
  return retornoBase(url);
};

export const getSolicitacoesAutorizadasDRE = async () => {
  const url = `${SOLICITACOES_DRE}/${SOLICITACOES.AUTORIZADOS}/`;
  return retornoBase(url);
};

export const getSolicitacoesCanceladasDRE = async () => {
  const url = `${SOLICITACOES_DRE}/${SOLICITACOES.CANCELADOS}/`;
  return retornoBase(url);
};

export const getSolicitacoesNegadasDRE = async () => {
  const url = `${SOLICITACOES_DRE}/${SOLICITACOES.NEGADOS}/`;
  return retornoBase(url);
};
