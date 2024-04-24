import React from "react";
import {
  BUTTON_TYPE,
  BUTTON_STYLE,
} from "components/Shareable/Botao/constants";
import Botao from "components/Shareable/Botao";
import { NavLink } from "react-router-dom";
import { RECEBIMENTO, CADASTRO_FICHA_RECEBIMENTO } from "configs/constants";

export default () => {
  return (
    <div className="card mt-3 card-ficha-recebimento">
      <div className="card-body ficha-recebimento">
        <NavLink to={`/${RECEBIMENTO}/${CADASTRO_FICHA_RECEBIMENTO}`}>
          <Botao
            texto="Cadastrar Recebimento"
            type={BUTTON_TYPE.BUTTON}
            style={BUTTON_STYLE.GREEN}
            onClick={() => {}}
          />
        </NavLink>
      </div>
    </div>
  );
};
