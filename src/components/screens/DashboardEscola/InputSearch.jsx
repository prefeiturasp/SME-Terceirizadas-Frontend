import React from "react";
import { NavLink } from "react-router-dom";
import "./style.scss";

export const InputSearch = props =>
(
  <div className="row">
    <div className="col-12">
      <NavLink to={props.voltarLink || "/"} className="btn btn-outline-secondary">
        <i class="fas fa-arrow-left" /> Voltar
      </NavLink>
      <span class="float-right">
        <input class="input-search" placeholder="Pesquisar" />
        <i class="fas fa-search" />
      </span>
    </div>
  </div>
);
