import React from "react";
import { Link } from "react-router-dom";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE,
} from "components/Shareable/Botao/constants";
import {
  MEDICAO_INICIAL,
  CLAUSULAS_PARA_DESCONTOS,
  CADASTRO_DE_CLAUSULA,
} from "configs/constants";

export function ClausulasParaDescontos() {
  return (
    <div className="clausulas-desconto">
      <div className="card mt-3">
        <div className="card-body">
          <Link
            to={`/${MEDICAO_INICIAL}/${CLAUSULAS_PARA_DESCONTOS}/${CADASTRO_DE_CLAUSULA}/`}
            className="pt-4"
          >
            <Botao
              texto="Cadastrar Cláusulas"
              type={BUTTON_TYPE.BUTTON}
              style={BUTTON_STYLE.GREEN}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
