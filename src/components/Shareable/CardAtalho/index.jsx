import React from "react";
import { NavLink } from "react-router-dom";
import "./style.scss";

export const CardAtalho = ({ titulo, texto, nome, href, textoLink }) => (
  <div className="card card-shortcut">
    <div className="card-header">{titulo}</div>
    <div className="card-body">
      <p className="card-text">{texto}</p>
    </div>
    <div className="card-footer">
      <NavLink to={href} className="card-link" data-cy={nome}>
        {textoLink}
      </NavLink>
    </div>
  </div>
);

export default CardAtalho;
