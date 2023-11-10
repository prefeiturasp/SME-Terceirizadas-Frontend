import {
  PAINEL_DOCUMENTOS_RECEBIMENTO,
  PENDENTES_APROVACAO,
} from "../../../../configs/constants";
import { CardConfig } from "./interfaces";

export const CARD_PENDENTES_APROVACAO: CardConfig = {
  id: "Pendentes de Aprovação",
  titulo: "Pendentes de Aprovação",
  icon: "fa-exclamation-triangle",
  style: "card-pendente-assinatura",
  incluir_status: ["ENVIADO_PARA_ANALISE"],
  href: `${PAINEL_DOCUMENTOS_RECEBIMENTO}/${PENDENTES_APROVACAO}`,
};

export const cardsAprovacao = [CARD_PENDENTES_APROVACAO];
