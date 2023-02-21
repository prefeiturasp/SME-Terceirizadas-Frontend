import {
  AGUARDANDO_DILOG,
  DINUTRE,
  SOLICITACOES_PENDENTES
} from "configs/constants";

export const CARD_PENDENTES_ASSINATURA = {
  id: "Pendentes de Assinatura",
  titulo: "Pendentes de Assinatura",
  icon: "fa-exclamation-triangle",
  style: "card-pendente-assinatura",
  incluir_status: ["ASSINADO_CRONOGRAMA"],
  href: `/${DINUTRE}/${SOLICITACOES_PENDENTES}`
};

export const CARD_AGUARDANDO_ASSINATURA = {
  id: "Aguardando Assinatura de DILOG",
  titulo: "Aguardando Assinatura de DILOG",
  icon: "fa-check",
  style: "card-aguardando-dilog",
  incluir_status: ["ASSINADO_DINUTRE"],
  href: `/${DINUTRE}/${AGUARDANDO_DILOG}`
};

export const cards = [CARD_PENDENTES_ASSINATURA, CARD_AGUARDANDO_ASSINATURA];
