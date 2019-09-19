import {
  ALTERACAO_CARDAPIO,
  ESCOLA,
  INVERSAO_CARDAPIO,
  RELATORIO,
  SOLICITACAO_KIT_LANCHE
} from "../../../configs/constants";

const ALT_CARDAPIO = "ALT_CARDAPIO";
const INC_ALIMENTA = "INC_ALIMENTA";
const INV_CARDAPIO = "INV_CARDAPIO";
const KIT_LANCHE_AVULSA = "KIT_LANCHE_AVULSA";
const SUSP_ALIMENTACAO = "SUSP_ALIMENTACAO";

export const ajustarFormatoLog = logs => {
  return logs.map(log => {
    let solicitacao = "falta-implementar";
    switch (log.tipo_doc) {
      case ALT_CARDAPIO:
        solicitacao = ALTERACAO_CARDAPIO;
        break;

      case KIT_LANCHE_AVULSA:
        solicitacao = SOLICITACAO_KIT_LANCHE;
        break;

      case INV_CARDAPIO:
        solicitacao = INVERSAO_CARDAPIO;
        break;

      default:
        solicitacao = "FALTA_IMPLEMENTAR";
        break;
    }
    return {
      text: log.descricao,
      date: log.data_log,
      link: `/${ESCOLA}/${solicitacao}/${RELATORIO}?uuid=${log.uuid}`
    };
  });
};
