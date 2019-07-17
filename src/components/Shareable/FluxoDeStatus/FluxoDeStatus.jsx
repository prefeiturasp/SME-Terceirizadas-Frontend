import React from "react";
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
            {listaDeStatus.map((status, key) => {
              return <li key={key}>{status.titulo}</li>;
            })}
          </ul>
          <ul className="progressbar">
            {listaDeStatus.map((status, key) => {
              return (
                <li
                  key={key}
                  className={
                    status.status === "aprovado"
                      ? "active"
                      : status.status === "reprovado"
                      ? "disapproved"
                      : status.status === "cancelado"
                      ? "cancelled"
                      : ""
                  }
                  style={{ width: 100 / listaDeStatus.length + "%" }}
                >
                  {status.timestamp}
                  <br />
                  {status.status && (
                    <span>
                      RF: {status.rf} - {status.nome}
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
