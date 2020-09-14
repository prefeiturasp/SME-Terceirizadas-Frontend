import React, { useState, useCallback } from "react";
import {
  usuarioEhCODAEGestaoAlimentacao,
  usuarioEhCODAEDietaEspecial,
  usuarioEhEscola,
  usuarioEhTerceirizada,
  usuarioEhCODAEGestaoProduto,
  usuarioEhNutricionistaSupervisao,
  usuarioEhDRE
} from "helpers/utilities";
import { ListItem } from "./menus/shared";
import {
  MenuGestaoDeAlimentacao,
  MenuDietaEspecial,
  MenuCadastros,
  MenuConfiguracoes,
  MenuGestaoDeProduto,
  MenuRelatorios
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
  const exibirGestaoAlimentacao =
    usuarioEhCODAEGestaoAlimentacao() ||
    usuarioEhDRE() ||
    usuarioEhEscola() ||
    usuarioEhTerceirizada();
  const exibirDietaEspecial =
    usuarioEhCODAEDietaEspecial() ||
    usuarioEhNutricionistaSupervisao() ||
    usuarioEhEscola() ||
    usuarioEhDRE() ||
    usuarioEhTerceirizada();
  const exibirGestaoProduto =
    usuarioEhCODAEGestaoProduto() ||
    usuarioEhCODAEDietaEspecial() ||
    usuarioEhNutricionistaSupervisao() ||
    usuarioEhEscola() ||
    usuarioEhTerceirizada();
  const exibirCadastros =
    usuarioEhCODAEGestaoAlimentacao() || usuarioEhEscola();

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
    exibirGestaoProduto && <MenuGestaoDeProduto key={3} {..._props} />,
    exibirCadastros && <MenuCadastros key={5} />,
    <MenuRelatorios key={6} />,
    <MenuConfiguracoes key={8} />
  ];
};
