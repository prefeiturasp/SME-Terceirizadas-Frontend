const DESCRICAO_SOLICITACAO = {
  CODAE_A_AUTORIZAR: "Solicitação de Inclusão",
  CODAE_NEGOU_PEDIDO: "Negada a Inclusão",
  CODAE_AUTORIZADO: "Autorizada",
  ESCOLA_SOLICITOU_INATIVACAO: "Solicitação de Cancelamento",
  CODAE_NEGOU_INATIVACAO: "Negada o Cancelamento",
  CODAE_AUTORIZOU_INATIVACAO: "Cancelamento Autorizado",
  ESCOLA_CANCELOU: "Cancelada pela Unidade Escolar",
  TERMINADA_AUTOMATICAMENTE_SISTEMA: "Cancelada por atingir data de término",
  CANCELADO_ALUNO_MUDOU_ESCOLA:
    "Cancelamento por alteração de unidade educacional",
  CANCELADO_ALUNO_NAO_PERTENCE_REDE:
    "Cancelamento para aluno não matriculado na rede municipal"
};

export const cabecalhoDieta = dietaEspecial => {
  let descricao = null;
  if (
    dietaEspecial.status_solicitacao === "CODAE_A_AUTORIZAR" &&
    dietaEspecial.tipo_solicitacao === "ALTERACAO_UE"
  ) {
    descricao = "Solicitação de Alteração de U.E";
  } else {
    descricao = DESCRICAO_SOLICITACAO[dietaEspecial.status_solicitacao];
  }

  return `Dieta Especial - ${descricao}`;
};
