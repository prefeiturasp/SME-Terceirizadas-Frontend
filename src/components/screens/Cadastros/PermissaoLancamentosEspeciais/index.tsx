import React from "react";
import { Link } from "react-router-dom";

import Botao from "components/Shareable/Botao";
import { BUTTON_STYLE } from "components/Shareable/Botao/constants";
import "./style.scss";

export const PermissaoLancamentosEspeciais = () => {
  return (
    <div className="card mt-3">
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <Link
            to={
              "/configuracoes/cadastros/tipos-alimentacao/permissao-lancamentos-especiais/nova-permissao-lancamento-especial"
            }
            style={{ display: "contents" }}
          >
            <Botao texto="Nova Permissão" style={BUTTON_STYLE.GREEN} />
          </Link>
        </div>
      </div>
    </div>
  );
};
