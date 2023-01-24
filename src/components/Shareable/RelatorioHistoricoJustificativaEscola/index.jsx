import React from "react";
import { TIPO_USUARIO } from "../../../constants/shared";
import "./style.scss";
import { existeLogDeCancelamentoDaEscola } from "./helper";
import { ESCOLA } from "configs/constants";

export const RelatorioHistoricoJustificativaEscola = props => {
  const { solicitacao, visao, nomeEscola } = props;
  const EXIBIR_HISTORICO = existeLogDeCancelamentoDaEscola(solicitacao);
  let EXIBIR_HISTORICO_CANCELAMENTO_ESCOLA;
  let escolaQuantidade;

  if (solicitacao && visao === ESCOLA) {
    escolaQuantidade = solicitacao.escolas_quantidades.filter(
      eq => `"${eq.escola.nome}"` === nomeEscola
    )[0];
    EXIBIR_HISTORICO_CANCELAMENTO_ESCOLA = escolaQuantidade.cancelado;
  }

  return (
    <div>
      {EXIBIR_HISTORICO_CANCELAMENTO_ESCOLA ? (
        <div className="question-history">
          <hr />
          <div className="row title">
            <div className="col-12">
              <p>Histórico de justificativas</p>
            </div>
          </div>
          {
            <div className="question-log">
              <div>
                {escolaQuantidade.cancelado_em_com_hora} - UNIDADE CANCELOU -{" "}
                USUÁRIO {escolaQuantidade.cancelado_por.nome}
                <div className="is-it-possible">
                  {escolaQuantidade.cancelado_justificativa && (
                    <div className="obs">
                      Observação do Cancelamento:{" "}
                      {escolaQuantidade.cancelado_justificativa}
                    </div>
                  )}
                </div>
              </div>
            </div>
          }
        </div>
      ) : (
        EXIBIR_HISTORICO && (
          <div className="question-history">
            <hr />
            <div className="row title">
              <div className="col-12">
                <p>Histórico de justificativas</p>
              </div>
            </div>
            {solicitacao.logs.map((log, key) => {
              return log.status_evento_explicacao === "Escola cancelou" ? (
                <div key={key} className="question-log">
                  <div>
                    {log.criado_em} -{" "}
                    {log.usuario.tipo_usuario === TIPO_USUARIO.ESCOLA
                      ? "ESCOLA CANCELOU"
                      : "DRE CANCELOU"}
                    <div className="is-it-possible">
                      {log.justificativa && (
                        <div className="obs">
                          Observação do Cancelamento: {log.justificativa}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                log.status_evento_explicacao === "DRE cancelou" && (
                  <div key={key} className="question-log">
                    <div>
                      {log.criado_em} -{" "}
                      {log.usuario.tipo_usuario === TIPO_USUARIO.ESCOLA
                        ? "ESCOLA"
                        : "DRE"}
                      <div className="is-it-possible">
                        <div className="title">Cancelou</div>
                        {log.justificativa && (
                          <div className="obs">
                            Observação do Cancelamento: {log.justificativa}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              );
            })}
          </div>
        )
      )}
    </div>
  );
};

export default RelatorioHistoricoJustificativaEscola;
