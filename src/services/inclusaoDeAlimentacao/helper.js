import { TIPO_SOLICITACAO } from "../constants"

export const getPath = (tipoSolicitacao) => {
    switch(tipoSolicitacao) {
        case TIPO_SOLICITACAO.SOLICITACAO_NORMAL:
            return URL_INCLUSAO_NORMAL;
        case TIPO_SOLICITACAO.SOLICITACAO_CONTINUA:
            return URL_INCLUSAO_CONTINUA;
        case TIPO_SOLICITACAO.SOLICITACAO_CEI:
            return URL_INCLUSAO_CEI;
        default:
            throw new Error(`Unexpected value for param 'tipoSolicitacao': ${tipoSolicitacao}`);

    }
}

// FIXME: remove before PR
/* export const getPathForMotivo = (tipoMotivo) => {
    switch(tipoMotivo) {
        case TIPO_MOTIVO.INCLUSAO_NORMAL:
            return "motivos-inclusao-normal";
        case TIPO_MOTIVO.INCLUSAO_CONTINUA:
            return "motivos-inclusao-continua";
        case TIPO_MOTIVO.ALTERACAO_CARDAPIO:
            return "motivos-alteracao-cardapio";
        case TIPO_MOTIVO.NEGACAO:
            return "motivos-negacao";
        case TIPO_MOTIVO.SUSPENSAO_CARDAPIO:
            return "motivos-suspensao-cardapio"
        default:
            throw new Error(`Unexpected value for param 'tipoMotivo': ${tipoMotivo}`);

    }
} */