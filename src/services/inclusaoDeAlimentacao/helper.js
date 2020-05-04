import {
  TIPO_SOLICITACAO,
  URL_INCLUSAO_NORMAL,
  URL_INCLUSAO_CONTINUA,
  URL_INCLUSAO_CEI
} from "../constants";

export const getPath = tipoSolicitacao => {
  switch (tipoSolicitacao) {
    case TIPO_SOLICITACAO.SOLICITACAO_NORMAL:
      return URL_INCLUSAO_NORMAL;
    case TIPO_SOLICITACAO.SOLICITACAO_CONTINUA:
      return URL_INCLUSAO_CONTINUA;
    case TIPO_SOLICITACAO.SOLICITACAO_CEI:
      return URL_INCLUSAO_CEI;
    default:
      //throw new Error(
      console.error(
        `Unexpected value for param 'tipoSolicitacao': ${tipoSolicitacao}`
      );
  }
};
