export const prazoDoPedidoMensagem = prioridade => {
  switch (prioridade) {
    case "REGULAR":
      return "Pedido no prazo regular";
    case "LIMITE":
      return "Pedido no prazo limite";
    case "PRIORITARIO":
      return "Pedido próximo ao prazo de vencimento";
    default:
      return "";
  }
};

export const corDaMensagem = mensagem => {
  if (mensagem.includes("vencimento")) return "red";
  else if (mensagem.includes("limite")) return "yellow";
  else return "green";
};
