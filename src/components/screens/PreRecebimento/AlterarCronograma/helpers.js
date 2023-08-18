import moment from "moment";

export const prepararPayloadCronograma = (cronograma, values, etapas) => {
  let etapasPayload = prepararPayloadEtapas(cronograma, values, etapas);
  return {
    cronograma: cronograma.uuid,
    etapas: etapasPayload,
    justificativa: values.justificativa
  };
};

export const prepararPayloadEtapas = (cronograma, values, etapas) => {
  let etapasPayload = [];

  etapasPayload = etapas.map((etapa, index) => ({
    numero_empenho: values[`empenho_${index}`],
    etapa: values[`etapa_${index}`],
    parte: values[`parte_${index}`],
    data_programada: values[`data_programada_${index}`]
      ? moment(values[`data_programada_${index}`], "DD/MM/YYYY").format(
          "YYYY-MM-DD"
        )
      : undefined,
    quantidade: values[`quantidade_${index}`],
    total_embalagens: values[`total_embalagens_${index}`]
  }));

  return etapasPayload;
};

export const calculaRestante = (values, cronograma) => {
  let resto = cronograma.qtd_total_programada;
  cronograma.etapas.forEach(etapa => {
    if (values[`quantidade_total_${etapa.uuid}`])
      resto -= values[`quantidade_total_${etapa.uuid}`];
  });
  return resto;
};
