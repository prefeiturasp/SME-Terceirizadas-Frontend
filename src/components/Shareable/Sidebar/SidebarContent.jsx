import React, { useState, useCallback } from "react";
import {
  usuarioEhCODAEGestaoAlimentacao,
  usuarioEhCODAEDietaEspecial,
  usuarioEhEscola,
  usuarioEhEscolaAbastecimento,
  usuarioEhTerceirizada,
  usuarioEhCODAEGestaoProduto,
  usuarioEhNutricionistaSupervisao,
  usuarioEhDRE,
  usuarioEhAdministradorDRE,
  usuarioEhCoordenadorEscola,
  usuarioEhLogistica,
  usuarioEhAdministradorGpCODAE,
  usuarioEhAdministradorNutriSupervisao,
  usuarioEhDistribuidora,
  usuarioComAcessoTelaEntregasDilog,
  usuarioEhCoordenadorNutriSupervisao,
  usuarioEscolaEhGestaoMistaParceira,
  exibirGA
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
  const exibeMenuValidandoAmbiente = exibirGA();
  const exibirPainelInicial =
    !usuarioEhCoordenadorEscola() &&
    !usuarioEhEscolaAbastecimento() &&
    !usuarioComAcessoTelaEntregasDilog() &&
    !usuarioEhLogistica() &&
    !usuarioEhDistribuidora();
  const exibirGestaoAlimentacao =
    exibeMenuValidandoAmbiente &&
    (usuarioEhCODAEGestaoAlimentacao() ||
      usuarioEhDRE() ||
      (usuarioEhEscola() && !usuarioEscolaEhGestaoMistaParceira()) ||
      usuarioEhTerceirizada());
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
    (usuarioEhEscola() && !usuarioEscolaEhGestaoMistaParceira()) ||
    usuarioEhDRE() ||
    usuarioEhTerceirizada();
  const exibirLancamentoInicial =
    exibeMenuValidandoAmbiente && usuarioEhEscola();
  const exibirCadastros =
    usuarioEhLogistica() ||
    (!exibeMenuValidandoAmbiente && usuarioEhCODAEGestaoAlimentacao()) ||
    (exibeMenuValidandoAmbiente &&
      (usuarioEhCODAEGestaoAlimentacao() || usuarioEhEscola()));
  const exibirRelatorios =
    !usuarioEhCoordenadorEscola() &&
    !usuarioEhEscolaAbastecimento() &&
    !usuarioComAcessoTelaEntregasDilog() &&
    !usuarioEhLogistica() &&
    !usuarioEhDistribuidora();

  const exibirConfiguracoes =
    !usuarioEhEscola() &&
    !usuarioEhAdministradorGpCODAE() &&
    !usuarioEhAdministradorNutriSupervisao() &&
    !usuarioEhAdministradorDRE() &&
    !usuarioEhEscolaAbastecimento() &&
    !usuarioComAcessoTelaEntregasDilog() &&
    !usuarioEhLogistica() &&
    !usuarioEhDistribuidora();

  const exibirMenuLogistica =
    usuarioEhLogistica() ||
    usuarioEhDistribuidora() ||
    usuarioEhDRE() ||
    usuarioEhEscolaAbastecimento() ||
    usuarioEhCoordenadorNutriSupervisao() ||
    usuarioComAcessoTelaEntregasDilog();

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
