import React from "react";
import { Menu, LeafItem } from "./shared";
import {
  DISPONIBILIZACAO_DE_SOLICITACOES,
  ENVIO_REQUISICOES_ENTREGA,
  LOGISTICA
} from "configs/constants";

const MenuLogistica = () => {
  return (
    <Menu id="Logistica" icon="fa-truck" title="Logística">
      <LeafItem to={`/${LOGISTICA}/${DISPONIBILIZACAO_DE_SOLICITACOES}`}>
        Disponibilização de solicitações
      </LeafItem>
      <LeafItem to={`/${LOGISTICA}/${ENVIO_REQUISICOES_ENTREGA}`}>
        Guia de remessa
      </LeafItem>
    </Menu>
  );
};

export default MenuLogistica;
