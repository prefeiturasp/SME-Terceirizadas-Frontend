import React from "react";
import PropTypes from "prop-types";
import "./custom.css";
import { prototype } from "module";

export const CardDashboard = props => {
  const { titulo, tipo, solicitacoes, icone } = props;
  return (
    <div className={"card card-panel " + tipo}>
      <div className="card-title-status">
        <i className={"fas " + icone} />
        {titulo}
      </div>
      <hr />
      {solicitacoes.map((value) => {
        return (
          <p className="data">
            {value.text}
            <span className="float-right">{value.date}</span>
          </p>
        );
      })}
    </div>
  );
};
