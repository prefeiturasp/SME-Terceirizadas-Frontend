const montaObjetoFaixasEtarias = faixas_etarias => {
  const lista = [];
  Object.entries(faixas_etarias).forEach(dadosFaixa => {
    const [faixa_etaria, quantidade] = dadosFaixa;
    lista.push({ faixa_etaria, quantidade });
  });
  return lista;
};

export const montaObjetoRequisicao = values => {
  let kit_lanche_avulso = {
    solicitacao_kit_lanche: {
      kits: values.kit_lanche,
      descricao: values.observacao,
      data: values.evento_data,
      tempo_passeio: values.tempo_passeio
    },
    faixas_etarias: montaObjetoFaixasEtarias(values.faixas_etarias),
    escola: values.escola,
    local: values.local,
    quantidade_alunos: values.quantidade_alunos,
    alunos_com_dieta_especial_participantes: values.alunos_com_dieta_especial_participantes
      ? Object.keys(values.alunos_com_dieta_especial_participantes)
      : []
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
