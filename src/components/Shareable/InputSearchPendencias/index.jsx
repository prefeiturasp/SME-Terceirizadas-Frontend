import React from "react";
import "./style.scss";

export const InputSearchPendencias = props => (
  <div className="div-input-search">
    <div className="container-input">
      <span>
        <input
          className="input-search"
          placeholder="Pesquisar"
          onChange={props.filterList}
        />
        <i className="fas fa-search" />
      </span>
    </div>
  </div>
);
