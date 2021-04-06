import {
  truncarString,
  usuarioEhTerceirizada,
  usuarioEhCODAEGestaoProduto,
  parseDataHoraBrToMoment,
  comparaObjetosMoment
} from "helpers/utilities";
import {
  RELATORIO,
  GESTAO_PRODUTO,
  EDITAR,
  PESQUISA_DESENVOLVIMENTO,
  ATIVACAO_DE_PRODUTO
} from "configs/constants";
import { ENDPOINT_HOMOLOGACOES_PRODUTO_STATUS } from "constants/shared";
const {
  CODAE_PEDIU_ANALISE_RECLAMACAO,
  TERCEIRIZADA_RESPONDEU_RECLAMACAO,
  ESCOLA_OU_NUTRICIONISTA_RECLAMOU,
  CODAE_PEDIU_ANALISE_SENSORIAL,
  CODAE_SUSPENDEU,
  CODAE_HOMOLOGADO,
  CODAE_AUTORIZOU_RECLAMACAO,
  CODAE_NAO_HOMOLOGADO,
  CODAE_QUESTIONADO
} = ENDPOINT_HOMOLOGACOES_PRODUTO_STATUS;

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

const gerarLinkDoItem = (item, apontaParaEdicao) => {
  if (
    item.status.toLowerCase() === CODAE_PEDIU_ANALISE_RECLAMACAO &&
    usuarioEhTerceirizada()
  ) {
    return `/${GESTAO_PRODUTO}/responder-reclamacao/consulta?uuid=${item.uuid}`;
  } else if (
    item.status.toLowerCase() === CODAE_PEDIU_ANALISE_SENSORIAL &&
    usuarioEhTerceirizada()
  ) {
    return `/${PESQUISA_DESENVOLVIMENTO}/relatorio-analise-sensorial?uuid=${
      item.uuid
    }`;
  } else if (
    usuarioEhCODAEGestaoProduto() &&
    [
      TERCEIRIZADA_RESPONDEU_RECLAMACAO,
      ESCOLA_OU_NUTRICIONISTA_RECLAMOU,
      CODAE_PEDIU_ANALISE_RECLAMACAO
    ].includes(item.status.toLowerCase())
  ) {
    return `/${GESTAO_PRODUTO}/avaliar-reclamacao-produto?uuid=${item.uuid}
      `;
  } else if (
    usuarioEhCODAEGestaoProduto() &&
    item.status.toLowerCase() === CODAE_SUSPENDEU
  ) {
    return `/${GESTAO_PRODUTO}/${ATIVACAO_DE_PRODUTO}/detalhe?id=${item.uuid}`;
  } else if (
    usuarioEhTerceirizada() &&
    [
      CODAE_HOMOLOGADO,
      CODAE_SUSPENDEU,
      CODAE_NAO_HOMOLOGADO,
      CODAE_QUESTIONADO,
      CODAE_AUTORIZOU_RECLAMACAO
    ].includes(item.status.toLowerCase())
  ) {
    return `/${GESTAO_PRODUTO}/${EDITAR}?uuid=${item.uuid}`;
  }

  return apontaParaEdicao
    ? `/${GESTAO_PRODUTO}/${EDITAR}?uuid=${item.uuid}`
    : `/${GESTAO_PRODUTO}/${RELATORIO}?uuid=${item.uuid}`;
};

export const ordenaPorLogMaisRecente = (a, b) => {
  const data_a = parseDataHoraBrToMoment(a.log_mais_recente);
  const data_b = parseDataHoraBrToMoment(b.log_mais_recente);
  return comparaObjetosMoment(data_b, data_a);
};

const getText = item => {
  const TAMANHO_MAXIMO = 48;
  let appendix = "";

  if (
    usuarioEhTerceirizada() &&
    item.status.toLowerCase() === CODAE_PEDIU_ANALISE_RECLAMACAO
  ) {
    appendix = ` (${item.qtde_questionamentos})`;
  }
  if (
    usuarioEhCODAEGestaoProduto() &&
    [
      CODAE_PEDIU_ANALISE_RECLAMACAO,
      ESCOLA_OU_NUTRICIONISTA_RECLAMOU,
      TERCEIRIZADA_RESPONDEU_RECLAMACAO
    ].includes(item.status.toLowerCase())
  ) {
    appendix = ` (${item.qtde_reclamacoes})`;
  }

  return `${item.id_externo} - ${truncarString(
    item.nome_produto,
    TAMANHO_MAXIMO - appendix.length
  )}${appendix}`;
};

export const formataCards = (items, apontaParaEdicao) => {
  return items.sort(ordenaPorLogMaisRecente).map(item => ({
    text: getText(item),
    date: item.log_mais_recente,
    link: gerarLinkDoItem(item, apontaParaEdicao)
  }));
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
