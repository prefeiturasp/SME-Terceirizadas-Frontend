import authService from "./auth";

export const FLUXO = {
  INICIO_PEDIDO: "inicio-pedido",
  CODAE_AUTORIZA: "codae-autoriza-pedido",
  TERCEIRIZADA_TOMA_CIENCIA: "terceirizada-toma-ciencia",
  DRE_NAO_VALIDA: "diretoria-regional-nao-valida-pedido",
  DRE_VALIDA: "diretoria-regional-valida-pedido",
  ESCOLA_CANCELA: "escola-cancela-pedido-48h-antes",
  DRE_CANCELA: "diretoria-regional-cancela",
  CODAE_NEGA: "codae-cancela-pedido",
  CODAE_QUESTIONA: "codae-questiona-pedido",
  TERCEIRIZADA_RESPONDE_QUESTIONAMENTO: "terceirizada-responde-questionamento"
};

export const PEDIDOS = {
  TERCEIRIZADA: "pedidos-terceirizadas",
  CODAE: "pedidos-codae",
  DRE: "pedidos-diretoria-regional",
  MEUS: "minhas-solicitacoes"
};

export const SOLICITACOES = {
  AUTORIZADOS: "autorizados",
  PENDENTES: "pendentes-autorizacao",
  PENDENTES_CIENCIA: "pendentes-ciencia",
  NEGADOS: "negados",
  CANCELADOS: "cancelados",
  PENDENTES_VALIDACAO_DRE: "pendentes-validacao",
  QUESTIONAMENTOS: "questionamentos"
};

export const AUTH_TOKEN = {
  Authorization: `JWT ${authService.getToken()}`,
  "Content-Type": "application/json"
};

export const RESUMO_POR = {
  TIPO_DE_SOLICITACAO: "desc_doc",
  LOTE: "lote",
  DRE: "dre_nome"
};
