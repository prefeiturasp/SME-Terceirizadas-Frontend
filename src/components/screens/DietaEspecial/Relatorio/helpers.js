const DESCRICAO_SOLICITACAO = {
  CODAE_A_AUTORIZAR: "Solicitação de Inclusão",
  CODAE_NEGOU_PEDIDO: "Negada a Inclusão",
  CODAE_AUTORIZADO: "Autorizada",
  ESCOLA_SOLICITOU_INATIVACAO: "Solicitação de Cancelamento",
  CODAE_NEGOU_INATIVACAO: "Negada o Cancelamento",
  CODAE_AUTORIZOU_INATIVACAO: "Cancelamento Autorizado",
  ESCOLA_CANCELOU: "Cancelada pela Unidade Educacional",
  TERMINADA_AUTOMATICAMENTE_SISTEMA:
    "Cancelamento automático por atingir data de término",
  CANCELADO_ALUNO_MUDOU_ESCOLA:
    "Cancelamento para aluno não matriculado na Unidade Educacional",
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

export const ehSolicitacaoDeCancelamento = status => {
  return [
    "ESCOLA_CANCELOU",
    "TERMINADA_AUTOMATICAMENTE_SISTEMA",
    "CANCELADO_ALUNO_MUDOU_ESCOLA",
    "CANCELADO_ALUNO_NAO_PERTENCE_REDE"
  ].includes(status);
};

export const formataJustificativa = dietaEspecial => {
  let justificativa = null;
  if (dietaEspecial.status_solicitacao === "ESCOLA_CANCELOU") {
    if (dietaEspecial.logs.length === 2) {
      justificativa =
        dietaEspecial.logs[dietaEspecial.logs.length - 1].justificativa;
    } else {
      justificativa = dietaEspecial.logs[2].justificativa;
    }
  }
  if (
    dietaEspecial.status_solicitacao === "TERMINADA_AUTOMATICAMENTE_SISTEMA"
  ) {
    justificativa = "Cancelamento automático por atingir data de término.";
  }
  if (
    dietaEspecial.status_solicitacao === "CANCELADO_ALUNO_NAO_PERTENCE_REDE"
  ) {
    justificativa =
      "Cancelamento automático para aluno não matriculado na rede municipal.";
  }
  if (dietaEspecial.status_solicitacao === "CANCELADO_ALUNO_MUDOU_ESCOLA") {
    justificativa =
      "Cancelamento automático para aluno não matriculado na Unidade Educacional.";
  }
  return justificativa;
};

export const mostrarFormulário = status => {
  return [
    "ESCOLA_CANCELOU",
    "TERMINADA_AUTOMATICAMENTE_SISTEMA",
    "CANCELADO_ALUNO_MUDOU_ESCOLA",
    "CANCELADO_ALUNO_NAO_PERTENCE_REDE",
    "CODAE_A_AUTORIZAR"
  ].includes(status);
};

export const mostrarFormUsuarioEscola = (perfil, dieta) => {
  const tipoUsuario = localStorage.getItem("tipo_perfil");
  if (
    tipoUsuario === perfil &&
    dieta.status_solicitacao === "CODAE_A_AUTORIZAR"
  ) {
    return false;
  } else {
    return true;
  }
};

export const ehCanceladaSegundoStep = dieta => {
  if (
    dieta.logs.length === 2 &&
    dieta.logs[1].status_evento_explicacao === "Escola cancelou"
  ) {
    return true;
  } else {
    return false;
  }
};
// (dietaEspecial && dietaEspecial.logs.length === 2 && status === "ESCOLA_CANCELOU")? true : false;
