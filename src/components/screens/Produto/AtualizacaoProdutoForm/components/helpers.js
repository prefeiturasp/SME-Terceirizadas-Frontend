import axios from "axios";

export const obtemBase64DaUrl = async url => {
  const resposta = await axios.get(url, {
    responseType: "arraybuffer"
  });
  // eslint-disable-next-line no-undef
  const base64 = Buffer.from(resposta.data, "binary").toString("base64");
  return `data:${resposta.headers["content-type"]};base64,${base64}`;
};
