import React, { useState } from "react";
import { Spin } from "antd";
import "./styles.scss";
import { NavLink } from "react-router-dom";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE,
} from "components/Shareable/Botao/constants";
import { CADASTRO_FICHA_TECNICA, PRE_RECEBIMENTO } from "configs/constants";

export default () => {
  const [carregando] = useState<boolean>(false);

  return (
    <Spin tip="Carregando..." spinning={carregando}>
      <div className="card mt-3 card-ficha-tecnica">
        <div className="card-body ficha-tecnica">
          <NavLink to={`/${PRE_RECEBIMENTO}/${CADASTRO_FICHA_TECNICA}`}>
            <Botao
              texto="Cadastrar Ficha Técnica"
              type={BUTTON_TYPE.BUTTON}
              style={BUTTON_STYLE.GREEN}
            />
          </NavLink>
        </div>
      </div>
    </Spin>
  );
};
