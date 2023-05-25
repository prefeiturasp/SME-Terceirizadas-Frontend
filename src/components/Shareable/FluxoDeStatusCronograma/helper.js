export const tipoDeStatus = status => {
  switch (status) {
    case "Cronograma Criado":
    case "Assinado e Enviado ao Fornecedor":
    case "Assinado Fornecedor":
    case "Assinado Dinutre":
    case "Assinado CODAE":
      return "aprovado";

    case "Alteração Fornecedor":
      return "alterado";

    default:
      return "";
  }
};

export const tipoDeStatusClasse = status => {
  return tipoDeStatus(status.status_evento_explicacao) === "aprovado"
    ? "active"
    : tipoDeStatus(status.status_evento_explicacao) === "reprovado"
    ? "disapproved"
    : tipoDeStatus(status.status_evento_explicacao) === "alterado"
    ? "questioned"
    : tipoDeStatus(status.status_evento_explicacao) === "cancelado"
    ? "cancelled"
    : "pending";
};
