import { truncarString } from "../../../helpers/utilities";
import { RELATORIO, GESTAO_PRODUTO } from "../../../configs/constants";

export const getCardIcon = cardTitle => {
  switch (cardTitle) {
    case "Reclamação de produto":
      return "fa-bullhorn";
    case "Produtos suspensos":
      return "fa-hand-paper";
    case "Correção de produto":
      return "fa-pencil-alt";
    case "Aguardando análise de reclamação":
      return "fa-history";
    case "Aguardando análise sensorial":
      return "fa-search";
    case "Homologados":
      return "fa-check";
    case "Não homologados":
      return "fa-ban";
    case "Pendente homologação":
    default:
      return "fa-exclamation-triangle";
  }
};

export const getCardStyle = cardTitle => {
  switch (cardTitle) {
    case "Reclamação de produto":
      return "card-complained";
    case "Produtos suspensos":
      return "card-cancelled";
    case "Correção de produto":
      return "card-product-correction";
    case "Aguardando análise de reclamação":
      return "card-awaiting-complain";
    case "Aguardando análise sensorial":
      return "card-awaiting-sensory";
    case "Homologados":
      return "card-authorized";
    case "Não homologados":
      return "card-denied";
    case "Pendente homologação":
    default:
      return "card-pending";
  }
};

export const formataCards = cards => {
  if (cards.length) {
    let cardsFormatados = [];
    cards.forEach(card => {
      cardsFormatados.push({
        text: `${card.id_externo} - ${truncarString(card.nome_produto, 48)}`,
        date: card.log_mais_recente,
        link: `/${GESTAO_PRODUTO}/${RELATORIO}?uuid=${card.uuid}`
      });
    });
    return cardsFormatados;
  } else {
    return [];
  }
};
