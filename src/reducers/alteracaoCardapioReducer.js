import { extrairTiposALimentacao } from "components/InclusaoDeAlimentacao/helper";

const LOAD_ALTERACAO_TIPO_ALIMENTACAO = "LOAD_ALTERACAO_TIPO_ALIMENTACAO";
const LOAD_ALTERACAO_TIPO_ALIMENTACAO_CEI =
  "LOAD_ALTERACAO_TIPO_ALIMENTACAO_CEI";

export default function reducer(state = {}, action) {
  switch (action.type) {
    case LOAD_ALTERACAO_TIPO_ALIMENTACAO:
      if (action.data !== null) {
        const motivoNome = action.data.motivo.nome;
        if (
          action.data.data_inicial === action.data.data_final &&
          action.data.data_inicial !== null &&
          action.data.data_final !== null
        ) {
          action.data.alterar_dia = action.data.data_final;
          action.data.data_inicial = null;
          action.data.data_final = null;
          action.data.motivo = action.data.motivo.uuid;
        } else if (typeof action.data.motivo === "object") {
          action.data.motivo = action.data.motivo.uuid;
        }
        action.data.substituicoes.forEach(function (substituicao) {
          action.data[`substituicoes_${substituicao.periodo_escolar.nome}`] = {
            check: true,
            tipos_alimentacao_de: extrairTiposALimentacao(
              substituicao.tipos_alimentacao_de
            ),
            tipos_alimentacao_para: motivoNome.includes("RPL")
              ? substituicao.tipos_alimentacao_para[0].uuid
              : extrairTiposALimentacao(substituicao.tipos_alimentacao_para),
            numero_de_alunos: substituicao.qtd_alunos,
          };
        });
      }
      return {
        data: {
          ...action.data,
        },
      };
    case LOAD_ALTERACAO_TIPO_ALIMENTACAO_CEI:
      if (action.data !== null) {
        const { uuid, observacao, motivo, data, substituicoes } = action.data;
        const dadosRetornados = {
          uuid,
          motivo: motivo.uuid,
          observacao,
          data_alteracao: data,
        };
        substituicoes.forEach(function (substituicao) {
          const {
            periodo_escolar,
            tipos_alimentacao_de,
            tipo_alimentacao_para,
            faixas_etarias,
          } = substituicao;
          const dadosSubstituicao = {
            periodo: periodo_escolar.uuid,
            check: true,
            tipo_alimentacao_para: tipo_alimentacao_para.uuid,
            tipos_alimentacao_de: tipos_alimentacao_de.map(
              (tipo_alimentacao_de) => {
                return tipo_alimentacao_de.uuid;
              }
            ),
            faixas_etarias: {},
          };
          faixas_etarias.forEach((faixaEtaria) => {
            dadosSubstituicao[`qtde-faixa-${faixaEtaria.faixa_etaria.uuid}`] =
              faixaEtaria.quantidade;
            dadosSubstituicao.faixas_etarias[faixaEtaria.faixa_etaria.uuid] =
              faixaEtaria.quantidade;
          });
          dadosRetornados[
            `substituicoes_${substituicao.periodo_escolar.nome}`
          ] = dadosSubstituicao;
        });
        return {
          data: dadosRetornados,
        };
      }
      return {
        data: {
          ...action.data,
        },
      };
    default:
      return state;
  }
}

export const loadAlteracaoCardapio = (data) => (dispatch) =>
  dispatch({ type: LOAD_ALTERACAO_TIPO_ALIMENTACAO, data });

export const loadAlteracaoCardapioCei = (data) => (dispatch) =>
  dispatch({ type: LOAD_ALTERACAO_TIPO_ALIMENTACAO_CEI, data });
