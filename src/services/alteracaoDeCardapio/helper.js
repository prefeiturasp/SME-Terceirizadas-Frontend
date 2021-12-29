import {
  API_ALTERACOES_CARDAPIO,
  API_ALTERACOES_CARDAPIO_CEI,
  TIPO_SOLICITACAO
} from "services/constants";

export const getPath = tipoSolicitacao => {
  switch (tipoSolicitacao) {
    case TIPO_SOLICITACAO.SOLICITACAO_NORMAL:
      return API_ALTERACOES_CARDAPIO;
    case TIPO_SOLICITACAO.SOLICITACAO_CEI:
      return API_ALTERACOES_CARDAPIO_CEI;
    case TIPO_SOLICITACAO.SOLICITACAO_CONTINUA:
      return API_ALTERACOES_CARDAPIO;
    default:
      console.error(
        `Unexpected value for param 'tipoSolicitacao': ${tipoSolicitacao}`
      );
      return "tipo----solicitacao----invalido";
  }
};
