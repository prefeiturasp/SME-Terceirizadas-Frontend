import authService from "./auth";

export const FLUXO = {
  INICIO_PEDIDO: "inicio-pedido",
  CODAE_AUTORIZA: "codae-autoriza-pedido",
  TERCEIRIZADA_TOMA_CIENCIA: "terceirizada-toma-ciencia",
  DRE_VALIDA: "diretoria-regional-valida-pedido",
  DRE_NAO_VALIDA: "diretoria-regional-cancela-pedido",
  ESCOLA_CANCELA: "escola-cancela-pedido-48h-antes",
  DRE_CANCELA: "diretoria-regional-cancela",
  CODAE_NEGA: "codae-cancela-pedido"
};

export const PEDIDOS = {
  TERCEIRIZADA: "pedidos-terceirizadas",
  CODAE: "pedidos-codae",
  DRE: "pedidos-diretoria-regional",
  MEUS: "minhas-solicitacoes"
};

export const SOLICITACOES = {
  AUTORIZADOS: "aprovados",
  PENDENTES: "pendentes-aprovacao",
  NEGADOS: "negados",
  CANCELADOS: "cancelados",
  PENDENTES_VALIDACAO_DRE: "pendentes-validacao"
};

export const AUTH_TOKEN = {
  Authorization: `JWT ${authService.getToken()}`,
  "Content-Type": "application/json"
};
