import { truncarString } from "../../../helpers/utilities";
import { RELATORIO, GESTAO_PRODUTO } from "../../../configs/constants";

export const CARDS_CONFIG = {
  "Reclamação de produto": {
    icone: "blabla", // TODO: check if this is not dummy code
    style: "blabla"
  }
};

export const incluirDados = (statuses, arr) => {
  const result = [];
  arr.map(el => {
    if (el.dados.length && statuses.includes(el.status.toLowerCase())) {
      result.push(...el.dados);
    }
  });
  return result;
};

export const formataCards = cards => {
  return cards.map(card => ({
    text: `${card.id_externo} - ${truncarString(card.nome_produto, 48)}`,
    date: card.log_mais_recente,
    link: `/${GESTAO_PRODUTO}/${RELATORIO}?uuid=${card.uuid}`
  }));
};
