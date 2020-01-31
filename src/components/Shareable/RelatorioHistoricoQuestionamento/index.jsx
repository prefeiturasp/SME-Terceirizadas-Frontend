import React from "react";
import { TIPO_USUARIO } from "../../../constants";
import "./style.scss";
import { existeLogDeQuestionamentoDaCODAE } from "./helper";

export const RelatorioHistoricoQuestionamento = props => {
  const { solicitacao } = props;
  const EXIBIR_HISTORICO =
    solicitacao.foi_solicitado_fora_do_prazo &&
    existeLogDeQuestionamentoDaCODAE(solicitacao.logs);
  return (
    <div>
      {EXIBIR_HISTORICO && (
        <div className="question-history">
          <hr />
          <div className="row title">
            <div className="col-12">
              <p>Histórico de questionamento</p>
            </div>
          </div>
          {solicitacao.logs.map((log, key) => {
            return (
              [
                TIPO_USUARIO.GESTAO_ALIMENTACAO_TERCEIRIZADA,
                TIPO_USUARIO.TERCEIRIZADA
              ].includes(log.usuario.tipo_usuario) &&
              log.status_evento_explicacao !== "Terceirizada tomou ciência" && (
                <div key={key} className="question-log">
                  <div>
                    {log.criado_em} -{" "}
                    {log.usuario.tipo_usuario ===
                    TIPO_USUARIO.GESTAO_ALIMENTACAO_TERCEIRIZADA
                      ? "CODAE"
                      : "TERCEIRIZADA"}
                  </div>
                  {log.status_evento_explicacao ===
                    "Questionamento pela CODAE" && (
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
                  {log.status_evento_explicacao ===
                    "Terceirizada respondeu questionamento" && (
                    <div className="is-it-possible">
                      <div className="title">
                        {log.resposta_sim_nao ? "Aceitou" : "Não aceitou"}
                      </div>
                      <div className="obs">
                        Observação da Terceirizada:{" "}
                        {log.justificativa ||
                          "Sem observações por parte da Terceirizada"}
                      </div>
                    </div>
                  )}
                  {log.status_evento_explicacao === "CODAE autorizou" && (
                    <div className="is-it-possible">
                      <div className="title">Autorizou</div>
                      {log.justificativa && (
                        <div className="obs">
                          Observação da CODAE: {log.justificativa}
                        </div>
                      )}
                    </div>
                  )}
                  {log.status_evento_explicacao === "CODAE negou" && (
                    <div className="is-it-possible">
                      <div className="title">Negou</div>
                      {log.justificativa && (
                        <div className="obs">
                          Observação da CODAE: {log.justificativa}
                        </div>
                      )}
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
