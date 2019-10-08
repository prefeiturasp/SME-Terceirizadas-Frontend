export const formatarPedidos = pedidos => {
  return pedidos.map(pedido => {
    let novoPedido = pedido;
    novoPedido["checked"] = false;
    return novoPedido;
  });
};

export const obtemDataSolicitacao = solicitacao => {
  return solicitacao.logs[1].criado_em;
};

export const filtraPrioritarios = pedidos => {
  return pedidos.filter(pedido => {
    return pedido.prioridade === "PRIORITARIO";
  });
};

export const filtraNoLimite = pedidos => {
  return pedidos.filter(pedido => {
    return pedido.prioridade === "LIMITE";
  });
};

export const filtraRegular = pedidos => {
  return pedidos.filter(pedido => {
    return pedido.prioridade === "REGULAR";
  });
};
