import axios from "./_base";

export const getVinculosAtivos = async params =>
  (await axios.get("/vinculos/vinculos-ativos/", { params })).data;
