export const montaObjetoRequisicao = values => {
  let kit_lanche_avulso = {
    solicitacao_kit_lanche: {
      kits: values.kit_lanche,
      descricao: values.observacao,
      data: values.evento_data,
      tempo_passeio: values.tempo_passeio
    },
    escola: values.escola,
    local: values.local,
    quantidade_alunos: values.quantidade_alunos
  };
  return kit_lanche_avulso;
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
