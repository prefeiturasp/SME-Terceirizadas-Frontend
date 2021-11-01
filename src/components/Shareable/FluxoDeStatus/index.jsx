import React from "react";
import {
  existeAlgumStatusFimDeFluxo,
  tipoDeStatusClasse,
  formatarLogs
} from "./helper";
import "./style.scss";
import { deepCopy } from "../../../helpers/utilities";

export const FluxoDeStatus = props => {
  const { listaDeStatus, fluxo, eh_importado = false } = props;
  let cloneListaDeStatus = deepCopy(listaDeStatus);
  cloneListaDeStatus = formatarLogs(cloneListaDeStatus);
  const fluxoNaoFinalizado =
    cloneListaDeStatus && existeAlgumStatusFimDeFluxo(cloneListaDeStatus);
  const fluxoUtilizado =
    fluxo.length > cloneListaDeStatus.length ? fluxo : cloneListaDeStatus;

  const getTitulo = log => {
    if (log) {
      if (
        log.justificativa &&
        log.justificativa === "A solicitação não foi validada em tempo hábil"
      ) {
        return log.justificativa;
      } else {
        return log.status_evento_explicacao;
      }
    }
  };
  return (
    <div className="w-100">
      <div className="row">
        <div className="col-12">
          <ul className={`progressbar-titles fluxos`}>
            {fluxoUtilizado.map((status, key) => {
              return (
                <li key={key}>
                  {cloneListaDeStatus[key]
                    ? getTitulo(cloneListaDeStatus[key])
                    : status.titulo}
                </li>
              );
            })}
          </ul>
          <ul className="progressbar">
            {fluxoUtilizado.map((status, key) => {
              let novoStatus = cloneListaDeStatus[key] || status;
              return (
                <li
                  key={key}
                  className={`${
                    tipoDeStatusClasse(novoStatus) !== "pending"
                      ? tipoDeStatusClasse(novoStatus)
                      : fluxoNaoFinalizado
                      ? "pending"
                      : ""
                  }`}
                  style={{ width: 100 / fluxoUtilizado.length + "%" }}
                >
                  {novoStatus.criado_em}
                  <br />
                  {novoStatus.usuario && (
                    <span>
                      {!eh_importado &&
                      novoStatus.usuario.registro_funcional !== undefined &&
                      cloneListaDeStatus[key].usuario.tipo_usuario ===
                        "terceirizada"
                        ? `CPF: ${novoStatus.usuario.cpf}`
                        : status.status_evento_explicacao !==
                            "Cancelamento por alteração de unidade educacional" &&
                          status.status_evento_explicacao !==
                            "Cancelamento para aluno não matriculado na rede municipal" &&
                          !eh_importado &&
                          `RF: ${novoStatus.usuario.registro_funcional}`}
                      {!eh_importado && <br />}
                      {novoStatus.usuario &&
                        (status.status_evento_explicacao !==
                          "Cancelamento por alteração de unidade educacional" &&
                          status.status_evento_explicacao !==
                            "Cancelamento para aluno não matriculado na rede municipal") &&
                        novoStatus.usuario.nome}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};
