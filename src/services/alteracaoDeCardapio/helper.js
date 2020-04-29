import {
  API_ALTERACOES_CARDAPIO,
  API_ALTERACOES_CARDAPIO_CEI
} from "services/constants";

export const getPath = isCei => {
  //eslint-disable-next-line
  if (process.env.NODE_ENV === "development") {
    if (typeof isCei !== "boolean") throw new Error("Argument missing");
  }
  return isCei ? API_ALTERACOES_CARDAPIO : API_ALTERACOES_CARDAPIO_CEI;
};
