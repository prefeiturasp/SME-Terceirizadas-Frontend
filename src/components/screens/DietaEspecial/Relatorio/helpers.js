const DESCRICAO_SOLICITACAO = {
  CODAE_A_AUTORIZAR: "Solicitação de Inclusão",
  CODAE_NEGOU_PEDIDO: "Negada a Inclusão",
  CODAE_AUTORIZADO: "Autorizada",
  ESCOLA_SOLICITOU_INATIVACAO: "Solicitação de Cancelamento",
  CODAE_NEGOU_INATIVACAO: "Negada o Cancelamento",
  CODAE_AUTORIZOU_INATIVACAO: "Cancelamento Autorizado",
  ESCOLA_CANCELOU: "Cancelada pela Unidade Escolar",
  TERMINADA_AUTOMATICAMENTE_SISTEMA: "Cancelada por atingir data de término"
};

export const cabecalhoDieta = dietaEspecial => {
  return `Dieta Especial - ${
    DESCRICAO_SOLICITACAO[dietaEspecial.status_solicitacao]
  }`;
};
