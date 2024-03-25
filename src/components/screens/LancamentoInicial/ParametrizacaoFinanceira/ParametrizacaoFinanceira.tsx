import React from "react";

import { useNavigate } from "react-router-dom";

import { ADICIONAR_PARAMETRIZACAO_FINANCEIRA } from "configs/constants";

import Botao from "components/Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE,
} from "components/Shareable/Botao/constants";

export default () => {
  const navigate = useNavigate();

  return (
    <Botao
      texto="Adicionar Parametrização"
      titulo="Adicionar Parametrização"
      className="mt-4"
      onClick={() => navigate(ADICIONAR_PARAMETRIZACAO_FINANCEIRA)}
      style={BUTTON_STYLE.GREEN}
      type={BUTTON_TYPE.BUTTON}
    />
  );
};
