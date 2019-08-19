export const fluxoPartindoEscola = [
  {
    titulo: "Solicitação Realizada",
    status: "",
    criado_em: "",
    usuario: null
  },
  {
    titulo: "DRE aprovou",
    status: "",
    criado_em: "",
    usuario: null
  },
  {
    titulo: "CODAE aprovou",
    status: "",
    criado_em: "",
    usuario: null
  },
  {
    titulo: "Terceirizada tomou ciência",
    status: "",
    criado_em: "",
    usuario: null
  }
]

export const tipoDeStatus = status => {
  switch (status) {
    case "Solicitação Realizada":
    case "Escola revisou":
    case "DRE aprovou":
    case "DRE revisou":
    case "CODAE aprovou":
    case "Terceirizada tomou ciência":
      return "aprovado";
    case "CODAE cancelou pedido":
    case "DRE cancelou pedido":
      return "cancelado";
    default:
      return "";
  }
};
