import moment from "moment";

export const prepararPayloadCronograma = (cronograma, values) => {
  let etapas = prepararPayloadEtapas(cronograma, values);
  return {
    cronograma: cronograma.uuid,
    motivo: values.motivos,
    etapas: etapas,
    justificativa: values.justificativa
  };
};

export const prepararPayloadEtapas = (cronograma, values) => {
  let etapas = [];
  if (!values.motivos) {
    return;
  }
  if (!values.motivos.includes("outros")) {
    etapas = cronograma.etapas.map(etapa => {
      let etapas_payload = {
        uuid: etapa.uuid
      };
      if (
        values.motivos.includes("ALTERAR_DATA_ENTREGA") &&
        values[`data_programada_${etapa.uuid}`]
      ) {
        etapas_payload["nova_data_programada"] = moment(
          values[`data_programada_${etapa.uuid}`]
        ).format("YYYY-MM-DD");
      }
      if (
        values.motivos.includes("ALTERAR_QTD_ALIMENTO") &&
        values[`quantidade_total_${etapa.uuid}`]
      ) {
        etapas_payload["nova_quantidade"] =
          values[`quantidade_total_${etapa.uuid}`];
      }
      return etapas_payload;
    });
    return etapas;
  }
};

export const calculaRestante = (values, cronograma) => {
  let resto = cronograma.qtd_total_programada;
  cronograma.etapas.forEach(etapa => {
    if (values[`quantidade_total_${etapa.uuid}`])
      resto = resto - values[`quantidade_total_${etapa.uuid}`];
  });
  return resto;
};
