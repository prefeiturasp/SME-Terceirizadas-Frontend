import React, { useState, useCallback } from "react";
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
  MenuConfiguracoes,
  MenuGestaoDeProduto
} from "./menus";

export const SidebarContent = () => {
  const [activeMenu, setActiveMenu] = useState("");

  const onSubmenuClick = useCallback(
    clickedMenu => {
      setActiveMenu(clickedMenu === activeMenu ? "" : clickedMenu);
    },
    [activeMenu]
  );

  const exibirGestaoAlimentacao = usuarioEhCODAEGestaoAlimentacao();
  const exibirDietaEspecial = usuarioEhCODAEDietaEspecial();
  const _props = {
    activeMenu,
    onSubmenuClick: onSubmenuClick
  };

  return [
    <ListItem key={0} icon="fa-file-alt" to={"/"}>
      Painel Inicial
    </ListItem>,
    exibirGestaoAlimentacao && <MenuGestaoDeAlimentacao key={1} {..._props} />,
    exibirDietaEspecial && <MenuDietaEspecial key={2} />,
    <MenuGestaoDeProduto key={3} {..._props} />,
    <ListItem key={4} icon="fa-file-alt" to={`/${RELATORIOS}/`}>
      Relatórios
    </ListItem>,
    <MenuCadastros key={5} />,
    <MenuConfiguracoes key={6} />
  ];
};
