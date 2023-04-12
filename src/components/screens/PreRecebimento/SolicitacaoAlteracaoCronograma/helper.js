export const option_status = [
  {
    value: "CRONOGRAMA_CIENTE",
    label: "Cronograma Ciente"
  },
  {
    value: "CRONOGRAMA_CIENTE",
    label: "Aprovado DINUTRE"
  },
  {
    value: "CRONOGRAMA_CIENTE",
    label: "Aprovado CODAE"
  },
  {
    value: "EM_ANALISE",
    label: "Em Análise"
  },
  {
    value: "NEGADA",
    label: "Negado DINUTRE"
  },
  {
    value: "NEGADA",
    label: "Negado CODAE"
  }
];

export const option_status_fornecedor = [
  {
    value: [
      "EM_ANALISE",
      "CRONOGRAMA_CIENTE",
      "APROVADO_DINUTRE",
      "REPROVADO_DINUTRE"
    ],
    label: "Em Análise"
  }
];

export const deParaStatus = status =>
  ["Cronograma ciente", "Aprovado DINUTRE", "Reprovado DINUTRE"].includes(
    status
  )
    ? "Em análise"
    : status;

export const remove_filtros_nulos = filtros => {
  if (filtros["data_after"] === null) {
    delete filtros["data_after"];
  }
  if (filtros["data_before"] === null) {
    delete filtros["data_before"];
  }

  return filtros;
};
