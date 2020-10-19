import axios from "./_base";

export const registraLancamentoDiario = async payload =>
  await axios.post("/lancamento-diario/", payload);

export const getLancamentosPorMes = async payload =>
  await axios.get("/lancamento-diario/por-mes/", { params: payload });
