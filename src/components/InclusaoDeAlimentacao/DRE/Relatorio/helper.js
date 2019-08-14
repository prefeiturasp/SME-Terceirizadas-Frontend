export const prazoDoPedidoMensagem = (
  data,
  proximos_dois_dias_uteis,
  proximos_cinco_dias_uteis
) => {
  const _data = data.split("/");
  const dataObj = new Date(_data[2], _data[1] - 1, _data[0]);
  if (dataObj <= proximos_dois_dias_uteis)
    return "Pedido próximo ao prazo de vencimento";
  else if (proximos_dois_dias_uteis < dataObj < proximos_cinco_dias_uteis)
    return "Pedido no prazo limite";
  else return "Pedido no prazo regular";
};
