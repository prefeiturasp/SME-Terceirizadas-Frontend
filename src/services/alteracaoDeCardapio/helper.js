import {
  API_ALTERACOES_CARDAPIO,
  API_ALTERACOES_CARDAPIO_CEI,
  API_ALTERACOES_CARDAPIO_CEMEI,
  TIPO_SOLICITACAO,
} from "services/constants";

export const getPath = (tipoSolicitacao) => {
  switch (tipoSolicitacao) {
    case TIPO_SOLICITACAO.SOLICITACAO_NORMAL:
      return API_ALTERACOES_CARDAPIO;
    case TIPO_SOLICITACAO.SOLICITACAO_CEI:
      return API_ALTERACOES_CARDAPIO_CEI;
    case TIPO_SOLICITACAO.SOLICITACAO_CONTINUA:
      return API_ALTERACOES_CARDAPIO;
    case TIPO_SOLICITACAO.SOLICITACAO_CEMEI:
      return API_ALTERACOES_CARDAPIO_CEMEI;
    default:
      console.error(
        `Unexpected value for param 'tipoSolicitacao': ${tipoSolicitacao}`
      );
      return "tipo----solicitacao----invalido";
  }
};
