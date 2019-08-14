export const calcularNumeroDeEscolas = pedidos => {
  let escolasDiferentes = [];
  pedidos.forEach(pedido => {
    if (!escolasDiferentes.includes(pedido.escola.uuid))
      escolasDiferentes.push(pedido.escola.uuid);
  });
  return escolasDiferentes.length;
};
