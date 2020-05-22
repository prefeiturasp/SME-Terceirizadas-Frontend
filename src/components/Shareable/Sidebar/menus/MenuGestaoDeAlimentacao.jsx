import React from "react";
import { Menu, SubMenu, LeafItem } from "./shared";
import {
  CODAE,
  SOLICITACOES_AUTORIZADAS,
  SOLICITACOES_PENDENTES,
  SOLICITACOES_NEGADAS,
  SOLICITACOES_CANCELADAS
} from "configs/constants";

const MenuGestaoDeAlimentacao = ({ activeMenu, onSubmenuClick }) => {
  return (
    <Menu
      id="GestaoAlimentacao"
      icon="fa-utensils"
      title={"Gestão de Alimentação"}
    >
      <LeafItem to="/">Painel de Solicitações</LeafItem>
      <SubMenu
        icon="fa-chevron-down"
        path="consulta-solicitacoes"
        onClick={onSubmenuClick}
        title="Consulta de Solicitações"
        activeMenu={activeMenu}
      >
        <LeafItem to={`/${CODAE}/${SOLICITACOES_PENDENTES}`}>
          Aguardando autorização
        </LeafItem>
        <LeafItem to={`/${CODAE}/${SOLICITACOES_AUTORIZADAS}`}>
          Autorizadas
        </LeafItem>
        <LeafItem to={`/${CODAE}/${SOLICITACOES_NEGADAS}`}>Negadas</LeafItem>
        <LeafItem to={`/${CODAE}/${SOLICITACOES_CANCELADAS}`}>
          Canceladas
        </LeafItem>
      </SubMenu>
    </Menu>
  );
};

export default MenuGestaoDeAlimentacao;
