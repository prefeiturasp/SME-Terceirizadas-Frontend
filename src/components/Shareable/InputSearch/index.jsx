import React from "react";
import { NavLink } from "react-router-dom";
import { Botao } from "../Botao";
import { BUTTON_STYLE, BUTTON_TYPE, BUTTON_ICON } from "../Botao/constants";
import "./style.scss";

export const InputSearch = props => (
  <div className="div-input-search row">
    <div className="col-12">
      <span>
        <input
          className="input-search"
          placeholder="Pesquisar"
          onChange={props.filterList}
        />
        <i class="fas fa-search" />
      </span>
      <div className="float-right">
        <NavLink to={props.voltarLink || "/"}>
          <Botao
            className="mr-3"
            icon={BUTTON_ICON.ARROW_LEFT}
            style={BUTTON_STYLE.BLUE}
            texto="Voltar"
            type={BUTTON_TYPE.BUTTON}
          />
        </NavLink>
        <Botao
          icon={BUTTON_ICON.PRINT}
          style={BUTTON_STYLE.BLUE}
          type={BUTTON_TYPE.BUTTON}
        />
      </div>
    </div>
  </div>
);
