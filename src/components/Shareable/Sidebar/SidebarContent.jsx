import React, { useState, useCallback } from "react";
import {
  usuarioEhCODAEGestaoAlimentacao,
  usuarioEhCODAENutriManifestacao,
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
  usuarioEscolaEhGestaoDireta,
  usuarioEscolaEhGestaoMistaParceira,
  usuarioEhMedicao,
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
  MenuLogistica,
  MenuPreRecebimento
} from "./menus";

export const SidebarContent = () => {
  const [activeMenu, setActiveMenu] = useState("");
  const [activeMenuCadastros, setActiveMenuCadastros] = useState("");

  const onSubmenuClick = useCallback(
    clickedMenu => {
      setActiveMenu(clickedMenu === activeMenu ? "" : clickedMenu);
    },
    [activeMenu]
  );

  const onSubmenuCadastroClick = useCallback(
    clickedMenu => {
      setActiveMenuCadastros(
        clickedMenu === activeMenuCadastros ? "" : clickedMenu
      );
    },
    [activeMenuCadastros]
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
      usuarioEhCODAENutriManifestacao() ||
      usuarioEhDRE() ||
      usuarioEhMedicao() ||
      (usuarioEhEscola() &&
        !usuarioEscolaEhGestaoMistaParceira() &&
        !usuarioEscolaEhGestaoDireta()) ||
      usuarioEhTerceirizada() ||
      usuarioEhNutricionistaSupervisao());
  const exibirDietaEspecial =
    usuarioEhCODAEGestaoAlimentacao() ||
    usuarioEhCODAENutriManifestacao() ||
    usuarioEhCODAEDietaEspecial() ||
    usuarioEhNutricionistaSupervisao() ||
    usuarioEhEscola() ||
    usuarioEhDRE() ||
    usuarioEhTerceirizada() ||
    usuarioEhMedicao();
  const exibirGestaoProduto =
    usuarioEhCODAEGestaoAlimentacao() ||
    usuarioEhCODAENutriManifestacao() ||
    usuarioEhCODAEGestaoProduto() ||
    usuarioEhCODAEDietaEspecial() ||
    usuarioEhNutricionistaSupervisao() ||
    (usuarioEhEscola() &&
      !usuarioEscolaEhGestaoMistaParceira() &&
      !usuarioEscolaEhGestaoDireta()) ||
    usuarioEhDRE() ||
    usuarioEhTerceirizada();
  const exibirLancamentoInicial =
    exibeMenuValidandoAmbiente &&
    ((usuarioEhEscola() && !usuarioEscolaEhGestaoDireta()) ||
      usuarioEhMedicao());
  const exibirCadastros =
    usuarioEhLogistica() ||
    usuarioEhMedicao() ||
    (!exibeMenuValidandoAmbiente && usuarioEhCODAEGestaoAlimentacao()) ||
    (exibeMenuValidandoAmbiente &&
      (usuarioEhCODAEGestaoAlimentacao() || usuarioEhEscola()));
  const exibirRelatorios =
    !usuarioEhCoordenadorEscola() &&
    !usuarioEhEscolaAbastecimento() &&
    !usuarioComAcessoTelaEntregasDilog() &&
    !usuarioEhLogistica() &&
    !usuarioEhDistribuidora() &&
    !usuarioEscolaEhGestaoDireta() &&
    !usuarioEhMedicao();

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

  const exibirMenuPreRecebimento = usuarioEhLogistica();

  const _props = {
    activeMenu,
    onSubmenuClick: onSubmenuClick,
    activeMenuCadastros,
    onSubmenuCadastroClick: onSubmenuCadastroClick
  };

  return [
    exibirPainelInicial && (
      <ListItem key={0} icon="fa-home" to={"/"}>
        Painel Inicial
      </ListItem>
    ),
    exibirGestaoAlimentacao && <MenuGestaoDeAlimentacao key={1} {..._props} />,
    exibirDietaEspecial && <MenuDietaEspecial key={2} {..._props} />,
    exibirGestaoProduto && <MenuGestaoDeProduto key={3} {..._props} />,
    exibirCadastros && <MenuCadastros key={5} />,
    exibirLancamentoInicial && <MenuLancamentoInicial key={6} />,
    exibirMenuLogistica && <MenuLogistica key={7} />,
    exibirRelatorios && <MenuRelatorios key={8} />,
    exibirMenuPreRecebimento && <MenuPreRecebimento key={9} />,
    exibirConfiguracoes && <MenuConfiguracoes key={10} />
  ];
};
