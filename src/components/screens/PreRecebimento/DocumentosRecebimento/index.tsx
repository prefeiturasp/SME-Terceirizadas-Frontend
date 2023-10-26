import React from "react";
import "./styles.scss";
import { NavLink } from "react-router-dom";
import Botao from "../../../Shareable/Botao";
import {
  CADASTRO_DOCUMENTOS_RECEBIMENTO,
  PRE_RECEBIMENTO,
} from "configs/constants";
import { BUTTON_TYPE, BUTTON_STYLE } from "../../../Shareable/Botao/constants";

export default () => {
  return (
    <div className="card mt-3 card-documentos-recebimento">
      <div className="card-body documentos-recebimento">
        <NavLink to={`/${PRE_RECEBIMENTO}/${CADASTRO_DOCUMENTOS_RECEBIMENTO}`}>
          <Botao
            texto="Cadastrar Documentos"
            type={BUTTON_TYPE.BUTTON}
            style={BUTTON_STYLE.GREEN}
          />
        </NavLink>
      </div>
    </div>
  );
};
