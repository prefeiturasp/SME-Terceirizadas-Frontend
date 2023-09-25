import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import Botao from "components/Shareable/Botao/index.jsx";
import {
  BUTTON_STYLE,
  BUTTON_TYPE,
} from "components/Shareable/Botao/constants.js";
import { NavLink } from "react-router-dom";
import {
  CADASTRO_LAYOUT_EMBALAGEM,
  PRE_RECEBIMENTO,
} from "configs/constants.js";
import "./styles.scss";

export default () => {
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    setCarregando(false);
  }, []);

  return (
    <Spin tip="Carregando..." spinning={carregando}>
      <div className="card mt-3 card-layout-embalagem">
        <div className="card-body layout-embalagem">
          <NavLink to={`/${PRE_RECEBIMENTO}/${CADASTRO_LAYOUT_EMBALAGEM}`}>
            <Botao
              texto="Cadastrar Layout de Embalagem"
              type={BUTTON_TYPE.BUTTON}
              style={BUTTON_STYLE.GREEN}
            />
          </NavLink>
        </div>
      </div>
    </Spin>
  );
};
