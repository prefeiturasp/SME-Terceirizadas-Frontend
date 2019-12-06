import React from "react";
import "./style.scss";
import { TIPO_USUARIO } from "../../../constants";

export const RelatorioHistoricoQuestionamento = props => {
  const { solicitacao } = props;
  return (
    <div>
      {solicitacao.foi_solicitado_fora_do_prazo && solicitacao.logs.length > 2 && (
        <div className="question-history">
          <hr />
          <div className="row title">
            <div className="col-12">
              <p>Histórico de questionamento</p>
            </div>
          </div>
          {solicitacao.logs.map((log, key) => {
            return (
              log.usuario.tipo_usuario ===
                TIPO_USUARIO.GESTAO_ALIMENTACAO_TERCEIRIZADA && (
                <div key={key} className="question-log">
                  <div>
                    {log.criado_em} -{" "}
                    {log.usuario.tipo_usuario ===
                    TIPO_USUARIO.GESTAO_ALIMENTACAO_TERCEIRIZADA
                      ? "CODAE"
                      : "TERCEIRIZADA"}
                  </div>
                  {key === 2 && (
                    <div className="is-it-possible">
                      <div className="title">
                        É possível atender a solicitação com todos os itens
                        previstos no contrato?
                      </div>
                      <div className="obs">
                        Observação da CODAE:{" "}
                        {log.justificativa ||
                          "Sem observações por parte da CODAE"}
                      </div>
                    </div>
                  )}
                </div>
              )
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RelatorioHistoricoQuestionamento;
