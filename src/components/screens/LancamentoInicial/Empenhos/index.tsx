import React from "react";
import Botao from "components/Shareable/Botao";
import { BUTTON_STYLE } from "components/Shareable/Botao/constants";
import { Link } from "react-router-dom";

export function Empenhos() {
  return (
    <div className="card mt-3">
      <div className="card-body">
        <Link to={"/medicao-inicial/empenhos/cadastro-de-empenho/"}>
          <Botao texto="Cadastrar Empenho" style={BUTTON_STYLE.GREEN} />
        </Link>
      </div>
    </div>
  );
}
