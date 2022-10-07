import React from "react";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE,
  BUTTON_ICON
} from "components/Shareable/Botao/constants";
import { imprimeFichaIdentificacaoProduto } from "services/produto.service";
import { useHistory } from "react-router-dom";

export const BotoesRodape = ({ homologacao }) => {
  const history = useHistory();

  return (
    <div className="row">
      <div className="col-12">
        <Botao
          type={BUTTON_TYPE.BUTTON}
          style={BUTTON_STYLE.GREEN}
          texto="Imprimir"
          icon={BUTTON_ICON.PRINT}
          onClick={() => imprimeFichaIdentificacaoProduto(homologacao.uuid)}
          className="float-right"
        />
        <Botao
          type={BUTTON_TYPE.BUTTON}
          texto="Voltar"
          style={BUTTON_STYLE.GREEN_OUTLINE}
          icon={BUTTON_ICON.ARROW_LEFT}
          onClick={() => history.goBack()}
          className="mr-2 float-right"
        />
      </div>
    </div>
  );
};
export default BotoesRodape;
