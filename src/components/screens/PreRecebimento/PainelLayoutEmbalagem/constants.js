import {
  PAINEL_LAYOUT_EMBALAGEM,
  PENDENTES_APROVACAO,
} from "../../../../configs/constants";

export const CARD_PENDENTES_APROVACAO = {
  id: "Pendentes de Aprovação",
  titulo: "Pendentes de Aprovação",
  icon: "fa-exclamation-triangle",
  style: "card-pendente-assinatura",
  incluir_status: ["ENVIADO_PARA_ANALISE"],
  href: `${PAINEL_LAYOUT_EMBALAGEM}/${PENDENTES_APROVACAO}`,
};

export const cards = [CARD_PENDENTES_APROVACAO];
