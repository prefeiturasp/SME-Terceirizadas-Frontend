import {
  AGUARDANDO_DILOG,
  ASSINADO_CODAE,
  DINUTRE,
  SOLICITACOES_ALTERACOES,
  SOLICITACOES_PENDENTES
} from "configs/constants";

export const CARD_PENDENTES_ASSINATURA = {
  id: "Pendentes de Assinatura",
  titulo: "Pendentes de Assinatura",
  icon: "fa-exclamation-triangle",
  style: "card-pendente-assinatura",
  incluir_status: ["ASSINADO_FORNECEDOR"],
  href: `/${DINUTRE}/${SOLICITACOES_PENDENTES}`
};

export const CARD_AGUARDANDO_ASSINATURA = {
  id: "Aguardando Assinatura de DILOG",
  titulo: "Aguardando Assinatura de DILOG",
  icon: "fa-pencil-alt",
  style: "card-aguardando-dilog",
  incluir_status: ["ASSINADO_DINUTRE"],
  href: `/${DINUTRE}/${AGUARDANDO_DILOG}`
};

export const CARD_CRONOGRAMAS_ASSINADOS = {
  id: "Cronogramas Assinados",
  titulo: "Cronogramas Assinados",
  icon: "fa-check",
  style: "card-cronogramas-assinados",
  incluir_status: ["ASSINADO_CODAE"],
  href: `/${DINUTRE}/${ASSINADO_CODAE}`
};

export const CARD_PENDENTES_ASSINATURA_DILOG = {
  id: "Pendentes de Assinatura",
  titulo: "Pendentes de Assinatura",
  icon: "fa-exclamation-triangle",
  style: "card-pendente-assinatura",
  incluir_status: ["ASSINADO_DINUTRE"],
  href: `/${DINUTRE}/${SOLICITACOES_PENDENTES}`
};

export const CARD_SOLICITACOES_ALTERACOES = {
  id: "Solicitações de Alterações",
  titulo: "Solicitações de Alterações",
  icon: "fa-check",
  style: "card-cronogramas-assinados",
  incluir_status: ["CRONOGRAMA_CIENTE"],
  href: `/${DINUTRE}/${SOLICITACOES_ALTERACOES}`
};

export const cards_dinutre = [
  CARD_PENDENTES_ASSINATURA,
  CARD_AGUARDANDO_ASSINATURA,
  CARD_CRONOGRAMAS_ASSINADOS
];

export const cards_dilog = [
  CARD_PENDENTES_ASSINATURA_DILOG,
  CARD_CRONOGRAMAS_ASSINADOS
];

export const cards_alteracao = [CARD_SOLICITACOES_ALTERACOES];
