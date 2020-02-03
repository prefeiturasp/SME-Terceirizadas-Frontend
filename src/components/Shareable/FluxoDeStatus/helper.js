import { deepCopy } from "../../../helpers/utilities";

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

export const fluxoDietaEspecialPartindoEscola = [
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

export const fluxoDietaEspecialComInativacao = [
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
  },
  {
    titulo: "Escola solicitou inativação",
    status: "",
    criado_em: "",
    usuario: null
  },
  {
    titulo: "CODAE",
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
    case "Escola solicitou inativação":
    case "CODAE autorizou inativação":
      return "prosseguiu";
    case "Escola cancelou":
    case "DRE cancelou":
      return "cancelado";
    case "DRE não validou":
    case "CODAE negou":
    case "CODAE negou inativação":
    case "Terceirizada recusou":
      return "reprovado";
    case "Questionamento pela CODAE":
      return "questionado";
    default:
      return "";
  }
};

export const tipoDeStatusClasse = status => {
  return tipoDeStatus(status.status_evento_explicacao) === "prosseguiu"
    ? "active"
    : tipoDeStatus(status.status_evento_explicacao) === "reprovado"
    ? "disapproved"
    : tipoDeStatus(status.status_evento_explicacao) === "questionado"
    ? "questioned"
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

export const formatarLogs = logs => {
  let novoLogs = deepCopy(logs);
  let indexLogQuestionamento = -1;
  logs.forEach((log, index) => {
    if (log.status_evento_explicacao === "Questionamento pela CODAE") {
      indexLogQuestionamento = index;
    } else if (
      log.status_evento_explicacao === "Terceirizada respondeu questionamento"
    ) {
      novoLogs.splice(index, 1);
    } else if (
      (log.status_evento_explicacao === "CODAE autorizou" ||
        log.status_evento_explicacao === "CODAE negou") &&
      indexLogQuestionamento !== -1
    ) {
      novoLogs.splice(indexLogQuestionamento, 1);
    }
  });
  return novoLogs;
};
