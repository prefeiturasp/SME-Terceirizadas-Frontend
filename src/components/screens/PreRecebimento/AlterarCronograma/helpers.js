import moment from "moment";

export const prepararPayloadCronograma = (cronograma, values, etapas) => {
  let etapasPayload = prepararPayloadEtapas(values, etapas);
  return {
    cronograma: cronograma.uuid,
    etapas: etapasPayload,
    justificativa: values.justificativa
  };
};

export const prepararPayloadAnaliseCronograma = (
  justificativa,
  values,
  etapas,
  recebimentos
) => {
  let etapasPayload = prepararPayloadEtapas(values, etapas);
  let recebimentosPayload = prepararPayloadRecebimentos(values, recebimentos);
  return {
    programacoes_de_recebimento: recebimentosPayload,
    etapas: etapasPayload,
    justificativa_cronograma: justificativa["justificativa_cronograma"]
  };
};

export const prepararPayloadEtapas = (values, etapas) => {
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

export const prepararPayloadRecebimentos = (values, recebimentos) => {
  let recebimentosPayload = [];

  recebimentosPayload = recebimentos.map((etapa, index) => ({
    data_programada: values[`data_recebimento_${index}`],
    tipo_carga: values[`tipo_recebimento_${index}`]
  }));

  return recebimentosPayload;
};

export const calculaRestante = (values, cronograma) => {
  let resto = cronograma.qtd_total_programada;
  cronograma.etapas.forEach(etapa => {
    if (values[`quantidade_total_${etapa.uuid}`])
      resto -= values[`quantidade_total_${etapa.uuid}`];
  });
  return resto;
};
