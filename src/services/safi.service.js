import axios from "./_base";

export const getListaTermosContratoSAFI = async () =>
  await axios.get("/dados-contrato-safi/lista-termos-de-contratos/");

export const getContratoSAFI = async uuid =>
  await axios.get(`/dados-contrato-safi/${uuid}/`);
