import React from "react";
import { Link } from "react-router-dom";

import { Botao } from "../Botao";
import { BUTTON_STYLE, BUTTON_TYPE, BUTTON_ICON } from "../Botao/constants";

const BotaoVoltar = ({ location, to }) => {
  return (
    <Link
      to={{
        pathname: location && location.state ? location.state.prevPath : to,
        state: { botaoVoltar: true }
      }}
    >
      <Botao
        texto="Voltar"
        titulo="Voltar"
        type={BUTTON_TYPE.BUTTON}
        style={BUTTON_STYLE.GREEN_OUTLINE}
        icon={BUTTON_ICON.ARROW_LEFT}
        className="float-right"
      />
    </Link>
  );
};

export default BotaoVoltar;
