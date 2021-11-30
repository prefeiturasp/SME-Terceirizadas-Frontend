import {
  ALTERACAO_TIPO_ALIMENTACAO,
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
import { usuarioEhEscola } from "../../helpers/utilities";
import { STATUS_ALIMENTO } from "./const";

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

export const ajustaFormatoLogPainelDietaEspecial = (logs, card) => {
  if (!logs) return;
  return logs.map(log => {
    let tamanhoString = 53;
    let descricao = log.descricao;
    let texto = truncarString(descricao, tamanhoString);
    let nomeAluno = log.nome_aluno;
    let textoDieta =
      (log.codigo_eol_aluno !== null
        ? log.codigo_eol_aluno
        : "(Aluno não matriculado)") +
      " - " +
      nomeAluno;
    let serie = log.serie ? log.serie : "";
    // Faz uma abreviação no texto quando tiver data com hora pra não quebrar o layout.
    if (
      log.data_log.length > 10 &&
      texto
        .split("-")
        .pop()
        .trim() === "Alteração U.E"
    ) {
      texto = texto.replace("Alteração", "Alt.");
    }
    return {
      conferido: log.conferido,
      lote_uuid: log.lote_uuid,
      text: truncarString(
        `${textoDieta}${usuarioEhEscola() ? " - " + serie : ""}`,
        41
      ),
      date: log.data_log,
      link: `/${DIETA_ESPECIAL}/${RELATORIO}?uuid=${
        log.uuid
      }&ehInclusaoContinua=${log.tipo_doc ===
        INC_ALIMENTA_CONTINUA}&card=${card}`
    };
  });
};

export const ajustarFormatoLog = (logs, card) => {
  return logs.map(log => {
    let tamanhoString = 52;
    let descricao = log.descricao;
    let solicitacao = "falta-implementar";
    let tipo = "";
    switch (log.tipo_doc) {
      case ALT_CARDAPIO:
        solicitacao = ALTERACAO_TIPO_ALIMENTACAO;
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
        solicitacao = ALTERACAO_TIPO_ALIMENTACAO;
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
      text: usuarioEhEscola()
        ? truncarString(descricao, tamanhoString) +
          (log.serie ? " - " + log.serie : "")
        : truncarString(descricao, tamanhoString) + " / " + log.escola_nome,
      conferido: log.conferido || log.terceirizada_conferiu_gestao,
      lote_uuid: log.lote_uuid,
      date: log.data_log,
      link: `/${solicitacao}/${RELATORIO}?uuid=${
        log.uuid
      }&ehInclusaoContinua=${log.tipo_doc ===
        INC_ALIMENTA_CONTINUA}&tipoSolicitacao=${tipo}&card=${card}`
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

export const slugify = str => {
  // Function from https://gist.github.com/marcelo-ribeiro/abd651b889e4a20e0bab558a05d38d77
  const map = {
    "-": "_",
    a: "á|à|ã|â|ä|À|Á|Ã|Â|Ä",
    e: "é|è|ê|ë|É|È|Ê|Ë",
    i: "í|ì|î|ï|Í|Ì|Î|Ï",
    o: "ó|ò|ô|õ|ö|Ó|Ò|Ô|Õ|Ö",
    u: "ú|ù|û|ü|Ú|Ù|Û|Ü",
    c: "ç|Ç",
    n: "ñ|Ñ"
  };

  for (const pattern in map) {
    str = str.replace(new RegExp(map[pattern], "g"), pattern);
  }

  return str;
};

export const mapeiaStatusAlimento = str => {
  if (str === "Recebido") return STATUS_ALIMENTO.RECEBIDO;
  if (str === "Parcial") return STATUS_ALIMENTO.PARCIAL;
  if (str === "Não Recebido") return STATUS_ALIMENTO.NAO_RECEBIDO;
};
