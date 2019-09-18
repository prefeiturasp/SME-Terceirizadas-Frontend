import React from "react";
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
        {!props.esconderImprimir && (
          <Botao
            icon={BUTTON_ICON.PRINT}
            style={BUTTON_STYLE.BLUE}
            type={BUTTON_TYPE.BUTTON}
          />
        )}
      </div>
    </div>
  </div>
);
