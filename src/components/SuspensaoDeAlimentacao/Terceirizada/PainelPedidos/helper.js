export const formatarPedidos = pedidos => {
  return pedidos.map(pedido => {
    let novoPedido = pedido;
    novoPedido["checked"] = false;
    return novoPedido;
  });
};

export const obtemDataSolicitacao = solicitacao => {
    return solicitacao.logs[1].criado_em
}