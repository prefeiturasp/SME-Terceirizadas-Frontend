import {
  URL_KIT_LANCHES_SOLICITACOES_AVULSA,
  URL_KIT_LANCHES_SOLICITACOES_CEI,
  TIPO_SOLICITACAO
} from "services/constants";

export const getPath = tipoSolicitacao => {
  switch (tipoSolicitacao) {
    case TIPO_SOLICITACAO.SOLICITACAO_NORMAL:
      return URL_KIT_LANCHES_SOLICITACOES_AVULSA;
    case TIPO_SOLICITACAO.SOLICITACAO_CEI:
      return URL_KIT_LANCHES_SOLICITACOES_CEI;
    default:
      console.log(
        `Unexpected value for param 'tipoSolicitacao': ${tipoSolicitacao}`
      );
      return "tipo----solicitacao----invalido";
  }
};
