import React from "react";
import { NavLink } from "react-router-dom";
import "./style.scss";

export const CardStatusDeSolicitacaoLargo = props => {
  const { titulo, tipo, solicitacoes, icone } = props;
  return (
    <div className={`card card-panel ${tipo} mb-4 mr-4`}>
      <div className="card-title-status">
        <i className={"fas " + icone} />
        {titulo}
      </div>
      <hr />
      <div className="card-body card-body-sme overflow-auto">
        {solicitacoes.map((solicitacao, key) => {
          return (
            <NavLink key={key} to={solicitacao.link}>
              <p className="data">
                {solicitacao.text}
                <span className="mr-3 float-right">{solicitacao.date}</span>
              </p>
            </NavLink>
          );
        })}
      </div>
      <div className="pb-3" />
    </div>
  );
};
