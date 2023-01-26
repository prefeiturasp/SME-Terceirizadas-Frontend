import React, { useState, useCallback } from "react";
import {
  usuarioEhCODAEGestaoAlimentacao,
  usuarioEhCODAENutriManifestacao,
  usuarioEhCODAEDietaEspecial,
  usuarioEhEscolaAbastecimento,
  usuarioEhTerceirizada,
  usuarioEhCODAEGestaoProduto,
  usuarioEhNutricionistaSupervisao,
  usuarioEhDRE,
  usuarioEhAdministradorDRE,
  usuarioEhLogistica,
  usuarioEhPreRecebimento,
  usuarioEhAdministradorGpCODAE,
  usuarioEhAdministradorNutriSupervisao,
  usuarioEhDistribuidora,
  usuarioComAcessoTelaEntregasDilog,
  usuarioEhCoordenadorNutriSupervisao,
  usuarioEscolaEhGestaoDireta,
  usuarioEhMedicao,
  exibirGA,
  usuarioEhDilogQualidadeOuCronograma,
  usuarioEhOutrosDilog,
  usuarioEhPreRecebimentoSemLogistica,
  usuarioEhFornecedor,
  usuarioEhAdministradorRepresentanteCodae,
  usuarioEhEscolaTerceirizada,
  usuarioEhEscolaTerceirizadaDiretor,
  usuarioEhEscolaAbastecimentoDiretor
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
    !usuarioEhEscolaAbastecimento() &&
    !usuarioEhEscolaAbastecimentoDiretor() &&
    !usuarioComAcessoTelaEntregasDilog() &&
    !usuarioEhLogistica() &&
    !usuarioEhDistribuidora();
  const exibirGestaoAlimentacao =
    exibeMenuValidandoAmbiente &&
    (usuarioEhCODAEGestaoAlimentacao() ||
      usuarioEhCODAENutriManifestacao() ||
      usuarioEhDRE() ||
      usuarioEhMedicao() ||
      usuarioEhEscolaTerceirizadaDiretor() ||
      usuarioEhEscolaTerceirizada() ||
      usuarioEhTerceirizada() ||
      usuarioEhNutricionistaSupervisao());
  const exibirDietaEspecial =
    usuarioEhCODAEGestaoAlimentacao() ||
    usuarioEhCODAENutriManifestacao() ||
    usuarioEhCODAEDietaEspecial() ||
    usuarioEhNutricionistaSupervisao() ||
    usuarioEhEscolaTerceirizadaDiretor() ||
    usuarioEhEscolaTerceirizada() ||
    usuarioEhDRE() ||
    usuarioEhTerceirizada() ||
    usuarioEhMedicao();
  const exibirGestaoProduto =
    usuarioEhCODAEGestaoAlimentacao() ||
    usuarioEhCODAENutriManifestacao() ||
    usuarioEhCODAEGestaoProduto() ||
    usuarioEhCODAEDietaEspecial() ||
    usuarioEhNutricionistaSupervisao() ||
    usuarioEhEscolaTerceirizadaDiretor() ||
    usuarioEhEscolaTerceirizada() ||
    usuarioEhDRE() ||
    usuarioEhTerceirizada();
  const exibirLancamentoInicial =
    exibeMenuValidandoAmbiente &&
    (usuarioEhEscolaTerceirizadaDiretor() ||
      usuarioEhEscolaTerceirizada() ||
      usuarioEhMedicao());
  const exibirCadastros =
    usuarioEhLogistica() ||
    usuarioEhMedicao() ||
    usuarioEhDilogQualidadeOuCronograma() ||
    (!exibeMenuValidandoAmbiente && usuarioEhCODAEGestaoAlimentacao()) ||
    (exibeMenuValidandoAmbiente &&
      (usuarioEhCODAEGestaoAlimentacao() ||
        usuarioEhEscolaTerceirizadaDiretor() ||
        usuarioEhEscolaTerceirizada()));
  const exibirRelatorios =
    !usuarioEhEscolaAbastecimento() &&
    !usuarioEhEscolaAbastecimentoDiretor() &&
    !usuarioEhEscolaAbastecimentoDiretor() &&
    !usuarioComAcessoTelaEntregasDilog() &&
    !usuarioEhLogistica() &&
    !usuarioEhDistribuidora() &&
    !usuarioEhFornecedor() &&
    !usuarioEscolaEhGestaoDireta() &&
    !usuarioEhMedicao() &&
    !usuarioEhPreRecebimento() &&
    !usuarioEhAdministradorRepresentanteCodae();

  const exibirConfiguracoes =
    !usuarioEhEscolaTerceirizada() &&
    !usuarioEhAdministradorGpCODAE() &&
    !usuarioEhAdministradorNutriSupervisao() &&
    !usuarioEhAdministradorDRE() &&
    !usuarioEhEscolaAbastecimento() &&
    !usuarioEhOutrosDilog() &&
    !usuarioEhPreRecebimentoSemLogistica();

  const exibirMenuLogistica =
    usuarioEhLogistica() ||
    usuarioEhDistribuidora() ||
    usuarioEhDRE() ||
    usuarioEhEscolaAbastecimento() ||
    usuarioEhEscolaAbastecimentoDiretor() ||
    usuarioEhCoordenadorNutriSupervisao() ||
    usuarioComAcessoTelaEntregasDilog();

  const exibirMenuPreRecebimento =
    usuarioEhPreRecebimento() || usuarioEhFornecedor();

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
    exibirConfiguracoes && <MenuConfiguracoes key={9} {..._props} />,
    exibirMenuPreRecebimento && <MenuPreRecebimento key={10} />
  ];
};
