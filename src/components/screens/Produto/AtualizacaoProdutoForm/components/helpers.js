import axios from "axios";
import process from "process";

export const httpTohttps = url => {
  if (url.startsWith("http://")) {
    return url.replace(/^http:\/\//, "https://");
  }
  return url;
};

export const obtemBase64DaUrl = async url => {
  const realUrl =
    !process.env.NODE_ENV || process.env.NODE_ENV === "development"
      ? url
      : httpTohttps(url);
  const resposta = await axios.get(realUrl, {
    responseType: "arraybuffer"
  });
  // eslint-disable-next-line no-undef
  const base64 = Buffer.from(resposta.data, "binary").toString("base64");
  return `data:${resposta.headers["content-type"]};base64,${base64}`;
};
