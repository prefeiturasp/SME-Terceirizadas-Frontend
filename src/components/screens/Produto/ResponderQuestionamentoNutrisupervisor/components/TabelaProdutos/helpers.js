import {
  parseDataHoraBrToMoment,
  comparaObjetosMoment
} from "helpers/utilities";

export const ordenaPorCriadoEm = (a, b) => {
  const data_a = parseDataHoraBrToMoment(a.criado_em);
  const data_b = parseDataHoraBrToMoment(b.criado_em);
  return comparaObjetosMoment(data_a, data_b);
};
