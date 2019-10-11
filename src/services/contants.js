import authService from "./auth";

export const FLUXO = {
  INICIO_PEDIDO: "inicio-pedido",
  CODAE_AUTORIZA: "codae-aprova-pedido",
  TERCEIRIZADA_TOMA_CIENCIA: "terceirizada-toma-ciencia",
  DRE_VALIDA: "diretoria-regional-aprova-pedido",
  DRE_NAO_VALIDA: "diretoria-regional-nao-valida-pedido",
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
  CANCELADOS: "cancelados"
};

export const AUTH_TOKEN = {
  Authorization: `JWT ${authService.getToken()}`,
  "Content-Type": "application/json"
};
