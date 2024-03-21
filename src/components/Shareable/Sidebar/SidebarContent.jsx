import React, { useState, useCallback } from "react";

import {
  usuarioEhCODAEGestaoAlimentacao,
  usuarioEhCODAENutriManifestacao,
  usuarioEhCODAEDietaEspecial,
  usuarioEhEscolaAbastecimento,
  usuarioEhEmpresaTerceirizada,
  usuarioEhCODAEGestaoProduto,
  usuarioEhNutricionistaSupervisao,
  usuarioEhDRE,
  usuarioEhLogistica,
  usuarioEhPreRecebimento,
  usuarioEhAdministradorGpCODAE,
  usuarioEhAdministradorNutriSupervisao,
  usuarioEhEmpresaDistribuidora,
  usuarioComAcessoTelaEntregasDilog,
  usuarioEscolaEhGestaoDireta,
  usuarioEscolaEhGestaoParceira,
  usuarioEhMedicao,
  exibirGA,
  usuarioEhDilogQualidadeOuCronograma,
  usuarioEhOutrosDilog,
  usuarioEhPreRecebimentoSemLogistica,
  usuarioEhEmpresaFornecedor,
  usuarioEhAdministradorRepresentanteCodae,
  usuarioEhEscolaTerceirizada,
  usuarioEhEscolaTerceirizadaDiretor,
  usuarioEhEscolaAbastecimentoDiretor,
  usuarioEhQualquerUsuarioEmpresa,
  exibirModuloMedicaoInicial,
  usuarioEhCodaeDilog,
  usuarioEhDilog,
  usuarioEhDilogQualidade,
  usuarioEhCoordenadorGpCODAE,
  usuarioEhOrgaoFiscalizador,
  usuarioEhCODAEGabinete,
  usuarioEhDilogDiretoria,
  usuarioEhRecebimento,
} from "helpers/utilities";
import { ENVIRONMENT } from "constants/config";

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
  MenuPreRecebimento,
  MenuRecebimento,
} from "./menus";

export const SidebarContent = () => {
  const [activeMenu, setActiveMenu] = useState("");
  const [activeMenuCadastros, setActiveMenuCadastros] = useState("");
  const [activeSubmenu, setActiveSubMenu] = useState("");

  const onSubmenuClick = useCallback(
    (clickedMenu) => {
      setActiveMenu(clickedMenu === activeMenu ? "" : clickedMenu);
    },
    [activeMenu]
  );

  const onSubmenuCadastroClick = useCallback(
    (clickedMenu) => {
      setActiveMenuCadastros(
        clickedMenu === activeMenuCadastros ? "" : clickedMenu
      );
    },
    [activeMenuCadastros]
  );

  const onSubmenuLancamentoClick = useCallback(
    (clickedMenu) => {
      setActiveSubMenu(clickedMenu === activeSubmenu ? "" : clickedMenu);
    },
    [activeSubmenu]
  );

  // NOTE: essas condicoes consideram apenas codae e terceirizada.
  // Para utilizar esse componente com outros perfis precisa atualizar os
  // criterios de exibicao abaixo
  const exibeMenuValidandoAmbiente = exibirGA();

  const usuarioEscolaEhGestaoDiretaParceira =
    (usuarioEscolaEhGestaoDireta() || usuarioEscolaEhGestaoParceira()) &&
    !["production"].includes(ENVIRONMENT);

  const exibirPainelInicial =
    (!usuarioEhEscolaAbastecimento() || usuarioEscolaEhGestaoDiretaParceira) &&
    !usuarioEhEscolaAbastecimentoDiretor() &&
    (!usuarioComAcessoTelaEntregasDilog() || usuarioEhCODAEGabinete()) &&
    !usuarioEhLogistica() &&
    !usuarioEhEmpresaDistribuidora();
  const exibirGestaoAlimentacao =
    exibeMenuValidandoAmbiente &&
    (usuarioEhCODAEGestaoAlimentacao() ||
      usuarioEhCODAENutriManifestacao() ||
      usuarioEhDRE() ||
      usuarioEhMedicao() ||
      usuarioEhEscolaTerceirizadaDiretor() ||
      usuarioEhEscolaTerceirizada() ||
      usuarioEhEmpresaTerceirizada() ||
      usuarioEhNutricionistaSupervisao() ||
      usuarioEhCODAEGabinete());
  const exibirDietaEspecial =
    usuarioEhCODAEGestaoAlimentacao() ||
    usuarioEhCODAENutriManifestacao() ||
    usuarioEhCODAEDietaEspecial() ||
    usuarioEhNutricionistaSupervisao() ||
    usuarioEhEscolaTerceirizadaDiretor() ||
    usuarioEhEscolaTerceirizada() ||
    usuarioEhDRE() ||
    usuarioEhEmpresaTerceirizada() ||
    usuarioEhMedicao() ||
    usuarioEhCODAEGabinete() ||
    usuarioEscolaEhGestaoDiretaParceira;
  const exibirGestaoProduto =
    usuarioEhCODAEGestaoAlimentacao() ||
    usuarioEhCODAENutriManifestacao() ||
    usuarioEhCODAEGestaoProduto() ||
    usuarioEhCODAEDietaEspecial() ||
    usuarioEhNutricionistaSupervisao() ||
    usuarioEhEscolaTerceirizadaDiretor() ||
    usuarioEhEscolaTerceirizada() ||
    usuarioEhDRE() ||
    usuarioEhEmpresaTerceirizada() ||
    usuarioEhOrgaoFiscalizador() ||
    usuarioEhCODAEGabinete();
  const exibirCadastros =
    usuarioEhCodaeDilog() ||
    usuarioEhMedicao() ||
    usuarioEhDilogQualidadeOuCronograma() ||
    usuarioEhEmpresaFornecedor() ||
    (!exibeMenuValidandoAmbiente && usuarioEhCODAEGestaoAlimentacao()) ||
    (exibeMenuValidandoAmbiente &&
      (usuarioEhCODAEGestaoAlimentacao() ||
        usuarioEhEscolaTerceirizadaDiretor() ||
        usuarioEhEscolaTerceirizada()));
  const exibirRelatorios =
    !usuarioEhEscolaAbastecimento() &&
    !usuarioEhEscolaAbastecimentoDiretor() &&
    !usuarioEhEscolaAbastecimentoDiretor() &&
    !(usuarioComAcessoTelaEntregasDilog() && !usuarioEhCODAEGabinete()) &&
    !usuarioEhLogistica() &&
    !usuarioEhEmpresaDistribuidora() &&
    !usuarioEhEmpresaFornecedor() &&
    !usuarioEscolaEhGestaoDireta() &&
    !usuarioEhMedicao() &&
    !usuarioEhPreRecebimento() &&
    !usuarioEhAdministradorRepresentanteCodae();

  const exibirConfiguracoes =
    !usuarioEhEscolaTerceirizada() &&
    !usuarioEhAdministradorGpCODAE() &&
    !usuarioEhAdministradorNutriSupervisao() &&
    !usuarioEhEscolaAbastecimento() &&
    !usuarioEhOutrosDilog() &&
    !usuarioEhPreRecebimentoSemLogistica() &&
    !usuarioEhQualquerUsuarioEmpresa() &&
    !usuarioEhDilog() &&
    !usuarioEhOrgaoFiscalizador();

  const exibirMenuLogistica =
    usuarioEhLogistica() ||
    usuarioEhEmpresaDistribuidora() ||
    usuarioEhDRE() ||
    usuarioEhEscolaAbastecimento() ||
    usuarioEhEscolaAbastecimentoDiretor() ||
    usuarioComAcessoTelaEntregasDilog() ||
    usuarioEhDilogQualidade() ||
    usuarioEhCODAEGabinete() ||
    usuarioEhDilogDiretoria();

  const exibirMenuPreRecebimento =
    usuarioEhPreRecebimento() ||
    usuarioEhEmpresaFornecedor() ||
    usuarioEhCoordenadorGpCODAE() ||
    usuarioEhCODAEGabinete();

  const exibirMenuRecebimento = usuarioEhRecebimento();

  const _props = {
    activeMenu,
    onSubmenuClick: onSubmenuClick,
    activeMenuCadastros,
    onSubmenuCadastroClick: onSubmenuCadastroClick,
    activeSubmenu,
    onSubmenuLancamentoClick: onSubmenuLancamentoClick,
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
    exibirModuloMedicaoInicial() && (
      <MenuLancamentoInicial key={6} {..._props} />
    ),
    exibirRelatorios && <MenuRelatorios key={8} />,
    exibirMenuLogistica && <MenuLogistica key={7} {..._props} />,
    exibirMenuPreRecebimento && <MenuPreRecebimento key={10} />,
    exibirMenuRecebimento && <MenuRecebimento key={11} />,
    exibirConfiguracoes && <MenuConfiguracoes key={9} {..._props} />,
  ];
};
