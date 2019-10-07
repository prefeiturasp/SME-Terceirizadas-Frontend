import React from "react";
import {
  existeAlgumStatusFimDeFluxo,
  fluxoPartindoEscola,
  fluxoPartindoDRE,
  fluxoInformativoPartindoEscola,
  tipoDeStatusClasse
} from "./helper";
import "./style.scss";

export const FluxoDeStatus = props => {
  const { listaDeStatus, tipoDeFluxo } = props;
  const fluxoNaoFinalizado =
    listaDeStatus && existeAlgumStatusFimDeFluxo(listaDeStatus);
  const fluxo =
    tipoDeFluxo === "informativo"
      ? fluxoInformativoPartindoEscola
      : tipoDeFluxo === "partindoDRE"
      ? fluxoPartindoDRE
      : fluxoPartindoEscola;
  const fluxoUtilizado = fluxo.length > listaDeStatus.length ? fluxo : listaDeStatus;
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
                  {listaDeStatus[key]
                    ? listaDeStatus[key].status_evento_explicacao
                    : status.titulo}
                </li>
              );
            })}
          </ul>
          <ul className="progressbar">
            {fluxoUtilizado.map((status, key) => {
              let novoStatus = listaDeStatus[key] || status;
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
                      {novoStatus.usuario.rf !== undefined &&
                        `RF: ${novoStatus.usuario.rf} - `}
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
