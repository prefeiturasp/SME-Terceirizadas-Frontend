export const formatarPedidos = pedidos => {
  return pedidos.map(pedido => {
    let novoPedido = pedido;
    novoPedido["checked"] = false;
    return novoPedido;
  });
};

export const filtraPrioritarios = (pedidos, filtro = null) => {
  return pedidos.filter(pedido => {
    const prioridade = filtro
      ? pedido[filtro]["prioridade"]
      : pedido["prioridade"];

    return prioridade === "PRIORITARIO";
  });
};

export const filtraNoLimite = (pedidos, filtro = null) => {
  return pedidos.filter(pedido => {
    const prioridade = filtro
      ? pedido[filtro]["prioridade"]
      : pedido["prioridade"];

    return prioridade === "LIMITE";
  });
};
export const filtraRegular = (pedidos, filtro = null) => {
  return pedidos.filter(pedido => {
    const prioridade = filtro
      ? pedido[filtro]["prioridade"]
      : pedido["prioridade"];

    return prioridade === "REGULAR";
  });
};

// de informativo
export const filtraCiencia = informacoes => {
  return informacoes.filter(pedido => {
    return pedido.status === "TERCEIRIZADA_TOMA_CIENCIA";
  });
};

export const filtraInformados = informacoes => {
  return informacoes.filter(pedido => {
    return pedido.status === "INFORMADO";
  });
};
