import React from "react";
import { NavLink } from "react-router-dom";
import "./style.css";

export const InputSearch = props => (
  <div className="row">
    <div className="col-md-12">
      <NavLink to="/painel-escola" className="btn btn-outline-secondary">
        <i class="fas fa-arrow-left" /> Voltar
      </NavLink>
      <span class="float-right">
        <input class="input-search" placeholder="Pesquisar" />
        <i class="fas fa-search" />
      </span>
    </div>
  </div>
);
