import React from "react";
import "./style.scss";

export const CardStatusDeSolicitacaoLargo = props => {
  const { titulo, tipo, solicitacoes, icone } = props;
  return (
    <div className={`card card-panel ${tipo} mb-4`}>
      <div className="card-title-status">
        <i className={"fas " + icone} />
        {titulo}
      </div>
      <hr />
      <div className="card-body card-body-sme overflow-auto">
        {solicitacoes.map((value) => {
          return (
            <p className="data">
              {value.text}
              <span className="mr-3 float-right">{value.date}</span>
            </p>
          );
        })}
      </div>
      <div className="pb-3"></div>
    </div>
  );
};
