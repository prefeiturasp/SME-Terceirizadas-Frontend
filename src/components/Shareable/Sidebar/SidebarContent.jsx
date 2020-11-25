import React, { useState, useCallback } from "react";
import {
  usuarioEhCODAEGestaoAlimentacao,
  usuarioEhCODAEDietaEspecial,
  usuarioEhEscola,
  usuarioEhTerceirizada,
  usuarioEhCODAEGestaoProduto,
  usuarioEhNutricionistaSupervisao,
  usuarioEhDRE,
  usuarioEhCoordenadorEscola,
  usuarioEhLogistica
} from "helpers/utilities";
import { ListItem } from "./menus/shared";
import {
  MenuGestaoDeAlimentacao,
  MenuDietaEspecial,
  MenuCadastros,
  MenuConfiguracoes,
  MenuGestaoDeProduto,
  MenuLancamentoInicial,
  MenuRelatorios,
  MenuLogistica
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
  const exibirPainelInicial = !usuarioEhCoordenadorEscola();
  const exibirGestaoAlimentacao =
    usuarioEhCODAEGestaoAlimentacao() ||
    usuarioEhDRE() ||
    usuarioEhEscola() ||
    usuarioEhTerceirizada();
  const exibirDietaEspecial =
    usuarioEhCODAEGestaoAlimentacao() ||
    usuarioEhCODAEDietaEspecial() ||
    usuarioEhNutricionistaSupervisao() ||
    usuarioEhEscola() ||
    usuarioEhDRE() ||
    usuarioEhTerceirizada();
  const exibirGestaoProduto =
    usuarioEhCODAEGestaoAlimentacao() ||
    usuarioEhCODAEGestaoProduto() ||
    usuarioEhCODAEDietaEspecial() ||
    usuarioEhNutricionistaSupervisao() ||
    usuarioEhEscola() ||
    usuarioEhTerceirizada();
  const exibirLancamentoInicial = usuarioEhEscola();
  const exibirCadastros =
    usuarioEhCODAEGestaoAlimentacao() || usuarioEhEscola();
  const exibirRelatorios = !usuarioEhCoordenadorEscola();
  const exibirConfiguracoes = !usuarioEhEscola();
  const exibirMenuLogistica = usuarioEhLogistica();

  const _props = {
    activeMenu,
    onSubmenuClick: onSubmenuClick
  };

  return [
    exibirPainelInicial && (
      <ListItem key={0} icon="fa-file-alt" to={"/"}>
        Painel Inicial
      </ListItem>
    ),
    exibirGestaoAlimentacao && <MenuGestaoDeAlimentacao key={1} {..._props} />,
    exibirDietaEspecial && <MenuDietaEspecial key={2} />,
    exibirGestaoProduto && <MenuGestaoDeProduto key={3} {..._props} />,
    exibirCadastros && <MenuCadastros key={5} />,
    exibirLancamentoInicial && <MenuLancamentoInicial key={6} />,
    exibirMenuLogistica && <MenuLogistica key={7} />,
    exibirRelatorios && <MenuRelatorios key={8} />,
    exibirConfiguracoes && <MenuConfiguracoes key={9} />
  ];
};
