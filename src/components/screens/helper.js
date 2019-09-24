import {
  ALTERACAO_CARDAPIO,
  DRE,
  ESCOLA,
  INCLUSAO_ALIMENTACAO,
  INVERSAO_CARDAPIO,
  RELATORIO,
  SOLICITACAO_KIT_LANCHE,
  SOLICITACAO_KIT_LANCHE_UNIFICADA,
  SUSPENSAO_ALIMENTACAO
} from "../../configs/constants";

const ALT_CARDAPIO = "ALT_CARDAPIO";
const INC_ALIMENTA = "INC_ALIMENTA";
const INV_CARDAPIO = "INV_CARDAPIO";
const KIT_LANCHE_AVULSA = "KIT_LANCHE_AVULSA";
const KIT_LANCHE_UNIFICADA = "KIT_LANCHE_UNIFICADA";
const SUSP_ALIMENTACAO = "SUSP_ALIMENTACAO";
const INC_ALIMENTA_CONTINUA = "INC_ALIMENTA_CONTINUA";

export const LOG_PARA = {
  ESCOLA: 0,
  DRE: 1,
  CODAE: 3,
  TERCEIRIZADA: 2
};

export const ajustarFormatoLog = (logs, visao = LOG_PARA.ESCOLA) => {
  let tipoRelatorio = "";
  switch (visao) {
    case LOG_PARA.ESCOLA:
      tipoRelatorio = ESCOLA;
      break;
    case LOG_PARA.DRE:
      tipoRelatorio = DRE;
      break;
    default:
      break;
  }
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

      case INC_ALIMENTA:
        solicitacao = INCLUSAO_ALIMENTACAO;
        break;

      case SUSP_ALIMENTACAO:
        solicitacao = SUSPENSAO_ALIMENTACAO;
        break;
      case KIT_LANCHE_UNIFICADA:
        solicitacao = SOLICITACAO_KIT_LANCHE_UNIFICADA;
        break;
      case INC_ALIMENTA_CONTINUA:
        solicitacao = INCLUSAO_ALIMENTACAO;

      default:
        solicitacao = "FALTA_IMPLEMENTAR";
        break;
    }
    return {
      text: log.descricao,
      date: log.data_log,
      link: `/${tipoRelatorio}/${solicitacao}/${RELATORIO}?uuid=${log.uuid}`
    };
  });
};

export const ajustarFormaLotes = lotes => {
  return lotes.map(lote => {
    return {
      id: lote.uuid,
      lote: lote.nome,
      dre: lote.diretoria_regional && lote.diretoria_regional.nome,
      tipo: lote.tipo_gestao && lote.tipo_gestao.nome
    };
  });
};
