import React from "react";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_ICON
} from "components/Shareable/Botao/constants";

export const Botoes = ({ produto, setVerProduto, verUnicoProduto }) => {
  return (
    <div className="row mb-3">
      <div className="col-12 text-right">
        <Botao
          onClick={() => setVerProduto(verUnicoProduto ? null : produto)}
          texto={verUnicoProduto ? "Voltar" : "Ver produto"}
          style={verUnicoProduto ? BUTTON_STYLE.BLUE : BUTTON_STYLE.GREEN}
          icon={verUnicoProduto && BUTTON_ICON.ARROW_LEFT}
        />
        <Botao
          className="ml-3"
          texto="Questionar terceirizada"
          style={BUTTON_STYLE.GREEN_OUTLINE}
        />
        <Botao
          className="ml-3"
          texto="Recusar"
          style={BUTTON_STYLE.GREEN_OUTLINE}
        />
        <Botao
          className="ml-3 mr-3"
          texto="Aceitar"
          style={BUTTON_STYLE.GREEN_OUTLINE}
        />
      </div>
    </div>
  );
};
