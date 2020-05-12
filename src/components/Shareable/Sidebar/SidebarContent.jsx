import React, { useState } from "react";
import { RELATORIOS } from "configs/constants";
import {
  usuarioEhCODAEGestaoAlimentacao,
  usuarioEhCODAEDietaEspecial
} from "helpers/utilities";
import { ListItem } from "./menus/shared";
import {
  MenuGestaoDeAlimentacao,
  MenuDietaEspecial,
  MenuCadastros,
  MenuConfiguracoes
} from "./menus";

export const SidebarContent = () => {
  const [activeMenu, setActiveMenu] = useState("");

  const onSubmenuClick = clickedMenu => {
    setActiveMenu({
      activeMenu: clickedMenu === this.state.activeMenu ? "" : clickedMenu
    });
  };

  const exibirGestaoAlimentacao = usuarioEhCODAEGestaoAlimentacao();
  const exibirDietaEspecial = usuarioEhCODAEDietaEspecial();

  return [
    <ListItem key={0} icon="fa-file-alt" to={"/"}>
      Painel Inicial
    </ListItem>,
    exibirGestaoAlimentacao && (
      <MenuGestaoDeAlimentacao
        onSubmenuClick={onSubmenuClick}
        activeMenu={activeMenu}
      />
    ),
    exibirDietaEspecial && <MenuDietaEspecial />,
    <ListItem key={1} icon="fa-file-alt" to={`/${RELATORIOS}/`}>
      Relatórios
    </ListItem>,
    <MenuCadastros key={3} />,
    <MenuConfiguracoes key={4} />
  ];
};
