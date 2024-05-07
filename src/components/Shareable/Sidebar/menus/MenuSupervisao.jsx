import React from "react";
import { Menu, LeafItem } from "./shared";
import {
  SUPERVISAO,
  RELATORIO_FISCALIZACAO_TERCEIRIZADAS,
} from "configs/constants";

export const MenuSupervisao = () => {
  return (
    <Menu id="Supervisao" icon="fa-clipboard-list" title={"Supervisão"}>
      <LeafItem to={`/${SUPERVISAO}/${RELATORIO_FISCALIZACAO_TERCEIRIZADAS}`}>
        Relatório de Fiscalização
      </LeafItem>
    </Menu>
  );
};
