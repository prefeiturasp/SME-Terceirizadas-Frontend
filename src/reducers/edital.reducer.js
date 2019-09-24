const LOAD_EDITAL = "LOAD_EDITAL";

export default function reducer(state = {}, action) {
  switch (action.type) {
    case LOAD_EDITAL:
      if (action.data) {
        action.data.edital_numero = action.data.numero;
        action.data.processo_administrativo = action.data.processo;
        action.data.resumo_objeto = action.data.objeto;

        action.data.contratos.forEach((contrato, indiceContrato) => {
          let secaoContrato = {
            [`processo_administrativo${indiceContrato}`]: contrato.processo,
            [`data_proposta${indiceContrato}`]: contrato.data_proposta,
            [`numero_contrato${indiceContrato}`]: contrato.numero
          };
          contrato.vigencias.forEach((vigencia, indiceVigencia) => {
            secaoContrato[`secaoContrato${indiceVigencia}`] = {
              [`data_inicial${indiceVigencia}`]: vigencia.data_inicial,
              [`data_final${indiceVigencia}`]: vigencia.data_final
            };
          });
          action.data[`secaoEdital${indiceContrato}`] = secaoContrato;
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

export const loadEdital = data => dispatch =>
  dispatch({ type: LOAD_EDITAL, data });
