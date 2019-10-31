import React from "react";
import { NavLink } from "react-router-dom";
import "./style.scss";

export default props => (
  <div className="card card-shortcut">
    <div className="card-header">{props.titulo}</div>
    <div className="card-body">
      <p className="card-text">{props.texto}</p>
    </div>
    <div className="card-footer">
      <NavLink to={props.href} className="card-link" data-cy={props.nome}>
        {props.textoLink}
      </NavLink>
    </div>
  </div>
);
