import React from "react";
import { Menu, LeafItem } from "./shared";
import { DISPONIBILIZACAO_DE_SOLICITACOES, LOGISTICA } from "configs/constants";

const MenuLogistica = () => {
  return (
    <Menu id="Logistica" icon="fa-truck" title="Logística">
      <LeafItem to={`/${LOGISTICA}/${DISPONIBILIZACAO_DE_SOLICITACOES}`}>
        Disponibilização de solicitações
      </LeafItem>
    </Menu>
  );
};

export default MenuLogistica;
