import React from "react";
import { fluxoPartindoEscola } from "./helper";
import "./style.scss";

export const FluxoDeStatus = props => {
  const { listaDeStatus } = props;
  return (
    <div className="w-100">
      <div className="row">
        <div className="progressbar-main-title col-2 my-auto">
          Status de Solicitação:
        </div>
        <div className="col-10">
          <ul className="progressbar-titles">
            {fluxoPartindoEscola.map((status, key) => {
              return <li key={key}>{status.titulo}</li>;
            })}
          </ul>
          <ul className="progressbar">
            {fluxoPartindoEscola.map((status, key) => {
              let novoStatus = listaDeStatus[key] || status;
              return (
                <li
                  key={key}
                  className={
                    novoStatus.status === "aprovado" ? "active"
                      : novoStatus.status ===
                        "reprovado"
                      ? "disapproved"
                      : novoStatus.status ===
                        "cancelado"
                      ? "cancelled"
                      : ""
                  }
                  style={{ width: 100 / fluxoPartindoEscola.length + "%" }}
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
