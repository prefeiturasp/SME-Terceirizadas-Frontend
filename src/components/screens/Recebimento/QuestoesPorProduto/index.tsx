import React from "react";
import { NavLink } from "react-router-dom";

import { RECEBIMENTO, ATRIBUIR_QUESTOES_CONFERENCIA } from "configs/constants";
import {
  BUTTON_TYPE,
  BUTTON_STYLE,
} from "components/Shareable/Botao/constants";
import Botao from "components/Shareable/Botao";

export default () => {
  return (
    <div className="pt-4 pb-4">
      <NavLink to={`/${RECEBIMENTO}/${ATRIBUIR_QUESTOES_CONFERENCIA}`}>
        <Botao
          texto="Atribuir Questões"
          type={BUTTON_TYPE.BUTTON}
          style={BUTTON_STYLE.GREEN}
        />
      </NavLink>
    </div>
  );
};
