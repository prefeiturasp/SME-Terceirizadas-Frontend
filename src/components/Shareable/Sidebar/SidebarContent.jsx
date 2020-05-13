import React, { useState, useCallback } from "react";
import { RELATORIOS } from "configs/constants";
import {
  usuarioEhCODAEGestaoAlimentacao,
  usuarioEhCODAEDietaEspecial,
  usuarioEhCODAE,
  usuarioEhTerceirizada
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

  // NOTE: essas condicoes consideram apenas codae e terceirizada.
  // Para utilizar esse componente com outros perfis precisa atualizar os
  // criterios de exibicao abaixo
  const exibirCadastros = usuarioEhCODAE();
  const exibirGestaoAlimentacao =
    usuarioEhCODAEGestaoAlimentacao() || usuarioEhTerceirizada();
  const exibirDietaEspecial =
    usuarioEhCODAEDietaEspecial() || usuarioEhTerceirizada();
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
    exibirCadastros && <MenuCadastros key={5} />,
    <MenuConfiguracoes key={6} />
  ];
};
