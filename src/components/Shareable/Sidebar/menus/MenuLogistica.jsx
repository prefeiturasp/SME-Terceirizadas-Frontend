import React from "react";
import { Menu, LeafItem } from "./shared";
import {
  ENVIO_REQUISICOES_ENTREGA,
  ENVIO_REQUISICOES_ENTREGA_AVANCADO,
  LOGISTICA
} from "configs/constants";

const MenuLogistica = () => {
  return (
    <Menu id="Logistica" icon="fa-truck" title="Logística">
      {/* <LeafItem to={`/${LOGISTICA}/${DISPONIBILIZACAO_DE_SOLICITACOES}`}>
        Disponibilização de solicitações
      </LeafItem> */}
      <LeafItem to={`/${LOGISTICA}/${ENVIO_REQUISICOES_ENTREGA}`}>
        Envio de Requisição de Entrega
      </LeafItem>
      <LeafItem to={`/${LOGISTICA}/${ENVIO_REQUISICOES_ENTREGA_AVANCADO}`}>
        Consulta de Requisições de entrega
      </LeafItem>
    </Menu>
  );
};

export default MenuLogistica;
