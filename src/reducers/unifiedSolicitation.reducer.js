import {
  extrairKitsLanche,
  extrairTempoPasseio
} from "../components/SolicitacaoUnificada/helper";

const LOAD_UNIFIED_SOLICITATION = "LOAD_UNIFIED_SOLICITATION";

export default function reducer(state = {}, action) {
  switch (action.type) {
    case LOAD_UNIFIED_SOLICITATION:
      //Aplica o que vem do Backend no formulário do Frontend de Solicitação Unificada
      //TODO: ver um jeito de não precisar converter tantos dados
      if (action.data != null) {
        action.data.data = action.data.solicitacao_kit_lanche.data;
        action.data.descricao = action.data.solicitacao_kit_lanche.descricao;
        if (action.data.lista_kit_lanche_igual) {
          action.data.kit_lanche = extrairKitsLanche(
            action.data.solicitacao_kit_lanche.kits
          );
          action.data.tempo_passeio = action.data.solicitacao_kit_lanche.tempo_passeio.toString();
        }
        action.data.escolas_quantidades.forEach(function(escola_quantidade) {
          action.data[`school_${escola_quantidade.escola.codigo_eol}`] = {
            check: true,
            codigo_eol: escola_quantidade.escola.codigo_eol,
            quantidade_alunos:
              action.data.lista_kit_lanche_igual &&
              escola_quantidade.quantidade_alunos,
            nro_alunos:
              !action.data.lista_kit_lanche_igual &&
              escola_quantidade.quantidade_alunos,
            kit_lanche: !action.data.lista_kit_lanche_igual
              ? extrairKitsLanche(escola_quantidade.kits)
              : [],
            tempo_passeio: !action.data.lista_kit_lanche_igual
              ? extrairTempoPasseio(escola_quantidade.tempo_passeio)
              : null
          };
        });
      }
      return {
        data: {
          ...action.data
        }
      };
    default:
      return state;
  }
}

export const loadUnifiedSolicitation = data => dispatch =>
  dispatch({ type: LOAD_UNIFIED_SOLICITATION, data });
