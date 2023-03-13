export const option_status = [
  {
    value: "ACEITA",
    label: "Cronograma Ciente"
  },
  {
    value: "ACEITA",
    label: "Aprovado DINUTRE"
  },
  {
    value: "ACEITA",
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

export const remove_filtros_nulos = filtros => {
  if (filtros["data_after"] === null) {
    delete filtros["data_after"];
  }
  if (filtros["data_before"] === null) {
    delete filtros["data_before"];
  }

  return filtros;
};
