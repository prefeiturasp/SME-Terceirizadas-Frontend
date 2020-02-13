export const filtraPrioritarios = pedidos => {
  return pedidos.filter(pedido => {
    return pedido.solicitacao_kit_lanche.prioridade === "PRIORITARIO";
  });
};

export const filtraNoLimite = pedidos => {
  return pedidos.filter(pedido => {
    return pedido.solicitacao_kit_lanche.prioridade === "LIMITE";
  });
};

export const filtraRegular = pedidos => {
  return pedidos.filter(pedido => {
    return pedido.solicitacao_kit_lanche.prioridade === "REGULAR";
  });
};

export const filtrarTotalSolicitacoes = pedidos => {
  return pedidos.length;
};
