import React from "react";

import { Botao } from "../Botao";
import { BUTTON_STYLE, BUTTON_TYPE, BUTTON_ICON } from "../Botao/constants";

const BotaoVoltar = ({ onClick }) => {
  return (
    <Botao
      onClick={onClick}
      texto="Voltar"
      titulo="Voltar"
      type={BUTTON_TYPE.BUTTON}
      style={BUTTON_STYLE.GREEN_OUTLINE}
      icon={BUTTON_ICON.ARROW_LEFT}
      className="float-end"
    />
  );
};

export default BotaoVoltar;
