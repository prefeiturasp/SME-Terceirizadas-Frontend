import React from "react";
import { useHistory } from "react-router-dom";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE
} from "components/Shareable/Botao/constants";
export default ({ protocoloPadrao, idx, selecionado }) => {
  const history = useHistory();

  return (
    <>
      <tr className={selecionado === idx ? "" : "d-none"}>
        <td colSpan="2">
          <Botao
            texto="Histórico"
            type={BUTTON_TYPE.BUTTON}
            style={BUTTON_STYLE.GREEN_OUTLINE}
            className="float-right mt-3 mb-3 ml-3"
            onClick={() => {}}
          />
        </td>
      </tr>
      <tr className={selecionado === idx ? "" : "d-none"}>
        <td colSpan="2">
          <p className="data-title">Orientações Gerais</p>
          <div
            dangerouslySetInnerHTML={{
              __html: protocoloPadrao.orientacoes_gerais
            }}
          />
        </td>
      </tr>
      <tr className={selecionado === idx ? "" : "d-none"}>
        <td colSpan="2">
          <p className="data-title">Lista de Substituições</p>
          <table className="table table-bordered table-alimentacao">
            <thead>
              <tr className="table-head-alimentacao">
                <th>Alimento</th>
                <th>Tipo</th>
                <th>Isenções/Substituições</th>
              </tr>
            </thead>
            <tbody>
              {protocoloPadrao.substituicoes.map(
                (substituicao, idxSubstituição) => {
                  return (
                    <tr
                      key={idxSubstituição}
                      className="table-body-alimentacao"
                    >
                      <td>{substituicao.alimento.nome}</td>
                      <td>{substituicao.tipo}</td>
                      <td>
                        <ul>
                          {substituicao.alimentos_substitutos.map(
                            (alimento, idxAlimento) => {
                              return <li key={idxAlimento}>{alimento.nome}</li>;
                            }
                          )}
                          {substituicao.substitutos.map(
                            (alimento, idxAlimento) => {
                              return <li key={idxAlimento}>{alimento.nome}</li>;
                            }
                          )}
                        </ul>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
          <Botao
            texto="Editar"
            type={BUTTON_TYPE.BUTTON}
            style={BUTTON_STYLE.GREEN}
            className="float-right mt-3 mb-3 ml-3"
            onClick={() => {
              history.push(
                `/dieta-especial/protocolo-padrao/${
                  protocoloPadrao.uuid
                }/editar`
              );
            }}
          />
        </td>
      </tr>
    </>
  );
};
