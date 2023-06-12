import React, { useState } from "react";
import { Spin } from "antd";
import Botao from "components/Shareable/Botao/index.jsx";
import {
  BUTTON_STYLE,
  BUTTON_TYPE
} from "components/Shareable/Botao/constants.js";
import { NavLink } from "react-router-dom";
import { CADASTRO_NOTIFICACAO, LOGISTICA } from "configs/constants.js";

export default () => {
  const [carregando] = useState(false);

  return (
    <Spin tip="Carregando..." spinning={carregando}>
      <div className="card mt-3 card-cronograma-entrega">
        <div className="card-body cronograma-entrega">
          <NavLink to={`/${LOGISTICA}/${CADASTRO_NOTIFICACAO}`}>
            <Botao
              texto="Nova Notificação"
              type={BUTTON_TYPE.BUTTON}
              style={BUTTON_STYLE.GREEN}
              onClick={() => {}}
            />
          </NavLink>
        </div>
      </div>
    </Spin>
  );
};
