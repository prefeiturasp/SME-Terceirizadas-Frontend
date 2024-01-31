import React from "react";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE,
} from "components/Shareable/Botao/constants";
import "./style.scss";

export const EditaisContratosRefatorado = () => {
  return (
    <div className="form-editais-contratos">
      <div className="card mt-3">
        <div className="card-body">
          <div className="row">
            <div className="col-6">
              <div className="title">Novo Cadastro</div>
            </div>
            <div className="col-6 text-end">
              <Botao
                texto="Editais e Contratos Cadastrados"
                type={BUTTON_TYPE.SUBMIT}
                style={BUTTON_STYLE.GREEN_OUTLINE}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
