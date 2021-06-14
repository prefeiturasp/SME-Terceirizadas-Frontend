import React from "react";
import { withRouter } from "react-router-dom";

import { Botao } from "../Botao";
import { BUTTON_STYLE, BUTTON_TYPE, BUTTON_ICON } from "../Botao/constants";

const BotaoVoltar = ({ history }) => (
  <Botao
    texto="Voltar"
    titulo="Voltar"
    type={BUTTON_TYPE.BUTTON}
    style={BUTTON_STYLE.GREEN_OUTLINE}
    icon={BUTTON_ICON.ARROW_LEFT}
    className="float-right"
    onClick={() =>
      history.location.key ? history.goBack() : history.push("/")
    }
  />
);
export default withRouter(BotaoVoltar);
