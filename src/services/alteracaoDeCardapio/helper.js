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

export const getAlteracaoNome = (tipoSolicitacao, escola) => {
  const escolaLowerCase = escola.toLowerCase().replace(/\s/g, "_");
  switch (tipoSolicitacao) {
    case TIPO_SOLICITACAO.SOLICITACAO_NORMAL:
      return "alteracao_" + escolaLowerCase;
    case TIPO_SOLICITACAO.SOLICITACAO_CONTINUA:
      return "alteracao_continua_" + escolaLowerCase;
    case TIPO_SOLICITACAO.SOLICITACAO_CEI:
      return "alteracao_cei_" + escolaLowerCase;
    case TIPO_SOLICITACAO.SOLICITACAO_CEMEI:
      return "alteracao_cemei_" + escolaLowerCase;
    default:
      return "alteracao_do_tipo_de_alimentacao";
  }
};
