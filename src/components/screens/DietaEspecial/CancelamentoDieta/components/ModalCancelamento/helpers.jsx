export const getStatusSolicitacaoFrontend = status => {
  switch (status) {
    case "CODAE_A_AUTORIZAR":
      return "Aguardando Autorização";

    case "CODAE_NEGOU_PEDIDO":
      return "Negada";

    case "CODAE_AUTORIZADO":
      return "Autorizada";

    case "ESCOLA_CANCELOU":
      return "Cancelada";
  }
};
