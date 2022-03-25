import axios from "./_base";
import { saveAs } from "file-saver";

export const getDownloads = async params =>
  (await axios.get("/downloads/", { params })).data;

export const setDownloadMarcarDesmarcarLida = async payload =>
  await axios.put("/downloads/marcar-visto/", payload);

export const getQtdNaoVistos = async params =>
  (await axios.get("/downloads/quantidade-nao-vistos/", { params })).data;

export const deletarDownload = async uuid =>
  await axios.delete(`/downloads/${uuid}/`);

export const baixarArquivoCentral = async download => {
  const { data } = await axios.get(download.arquivo + "/", {
    responseType: "blob"
  });
  saveAs(data, download.identificador);
};
