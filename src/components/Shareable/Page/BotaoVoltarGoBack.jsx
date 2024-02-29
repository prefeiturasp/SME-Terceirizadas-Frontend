import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Botao } from "../Botao";
import { BUTTON_STYLE, BUTTON_TYPE, BUTTON_ICON } from "../Botao/constants";

const BotaoVoltar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Botao
      texto="Voltar"
      titulo="Voltar"
      type={BUTTON_TYPE.BUTTON}
      style={BUTTON_STYLE.GREEN_OUTLINE}
      icon={BUTTON_ICON.ARROW_LEFT}
      className="float-end"
      onClick={() => (location.key ? navigate(-1) : navigate("/"))}
    />
  );
};

export default BotaoVoltar;
