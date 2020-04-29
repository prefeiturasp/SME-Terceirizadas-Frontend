import {
    URL_KIT_LANCHES_SOLICITACOES_AVULSA,
    URL_KIT_LANCHES_SOLICITACOES_CEI
  } from "services/constants";
  
  export const getPath = isCei => {
    //eslint-disable-next-line
    if (process.env.NODE_ENV === "development") {
      if (typeof isCei !== "boolean") throw new Error("Argument missing");
    }
    return isCei ? URL_KIT_LANCHES_SOLICITACOES_CEI : URL_KIT_LANCHES_SOLICITACOES_AVULSA;
  };
  