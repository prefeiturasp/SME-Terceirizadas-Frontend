import React from "react";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE,
} from "components/Shareable/Botao/constants";
import "./style.scss";

export const ListaOcorrencias = () => {
  return (
    <div className="card lista-ocorrencias mt-3">
      <div className="card-body">
        <div className="row">
          <div className="col-6"></div>
          <div className="col-6 text-end">
            <Botao
              texto="Registrar Nova Ocorrência"
              type={BUTTON_TYPE.BUTTON}
              style={BUTTON_STYLE.GREEN_OUTLINE}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
