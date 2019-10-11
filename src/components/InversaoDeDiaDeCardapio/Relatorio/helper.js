import moment from "moment";

export const prazoDoPedidoMensagem = (
  data,
  proximos_dois_dias_uteis,
  proximos_cinco_dias_uteis
) => {
  const dataObj = moment(data, "DD/MM/YYYY");
  if (dataObj <= proximos_dois_dias_uteis)
    return "Pedido próximo ao prazo de vencimento";
  else if (proximos_dois_dias_uteis < dataObj < proximos_cinco_dias_uteis)
    return "Pedido no prazo limite";
  else return "Pedido no prazo regular";
};

export const corDaMensagem = mensagem => {
  if (mensagem.includes("vencimento")) return "red";
  else if (mensagem.includes("limite")) return "yellow";
  else return "green";
};
