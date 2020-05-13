import React, { useState, useCallback } from "react";
import { RELATORIOS } from "configs/constants";
import {
  usuarioEhCODAEGestaoAlimentacao,
  usuarioEhCODAEDietaEspecial,
  usuarioEhTerceirizada,
  usuarioEhCODAEGestaoProduto
} from "helpers/utilities";
import { ListItem } from "./menus/shared";
import {
  MenuGestaoDeAlimentacao,
  MenuDietaEspecial,
  MenuCadastros,
  MenuConfiguracoes,
  MenuGestaoDeProduto,
  MenuPesquisaDesenvolvimento
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
  const exibirCadastros = usuarioEhCODAEGestaoAlimentacao();
  const exibirGestaoAlimentacao =
    usuarioEhCODAEGestaoAlimentacao() || usuarioEhTerceirizada();
  const exibirGestaoProduto =
    usuarioEhCODAEGestaoProduto() || usuarioEhCODAEDietaEspecial();
  const exibirDietaEspecial =
    usuarioEhCODAEDietaEspecial() || usuarioEhTerceirizada();
  const exibirPeD = usuarioEhCODAEGestaoAlimentacao();

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
    exibirPeD && <MenuPesquisaDesenvolvimento key={4} />,
    <ListItem key={5} icon="fa-file-alt" to={`/${RELATORIOS}/`}>
      Relatórios
    </ListItem>,
    exibirCadastros && <MenuCadastros key={6} />,
    <MenuConfiguracoes key={7} />
  ];
};
