import { retornaTempoPasseio } from "../Shareable/KitLanche/helper";


export const montaObjetoRequisicao = values => {
  let kit_lanche_avulso = {
    solicitacao_kit_lanche: {
      kits: values.kit_lanche,
      descricao: values.observacao,
      data: values.evento_data,
      tempo_passeio: retornaTempoPasseio(values.tempo_passeio)
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

export const montaBarraStatus = status => {
  switch (status) {
    case "DRE_A_VALIDAR" || "DRE_PEDE_ESCOLA_REVISAR":
      return [{
        titulo: "Solicitação Realizada",
        status: "aprovado",
        timestamp: "",
        rf: "",
        nome: ""
      }]
    case "DRE_APROVADO":
      return [
        {
        titulo: "Solicitação Realizada",
        status: "aprovado",
        timestamp: "",
        rf: "",
        nome: ""
      },
      {
        titulo: "Aprovado da DRE",
        status: "aprovado",
        timestamp: "",
        rf: "",
        nome: ""
      }
    ]
    case "DRE_CANCELA_PEDIDO_ESCOLA":
        return [
          {
          titulo: "Solicitação Realizada",
          status: "aprovado",
          timestamp: "",
          rf: "",
          nome: ""
        },
        {
          titulo: "Reprovado da DRE",
          status: "cancelado",
          timestamp: "",
          rf: "",
          nome: ""
        },
      ]
    case "CODAE_APROVADO":
        return [
          {
            titulo: "Solicitação Realizada",
            status: "aprovado",
            timestamp: "",
            rf: "",
            nome: ""
          },
          {
            titulo: "Aprovado da DRE",
            status: "aprovado",
            timestamp: "",
            rf: "",
            nome: ""
          },
          {
            titulo: "Aprovado da CODAE",
            status: "aprovado",
            timestamp: "",
            rf: "",
            nome: ""
          },
        ]
    case "CODAE_CANCELOU_PEDIDO":
        return [
          {
            titulo: "Solicitação Realizada",
            status: "aprovado",
            timestamp: "",
            rf: "",
            nome: ""
          },
          {
            titulo: "Aprovado da DRE",
            status: "aprovado",
            timestamp: "",
            rf: "",
            nome: ""
          },
          {
            titulo: "Reprovado da CODAE",
            status: "cancelado",
            timestamp: "",
            rf: "",
            nome: ""
          },
        ]
    case "TERCEIRIZADA_TOMA_CIENCIA":
        return [
          {
            titulo: "Solicitação Realizada",
            status: "aprovado",
            timestamp: "",
            rf: "",
            nome: ""
          },
          {
            titulo: "Aprovado da DRE",
            status: "aprovado",
            timestamp: "",
            rf: "",
            nome: ""
          },
          {
            titulo: "Aprovado da CODAE",
            status: "aprovado",
            timestamp: "",
            rf: "",
            nome: ""
          },
          {
            titulo: "Ciente da Terceirizada",
            status: "aprovado",
            timestamp: "",
            rf: "",
            nome: ""
          },
        ]
  
    default:
      break;
  }
}