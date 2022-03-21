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
  let fluxoUtilizado =
    fluxo.length > cloneListaDeStatus.length ? fluxo : cloneListaDeStatus;
  let ultimoStatus = cloneListaDeStatus.slice(-1)[0];
  let temStatusDeAnaliseSensorialCancelada = false;

  if (
    cloneListaDeStatus.length > fluxo.length &&
    ultimoStatus.status_evento_explicacao === "Solicitação Realizada"
  ) {
    fluxoUtilizado.push({
      status_evento_explicacao: "CODAE",
      status: "",
      criado_em: "",
      usuario: null
    });
    temStatusDeAnaliseSensorialCancelada = true;
  }

  const fluxoUtilizadoEFormatado = fluxoUtilizado.map(log => {
    let logFormatado = log;
    if (log.status_evento_explicacao === "Escola solicitou inativação") {
      logFormatado = "Escola solicitou cancelamento";
    }
    if (log.status_evento_explicacao === "Escola cancelou") {
      logFormatado = "CODAE autorizou cancelamento";
    }
    return logFormatado;
  });

  const getTitulo = log => {
    if (log) {
      if (
        log.justificativa &&
        log.justificativa === "A solicitação não foi validada em tempo hábil"
      ) {
        return log.justificativa;
      } else {
        if (log.status_evento_explicacao === "Escola solicitou inativação") {
          return "Escola solicitou cancelamento";
        }
        if (log.status_evento_explicacao === "Escola cancelou") {
          return "CODAE autorizou cancelamento";
        }
        return log.status_evento_explicacao;
      }
    }
  };

  return (
    <div className="w-100">
      <div className="row">
        <div className="col-12">
          <ul className={`progressbar-titles fluxos`}>
            {fluxoUtilizadoEFormatado.map((status, key) => {
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
            {fluxoUtilizadoEFormatado.map((status, key) => {
              let novoStatus = cloneListaDeStatus[key] || status;
              return (
                <li
                  key={key}
                  className={`${
                    tipoDeStatusClasse(novoStatus) !== "pending"
                      ? tipoDeStatusClasse(novoStatus)
                      : fluxoNaoFinalizado ||
                        temStatusDeAnaliseSensorialCancelada
                      ? "pending"
                      : ""
                  }`}
                  style={{ width: 100 / fluxoUtilizadoEFormatado.length + "%" }}
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
