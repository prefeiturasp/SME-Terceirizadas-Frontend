import {
  PAINEL_LAYOUT_EMBALAGEM,
  CARDS_LAYOUT_EMBALAGEM,
} from "../../../../configs/constants";

export const CARD_PENDENTES_APROVACAO = {
  id: "Pendentes de Aprovação",
  titulo: "Pendentes de Aprovação",
  icon: "fa-exclamation-triangle",
  style: "card-pendente-assinatura",
  incluir_status: ["ENVIADO_PARA_ANALISE"],
  href: `${PAINEL_LAYOUT_EMBALAGEM}/${CARDS_LAYOUT_EMBALAGEM.PENDENTES_APROVACAO}`,
};

export const CARD_APROVADOS = {
  id: "Aprovados",
  titulo: "Aprovados",
  icon: "fa-check",
  style: "card-cronogramas-assinados",
  incluir_status: ["APROVADO"],
  href: `${PAINEL_LAYOUT_EMBALAGEM}/${CARDS_LAYOUT_EMBALAGEM.APROVADOS}`,
};

export const cards = [CARD_PENDENTES_APROVACAO, CARD_APROVADOS];
