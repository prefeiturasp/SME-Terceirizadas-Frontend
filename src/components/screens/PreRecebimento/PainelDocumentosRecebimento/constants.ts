import {
  PAINEL_DOCUMENTOS_RECEBIMENTO,
  PENDENTES_APROVACAO,
  APROVADOS,
  ENVIADOS_PARA_CORRECAO,
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

export const CARD_ENVIADOS_PARA_CORRECAO: CardConfig = {
  id: "Enviados para Correção",
  titulo: "Enviados para Correção",
  icon: "fa-pencil-alt",
  style: "card-solicitacoes-reprovadas",
  incluir_status: ["ENVIADO_PARA_CORRECAO"],
  href: `${PAINEL_DOCUMENTOS_RECEBIMENTO}/${ENVIADOS_PARA_CORRECAO}`,
};

export const cardsPainel = [
  CARD_PENDENTES_APROVACAO,
  CARD_APROVADOS,
  CARD_ENVIADOS_PARA_CORRECAO,
];
