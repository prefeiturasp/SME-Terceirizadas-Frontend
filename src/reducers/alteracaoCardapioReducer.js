const LOAD_ALTERACAO_CARDAPIO = "LOAD_ALTERACAO_CARDAPIO";

export default function reducer(state = {}, action) {
  switch (action.type) {
    case LOAD_ALTERACAO_CARDAPIO:
      if (action.data !== null) {
        if (action.data.data_inicial === action.data.data_final) {
          action.data.alterar_dia = action.data.data_final;
          action.data.data_inicial = null;
          action.data.data_final = null;
        }
        action.data.motivo = action.data.motivo.uuid;
        action.data.substituicoes.forEach(function(substituicao) {
          action.data[`substituicoes_${substituicao.periodo_escolar.nome}`] = {
            check: true,
            tipo_alimentacao_de: substituicao.tipo_alimentacao_de.uuid,
            tipo_alimentacao_para: substituicao.tipo_alimentacao_para.uuid,
            numero_de_alunos: substituicao.qtd_alunos
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

export const loadAlteracaoCardapio = data => dispatch =>
  dispatch({ type: LOAD_ALTERACAO_CARDAPIO, data });
