import { TIPO_PERFIL } from "constants/shared";
import { ROTAS_SOLICITACOES_HOMOLOGACAO_PRODUTO as ROTA } from "configs/constants";
import { ENDPOINT_HOMOLOGACOES_PRODUTO_STATUS } from "constants/shared";
import { GESTAO_PRODUTO_CARDS as CARD_ID } from "configs/constants";
const {
  CODAE_AUTORIZOU_RECLAMACAO,
  CODAE_SUSPENDEU,
  CODAE_QUESTIONADO,
  CODAE_PEDIU_ANALISE_RECLAMACAO,
  CODAE_PEDIU_ANALISE_SENSORIAL,
  CODAE_PENDENTE_HOMOLOGACAO,
  CODAE_HOMOLOGADO,
  CODAE_NAO_HOMOLOGADO
} = ENDPOINT_HOMOLOGACOES_PRODUTO_STATUS;

const CARDS_COMUNS = [
  {
    id: CARD_ID.RECLAMACAO_DE_PRODUTO,
    titulo: "Reclamação de produto",
    icon: "fa-bullhorn",
    style: "card-complained",
    rota: ROTA.RECLAMACAO_DE_PRODUTO,
    incluir_status: [CODAE_PEDIU_ANALISE_RECLAMACAO]
  },
  {
    id: CARD_ID.PRODUTOS_SUSPENSOS,
    titulo: "Produtos suspensos",
    icon: "fa-hand-paper",
    style: "card-cancelled",
    rota: ROTA.PRODUTOS_SUSPENSOS,
    incluir_status: [CODAE_SUSPENDEU]
  },
  {
    id: CARD_ID.HOMOLOGADOS,
    titulo: "Homologados",
    icon: "fa-check",
    style: "card-authorized",
    rota: ROTA.SOLICITACOES_HOMOLOGADAS,
    incluir_status: [CODAE_HOMOLOGADO]
  },
  {
    id: CARD_ID.NAO_HOMOLOGADOS,
    titulo: "Não homologados",
    icon: "fa-ban",
    style: "card-denied",
    rota: ROTA.SOLICITACOES_NAO_HOMOLOGADAS,
    incluir_status: [CODAE_NAO_HOMOLOGADO]
  }
];
const CARDS_GESTAO = [
  {
    id: CARD_ID.AGUARDANDO_ANALISE_RECLAMACAO,
    titulo: "Aguardando análise de reclamação",
    titulo_menu: "Ag. análise de reclamação", // FIXME: Confirmar nome no menu
    icon: "fa-history",
    style: "card-awaiting-complain",
    rota: ROTA.AGUARDANDO_ANALISE_RECLAMACAO,
    incluir_status: [CODAE_QUESTIONADO]
  },
  {
    id: CARD_ID.AGUARDANDO_ANALISE_SENSORIAL,
    titulo: "Aguardando análise sensorial",
    titulo_menu: "Ag. análise sensorial",
    icon: "fa-search",
    style: "card-awaiting-sensory",
    rota: ROTA.AGUARDANDO_ANALISE_SENSORIAL,
    incluir_status: [CODAE_PEDIU_ANALISE_SENSORIAL]
  },
  {
    id: CARD_ID.PENDENTE_HOMOLOGACAO,
    titulo: "Pendente homologação",
    icon: "fa-exclamation-triangle",
    style: "card-pending",
    rota: ROTA.SOLICITACOES_PENDENTE_HOMOLOGACAO,
    incluir_status: [CODAE_PENDENTE_HOMOLOGACAO]
  }
];

const CARD_CORRECAO = {
  id: CARD_ID.CORRECAO_DE_PRODUTO,
  titulo: "Correção de produto",
  icon: "fa-pencil-alt",
  style: "card-product-correction",
  rota: ROTA.CORRECAO_DE_PRODUTO,
  incluir_status: [CODAE_AUTORIZOU_RECLAMACAO]
};

export const listarCardsPermitidos = () => {
  const perfil = localStorage.getItem("tipo_perfil");
  const cards = CARDS_COMUNS.concat();

  switch (perfil) {
    case TIPO_PERFIL.TERCEIRIZADA:
      cards.push(...CARDS_GESTAO);
      break;
    case TIPO_PERFIL.GESTAO_ALIMENTACAO_TERCEIRIZADA:
      cards.push(...CARDS_GESTAO, CARD_CORRECAO);
      break;
    case TIPO_PERFIL.GESTAO_PRODUTO:
      cards.push(...CARDS_GESTAO);
      cards
        .filter(card => card.id === CARD_ID.PENDENTE_HOMOLOGACAO)[0]
        .incluir_status.push(CODAE_QUESTIONADO);
      break;
    default:
      return cards;
  }

  return cards;
};
