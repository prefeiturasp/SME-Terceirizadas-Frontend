export const tipoDeStatus = (status) => {
  switch (status) {
    case "Cronograma Criado":
    case "Assinado e Enviado ao Fornecedor":
    case "Assinado Fornecedor":
    case "Assinado DINUTRE":
    case "Assinado CODAE":
    case "Em Análise":
    case "Cronograma Ciente":
    case "Aprovado DINUTRE":
    case "Aprovado DILOG":
    case "Aprovado CODAE":
    case "Alteração enviada ao fornecedor":
    case "Fornecedor Ciente":
      return "aprovado";

    case "Solicitada Alteração":
    case "Alteração CODAE":
      return "alterado";

    case "Reprovado DILOG":
    case "Reprovado DINUTRE":
    case "Reprovado CODAE":
      return "reprovado";

    default:
      return "";
  }
};

export const tipoDeStatusClasse = (status) => {
  return status.criado_em === null && status.usuario === null
    ? "pending"
    : tipoDeStatus(status.status_evento_explicacao) === "aprovado"
    ? "active"
    : tipoDeStatus(status.status_evento_explicacao) === "reprovado"
    ? "disapproved"
    : tipoDeStatus(status.status_evento_explicacao) === "alterado"
    ? "questioned"
    : tipoDeStatus(status.status_evento_explicacao) === "cancelado"
    ? "cancelled"
    : "pending";
};
