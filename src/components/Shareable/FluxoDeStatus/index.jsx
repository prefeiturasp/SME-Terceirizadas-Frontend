import React from "react";
import {
  existeAlgumStatusFimDeFluxo,
  tipoDeStatusClasse,
  formatarLogs
} from "./helper";
import "./style.scss";
import { deepCopy } from "../../../helpers/utilities";

export const FluxoDeStatus = props => {
  const { listaDeStatus, fluxo } = props;
  let cloneListaDeStatus = deepCopy(listaDeStatus);
  cloneListaDeStatus = formatarLogs(cloneListaDeStatus);
  const fluxoNaoFinalizado =
    cloneListaDeStatus && existeAlgumStatusFimDeFluxo(cloneListaDeStatus);
  const fluxoUtilizado =
    fluxo.length > cloneListaDeStatus.length ? fluxo : cloneListaDeStatus;
  return (
    <div className="w-100">
      <div className="row">
        <div className="progressbar-main-title col-2 my-auto">
          Status de Solicitação:
        </div>
        <div className="col-10">
          <ul className={`progressbar-titles fluxos`}>
            {fluxoUtilizado.map((status, key) => {
              return (
                <li key={key}>
                  {cloneListaDeStatus[key]
                    ? cloneListaDeStatus[key].status_evento_explicacao
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
                      {novoStatus.usuario.registro_funcional !== undefined &&
                        `RF: ${novoStatus.usuario.registro_funcional}`}
                      <br />
                      {novoStatus.usuario && novoStatus.usuario.nome}
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
