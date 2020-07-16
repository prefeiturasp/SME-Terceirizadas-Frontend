import moment from "moment";

import {
  truncarString,
  usuarioEhTerceirizada,
  usuarioEhCODAEGestaoProduto
} from "helpers/utilities";
import {
  RELATORIO,
  GESTAO_PRODUTO,
  EDITAR,
  PESQUISA_DESENVOLVIMENTO
} from "configs/constants";
import { ENDPOINT_HOMOLOGACOES_PRODUTO_STATUS } from "constants/shared";
const {
  CODAE_PEDIU_ANALISE_RECLAMACAO,
  TERCEIRIZADA_RESPONDEU_RECLAMACAO,
  ESCOLA_OU_NUTRICIONISTA_RECLAMOU,
  CODAE_PEDIU_ANALISE_SENSORIAL
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
    return `/${GESTAO_PRODUTO}/responder-reclamacao/detalhe?id=${item.uuid}`;
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
  }
  return apontaParaEdicao
    ? `/${GESTAO_PRODUTO}/${EDITAR}?uuid=${item.uuid}`
    : `/${GESTAO_PRODUTO}/${RELATORIO}?uuid=${item.uuid}`;
};

export const ordenaPorLogMaisRecente = (a, b) => {
  const formats = ["DD/MM/YYYY", "DD/MM/YYYY HH:mm"];
  const data_a = moment(a.log_mais_recente, formats);
  const data_b = moment(b.log_mais_recente, formats);
  if (data_a.isBefore(data_b)) {
    return -1;
  }
  if (data_b.isBefore(data_a)) {
    return 1;
  }
  return 0;
};

export const formataCards = (items, apontaParaEdicao) => {
  return items.sort(ordenaPorLogMaisRecente).map(item => ({
    text: `${item.id_externo} - ${truncarString(item.nome_produto, 48)}`,
    date: item.log_mais_recente,
    link: gerarLinkDoItem(item, apontaParaEdicao)
  }));
};
