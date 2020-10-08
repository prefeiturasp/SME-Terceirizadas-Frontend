import axios from "./_base";

export const registraLancamentoDiario = async payload =>
  await axios.post(`/lancamento-diario/`, payload);
