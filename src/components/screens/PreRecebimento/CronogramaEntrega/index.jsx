import React from "react";
import Botao from "components/Shareable/Botao/index.jsx";
import {
  BUTTON_STYLE,
  BUTTON_TYPE
} from "components/Shareable/Botao/constants.js";
import { NavLink } from "react-router-dom";
import { CADASTRO_CRONOGRAMA, PRE_RECEBIMENTO } from "configs/constants.js";

export default () => {
  return (
    <div className="card mt-3 card-cronograma-entrega">
      <div className="card-body cronograma-entrega">
        <NavLink to={`/${PRE_RECEBIMENTO}/${CADASTRO_CRONOGRAMA}`}>
          <Botao
            texto="Cadastrar Cronograma"
            type={BUTTON_TYPE.BUTTON}
            style={BUTTON_STYLE.GREEN}
            onClick={() => {}}
          />
        </NavLink>
      </div>
    </div>
  );
};
