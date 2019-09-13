export const fluxoPartindoEscola = [
  {
    titulo: "Solicitação Realizada",
    status: "",
    criado_em: "",
    usuario: null
  },
  {
    titulo: "DRE validou",
    status: "",
    criado_em: "",
    usuario: null
  },
  {
    titulo: "CODAE autorizou",
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
];

export const fluxoPartindoDRE = [
  {
    titulo: "Solicitação Realizada",
    status: "",
    criado_em: "",
    usuario: null
  },
  {
    titulo: "CODAE autorizou",
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
];

export const fluxoInformativoPartindoEscola = [
  {
    titulo: "Solicitação Realizada",
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
];

export const tipoDeStatus = status => {
  switch (status) {
    case "Solicitação Realizada":
    case "Escola revisou":
    case "DRE aprovou":
    case "DRE revisou":
    case "CODAE autorizou":
    case "Terceirizada tomou ciência":
      return "aprovado";
    case "Escola cancelou":
    case "CODAE cancelou pedido":
    case "DRE cancelou pedido":
      return "cancelado";
    case "DRE reprovou":
    case "CODAE reprovou":
      return "reprovado";
    default:
      return "";
  }
};

export const tipoDeStatusClasse = status => {
  return tipoDeStatus(status.status_evento_explicacao) === "aprovado"
    ? "active"
    : tipoDeStatus(status.status_evento_explicacao) === "reprovado"
    ? "disapproved"
    : tipoDeStatus(status.status_evento_explicacao) === "cancelado"
    ? "cancelled"
    : "pending";
};

export const existeAlgumStatusFimDeFluxo = logs => {
  return (
    logs.findIndex(
      log =>
        log.status_evento_explicacao.includes("reprov") ||
        log.status_evento_explicacao.includes("cancel")
    ) === -1
  );
};
