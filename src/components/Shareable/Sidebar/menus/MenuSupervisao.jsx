import {
  NOVO_RELATORIO_VISITAS,
  PAINEL_RELATORIOS_VISITAS,
  RELATORIO_FISCALIZACAO_TERCEIRIZADAS,
  SUPERVISAO,
  TERCEIRIZADAS,
} from "configs/constants";
import React from "react";
import { LeafItem, Menu, SubMenu } from "./shared";

export const MenuSupervisao = ({ ...props }) => {
  const { activeMenu, onSubmenuClick } = props;
  return (
    <Menu id="Supervisao" icon="fa-clipboard-list" title={"Supervisão"}>
      <SubMenu
        icon="fa-chevron-down"
        path="terceirizadas"
        onClick={onSubmenuClick}
        title="Terceirizadas"
        activeMenu={activeMenu}
      >
        <LeafItem
          to={`/${SUPERVISAO}/${TERCEIRIZADAS}/${PAINEL_RELATORIOS_VISITAS}`}
        >
          Painel de Acompanhamento
        </LeafItem>
        <LeafItem
          to={`/${SUPERVISAO}/${TERCEIRIZADAS}/${RELATORIO_FISCALIZACAO_TERCEIRIZADAS}/${NOVO_RELATORIO_VISITAS}`}
        >
          Novo Relatório de Visita
        </LeafItem>
      </SubMenu>
    </Menu>
  );
};
