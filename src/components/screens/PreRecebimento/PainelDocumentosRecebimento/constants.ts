import {
  PAINEL_DOCUMENTOS_RECEBIMENTO,
  PENDENTES_APROVACAO,
  APROVADOS,
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

export const CARD_APROVADOS: CardConfig = {
  id: "Aprovados",
  titulo: "Aprovados",
  icon: "fa-check",
  style: "card-cronogramas-assinados",
  incluir_status: ["APROVADO"],
  href: `${PAINEL_DOCUMENTOS_RECEBIMENTO}/${APROVADOS}`,
};

export const cardsAprovacao = [CARD_PENDENTES_APROVACAO, CARD_APROVADOS];
