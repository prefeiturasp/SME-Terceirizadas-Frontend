import axios from "./_base";

export const cadastraLayoutEmbalagem = async (payload) =>
  await axios.post("/layouts-de-embalagem/", payload);
