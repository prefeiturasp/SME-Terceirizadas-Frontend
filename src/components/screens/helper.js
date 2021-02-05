import {
  ALTERACAO_CARDAPIO,
  DIETA_ESPECIAL,
  INCLUSAO_ALIMENTACAO,
  INVERSAO_CARDAPIO,
  RELATORIO,
  SOLICITACAO_KIT_LANCHE,
  SOLICITACAO_KIT_LANCHE_UNIFICADA,
  SUSPENSAO_ALIMENTACAO
} from "../../configs/constants";
import { truncarString } from "../../helpers/utilities";
import { TIPO_SOLICITACAO } from "constants/shared";

const ALT_CARDAPIO = "ALT_CARDAPIO";
const DIETA_ESP = "DIETA_ESPECIAL";
const INC_ALIMENTA = "INC_ALIMENTA";
const INV_CARDAPIO = "INV_CARDAPIO";
const KIT_LANCHE_AVULSA = "KIT_LANCHE_AVULSA";
const KIT_LANCHE_UNIFICADA = "KIT_LANCHE_UNIFICADA";
const SUSP_ALIMENTACAO = "SUSP_ALIMENTACAO";
const INC_ALIMENTA_CONTINUA = "INC_ALIMENTA_CONTINUA";
const INC_ALIMENTA_CEI = "INC_ALIMENTA_CEI";
const ALT_CARDAPIO_CEI = "ALT_CARDAPIO_CEI";
const KIT_LANCHE_AVULSA_CEI = "KIT_LANCHE_AVULSA_CEI";

export const LOG_PARA = {
  ESCOLA: 0,
  DRE: 1,
  CODAE: 3,
  TERCEIRIZADA: 2
};

export const ajustaFormatoLogPainelDietaEspecial = logs => {
  if (!logs) return;
  return logs.map(log => {
    let tamanhoString = 53;
    let descricao = log.descricao;
    return {
      text:
        truncarString(descricao, tamanhoString) + " - " + log.codigo_eol_aluno,
      date: log.data_log,
      link: `/${DIETA_ESPECIAL}/${RELATORIO}?uuid=${
        log.uuid
      }&ehInclusaoContinua=${log.tipo_doc === INC_ALIMENTA_CONTINUA}`
    };
  });
};

export const ajustarFormatoLog = logs => {
  return logs.map(log => {
    let tamanhoString = 48;
    let descricao = log.descricao;
    let solicitacao = "falta-implementar";
    let tipo = "";
    switch (log.tipo_doc) {
      case ALT_CARDAPIO:
        solicitacao = ALTERACAO_CARDAPIO;
        tipo = TIPO_SOLICITACAO.SOLICITACAO_NORMAL;
        break;

      case DIETA_ESP:
        solicitacao = DIETA_ESPECIAL;
        descricao = log.descricao_dieta_especial;
        tamanhoString = 150;
        break;

      case KIT_LANCHE_AVULSA:
        solicitacao = SOLICITACAO_KIT_LANCHE;
        tipo = TIPO_SOLICITACAO.SOLICITACAO_NORMAL;
        break;

      case INV_CARDAPIO:
        solicitacao = INVERSAO_CARDAPIO;
        tipo = TIPO_SOLICITACAO.SOLICITACAO_NORMAL;
        break;

      case INC_ALIMENTA:
        solicitacao = INCLUSAO_ALIMENTACAO;
        tipo = TIPO_SOLICITACAO.SOLICITACAO_NORMAL;
        break;

      case SUSP_ALIMENTACAO:
        solicitacao = SUSPENSAO_ALIMENTACAO;
        tipo = TIPO_SOLICITACAO.SOLICITACAO_NORMAL;
        break;
      case KIT_LANCHE_UNIFICADA:
        solicitacao = SOLICITACAO_KIT_LANCHE_UNIFICADA;
        tipo = TIPO_SOLICITACAO.SOLICITACAO_NORMAL;
        break;
      case INC_ALIMENTA_CONTINUA:
        solicitacao = INCLUSAO_ALIMENTACAO;
        tipo = TIPO_SOLICITACAO.SOLICITACAO_CONTINUA;
        break;

      case INC_ALIMENTA_CEI:
        solicitacao = INCLUSAO_ALIMENTACAO;
        tipo = TIPO_SOLICITACAO.SOLICITACAO_CEI;
        break;

      case ALT_CARDAPIO_CEI:
        solicitacao = ALTERACAO_CARDAPIO;
        tipo = TIPO_SOLICITACAO.SOLICITACAO_CEI;
        break;

      case KIT_LANCHE_AVULSA_CEI:
        solicitacao = SOLICITACAO_KIT_LANCHE;
        tipo = TIPO_SOLICITACAO.SOLICITACAO_CEI;
        break;

      default:
        solicitacao = "NAO_ENCONTRADO";
        break;
    }
    return {
      text: truncarString(descricao, tamanhoString),
      date: log.data_log,
      link: `/${solicitacao}/${RELATORIO}?uuid=${
        log.uuid
      }&ehInclusaoContinua=${log.tipo_doc ===
        INC_ALIMENTA_CONTINUA}&tipoSolicitacao=${tipo}`
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
