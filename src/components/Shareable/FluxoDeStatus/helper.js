export const fluxoPartindoEscola = [
  {
    titulo: "Solicitação Realizada",
    status: "",
    criado_em: "",
    usuario: null
  },
  {
    titulo: "DRE",
    status: "",
    criado_em: "",
    usuario: null
  },
  {
    titulo: "CODAE",
    status: "",
    criado_em: "",
    usuario: null
  },
  {
    titulo: "Terceirizada",
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
    titulo: "CODAE",
    status: "",
    criado_em: "",
    usuario: null
  },
  {
    titulo: "Terceirizada",
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
    titulo: "Terceirizada",
    status: "",
    criado_em: "",
    usuario: null
  }
];

export const tipoDeStatus = status => {
  switch (status) {
    case "Solicitação Realizada":
    case "Escola revisou":
    case "DRE validou":
    case "DRE revisou":
    case "CODAE autorizou":
    case "Terceirizada tomou ciência":
      return "aprovado";
    case "Escola cancelou":
    case "DRE cancelou":
      return "cancelado";
    case "DRE não validou":
    case "CODAE negou":
    case "Terceirizada recusou":
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
        log.status_evento_explicacao.includes("neg") ||
        log.status_evento_explicacao.includes("não") ||
        log.status_evento_explicacao.includes("cancel")
    ) === -1
  );
};
