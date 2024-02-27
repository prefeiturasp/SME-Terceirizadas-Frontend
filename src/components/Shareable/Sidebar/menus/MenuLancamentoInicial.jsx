import React from "react";
import { Menu, LeafItem, SubMenu } from "./shared";
import {
  ACOMPANHAMENTO_DE_LANCAMENTOS,
  EMPENHOS,
  LANCAMENTO_INICIAL,
  LANCAMENTO_MEDICAO_INICIAL,
  MEDICAO_INICIAL,
  RELATORIOS,
  RELATORIO_ADESAO,
} from "configs/constants";
import {
  exibirModuloMedicaoInicial,
  usuarioEhEscolaTerceirizadaQualquerPerfil,
  usuarioEhDRE,
  usuarioEhEscolaTerceirizada,
  usuarioEhMedicao,
  usuarioEhCODAEGabinete,
  usuarioEhCODAEGestaoAlimentacao,
  usuarioEhCODAENutriManifestacao,
} from "helpers/utilities";

const MenuLancamentoInicial = ({ activeSubmenu, onSubmenuLancamentoClick }) => {
  const exibeCadastros = usuarioEhMedicao();
  const exibeRelatorios =
    usuarioEhMedicao() || usuarioEhCODAEGestaoAlimentacao();

  return (
    exibirModuloMedicaoInicial() && (
      <Menu
        id="LancamentoInicial"
        icon="fas fa-tachometer-alt"
        title={"Medição Inicial"}
      >
        {(usuarioEhEscolaTerceirizada() ||
          usuarioEhEscolaTerceirizadaQualquerPerfil()) && (
          <LeafItem to={`/${LANCAMENTO_INICIAL}/${LANCAMENTO_MEDICAO_INICIAL}`}>
            Lançamento Medição Inicial
          </LeafItem>
        )}
        {(usuarioEhDRE() ||
          usuarioEhMedicao() ||
          usuarioEhEscolaTerceirizadaQualquerPerfil() ||
          usuarioEhCODAEGestaoAlimentacao() ||
          usuarioEhCODAENutriManifestacao() ||
          usuarioEhCODAEGabinete) && (
          <LeafItem to={`/${MEDICAO_INICIAL}/${ACOMPANHAMENTO_DE_LANCAMENTOS}`}>
            Acompanhamento de Lançamentos
          </LeafItem>
        )}
        {exibeCadastros && (
          <SubMenu
            icon="fa-chevron-down"
            onClick={onSubmenuLancamentoClick}
            title="Cadastros"
            activeMenu={activeSubmenu}
          >
            <LeafItem to={`/${MEDICAO_INICIAL}/${EMPENHOS}`}>Empenhos</LeafItem>
          </SubMenu>
        )}
        {exibeRelatorios && (
          <SubMenu
            path="relatorios"
            icon="fa-chevron-down"
            onClick={onSubmenuLancamentoClick}
            title="Relatórios"
            activeMenu={activeSubmenu}
          >
            <LeafItem
              to={`/${MEDICAO_INICIAL}/${RELATORIOS}/${RELATORIO_ADESAO}`}
            >
              Relatório de Adesão
            </LeafItem>
          </SubMenu>
        )}
      </Menu>
    )
  );
};

export default MenuLancamentoInicial;
