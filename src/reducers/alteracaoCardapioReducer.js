import { extrairTiposALimentacao, formatarDiasSemana } from "../components/InclusaoDeAlimentacao/helper";

const LOAD_ALTERACAO_CARDAPIO = "LOAD_ALTERACAO_CARDAPIO";

export default function reducer(state = {}, action) {
  switch (action.type) {
    case LOAD_ALTERACAO_CARDAPIO:
      if (action.data != null) {

        if (action.data.data_inicial === action.data.data_final) {
          action.data.alterar_dia = action.data.data_inicial
        }
        action.data.motivo = action.data.motivo.uuid
        action.data.substituicoes.forEach(function(substituicao) {
          console.log("Substituicao: ", substituicao)
          action.data[
            `substituicoes_${substituicao.periodo_escolar.nome}`
          ] = {
            check: true,
            tipo_de_refeicao: extrairTiposALimentacao(
              substituicao.tipos_alimentacao
            ),
            numero_de_alunos: substituicao.qtd_alunos,
            tipos_selecionados: substituicao.tipos_alimentacao,
          };
        });


        // action.data.dias_razoes.forEach(function(dia_razao) {
        //   action.data[`dias_razoes_${dia_razao.id}`] = dia_razao;
        // })
        // action.data.substituicoes.forEach(function(substituicao) {
        //   action.data[`substituicoes_${substituicao.periodo}`] = substituicao;
        //   action.data[`substituicoes_${substituicao.periodo}`]['check'] = true;
        // })

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
