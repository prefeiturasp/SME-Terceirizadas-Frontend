import React from "react";

import Botao from "components/Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE,
} from "components/Shareable/Botao/constants";

export default () => {
  return (
    <Botao
      texto="Adicionar Parametrização"
      titulo="Adicionar Parametrização"
      className="mt-4"
      onClick={() => {}}
      style={BUTTON_STYLE.GREEN}
      type={BUTTON_TYPE.BUTTON}
    />
  );
};
