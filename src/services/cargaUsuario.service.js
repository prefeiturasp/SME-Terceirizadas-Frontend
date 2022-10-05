import axios from "./_base";
import { saveAs } from "file-saver";

export const baixarExcelModeloServidor = async () => {
  const url = `/planilha-coresso-servidor/download-planilha-servidor/`;
  const { data } = await axios.get(url, { responseType: "blob" });
  saveAs(data, "planilha_carga_usuario_servidor.xlsx");
};

export const baixarExcelModeloNaoServidor = async () => {
  const url = `/planilha-coresso-externo/download-planilha-nao-servidor/`;
  const { data } = await axios.get(url, { responseType: "blob" });
  saveAs(data, "planilha_carga_usuario_nao_servidor.xlsx");
};

export const getPlanilhasServidor = async params =>
  (await axios.get("/planilha-coresso-servidor/", { params })).data;

export const getPlanilhasNaoServidor = async params =>
  (await axios.get("/planilha-coresso-externo/", { params })).data;
