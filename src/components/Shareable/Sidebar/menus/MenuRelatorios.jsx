import React from "react";
import { Menu, LeafItem } from "./shared";
import {
  usuarioEhCODAEDietaEspecial,
  usuarioEhCODAEGabinete,
  usuarioEhCODAEGestaoProduto,
  usuarioEhCODAEGestaoAlimentacao,
  usuarioEhCODAENutriManifestacao,
  usuarioEhNutricionistaSupervisao,
  usuarioEhEmpresaTerceirizada,
  usuarioEhEscolaTerceirizadaDiretor,
  usuarioEhEscolaTerceirizada,
  usuarioEhDRE,
  usuarioEhOrgaoFiscalizador,
  usuarioEhCoordenadorNutriSupervisao,
  usuarioEhAdmQualquerEmpresa,
} from "helpers/utilities";
import * as constants from "configs/constants";

const MenuRelatorios = () => {
  const exibirProdutosHomologados =
    usuarioEhCODAEDietaEspecial() ||
    usuarioEhCODAEGestaoAlimentacao() ||
    usuarioEhCODAEGestaoProduto() ||
    usuarioEhEscolaTerceirizada() ||
    usuarioEhEscolaTerceirizadaDiretor() ||
    usuarioEhNutricionistaSupervisao() ||
    usuarioEhEmpresaTerceirizada() ||
    usuarioEhCODAENutriManifestacao() ||
    usuarioEhDRE() ||
    usuarioEhOrgaoFiscalizador() ||
    usuarioEhCODAEGabinete();

  const exibirQuantitativoPorTerceirizada = usuarioEhCODAEGestaoProduto();
  const exibirRelatorioAnaliseSensorial =
    usuarioEhEmpresaTerceirizada() || usuarioEhCODAEGestaoProduto();

  const exibirMenuTodosPerfis =
    usuarioEhCODAEGestaoProduto() ||
    usuarioEhNutricionistaSupervisao() ||
    usuarioEhEmpresaTerceirizada() ||
    usuarioEhEscolaTerceirizada() ||
    usuarioEhEscolaTerceirizadaDiretor() ||
    usuarioEhCODAEDietaEspecial() ||
    usuarioEhCODAENutriManifestacao() ||
    usuarioEhCODAEGestaoAlimentacao() ||
    usuarioEhDRE() ||
    usuarioEhOrgaoFiscalizador() ||
    usuarioEhCODAEGabinete();

  const exibirProdutosSuspensos =
    usuarioEhCODAEGestaoProduto() ||
    usuarioEhNutricionistaSupervisao() ||
    usuarioEhEmpresaTerceirizada() ||
    usuarioEhDRE() ||
    usuarioEhEscolaTerceirizada() ||
    usuarioEhEscolaTerceirizadaDiretor() ||
    usuarioEhCODAEDietaEspecial() ||
    usuarioEhCODAENutriManifestacao() ||
    usuarioEhCODAEGestaoAlimentacao() ||
    usuarioEhOrgaoFiscalizador() ||
    usuarioEhCODAEGabinete();

  const exibirRelatorioQuantitativoSolicDietaEsp =
    usuarioEhCODAEDietaEspecial() ||
    usuarioEhNutricionistaSupervisao() ||
    usuarioEhDRE() ||
    usuarioEhEscolaTerceirizada() ||
    usuarioEhEscolaTerceirizadaDiretor();

  const exibirRelatorioControleRestos = usuarioEhCoordenadorNutriSupervisao();

  const exibirRelatorioControleSobras = usuarioEhAdmQualquerEmpresa();

  return (
    <Menu id="Relatorios" icon="fa-file-alt" title={"Relatórios"}>
      {exibirProdutosHomologados && (
        <LeafItem
          to={`/${constants.GESTAO_PRODUTO}/relatorios/produtos-homologados`}
        >
          Produtos Homologados
        </LeafItem>
      )}
      {exibirQuantitativoPorTerceirizada && (
        <LeafItem
          to={`/${constants.GESTAO_PRODUTO}/relatorios/quantitativo-por-terceirizada`}
        >
          Quantitativo Por Terceirizada
        </LeafItem>
      )}
      {exibirProdutosSuspensos && (
        <LeafItem
          to={`/${constants.GESTAO_PRODUTO}/relatorio-produtos-suspensos`}
        >
          Produtos suspensos
        </LeafItem>
      )}

      {exibirRelatorioAnaliseSensorial && (
        <LeafItem
          to={`/${constants.GESTAO_PRODUTO}/relatorio-analise-sensorial`}
        >
          Produtos em a. sensorial
        </LeafItem>
      )}

      {exibirMenuTodosPerfis && (
        <LeafItem
          to={`/${constants.GESTAO_PRODUTO}/${constants.RELATORIO_RECLAMACAO_PRODUTO}`}
        >
          Relatório de reclamação de produto
        </LeafItem>
      )}
      {exibirRelatorioQuantitativoSolicDietaEsp && (
        <LeafItem
          to={`/${constants.DIETA_ESPECIAL}/${constants.RELATORIO_QUANTITATIVO_SOLIC_DIETA_ESP}`}
        >
          Relatório quant. solic. dieta esp.
        </LeafItem>
      )}
      {exibirRelatorioQuantitativoSolicDietaEsp && (
        <LeafItem
          to={`/${constants.DIETA_ESPECIAL}/${constants.RELATORIO_QUANTITATIVO_DIAG_DIETA_ESP}`}
        >
          Relatório quant. diag. dieta esp.
        </LeafItem>
      )}
      {exibirRelatorioQuantitativoSolicDietaEsp && (
        <LeafItem
          to={`/${constants.DIETA_ESPECIAL}/${constants.RELATORIO_QUANTITATIVO_CLASSIFICACAO_DIETA_ESP}`}
        >
          Relatório quant. class. dieta esp.
        </LeafItem>
      )}
      {(exibirRelatorioQuantitativoSolicDietaEsp ||
        usuarioEhCODAENutriManifestacao()) && (
        <LeafItem
          to={`/${constants.DIETA_ESPECIAL}/${constants.RELATORIO_GESTAO_DIETA_ESPECIAL}`}
        >
          Relatório de gestão de dieta esp.
        </LeafItem>
      )}
      {exibirRelatorioControleRestos && (
        <LeafItem
          to={`/${constants.CONTROLE_RESTOS}/${constants.RELATORIO_CONTROLE_RESTOS}`}
        >
          Relatório de Restos
        </LeafItem>
      )}
      {exibirRelatorioControleSobras && (
        <LeafItem
          to={`/${constants.CONTROLE_SOBRAS}/${constants.RELATORIO_CONTROLE_SOBRAS}`}
        >
          Relatório de Sobras
        </LeafItem>
      )}
    </Menu>
  );
};

export default MenuRelatorios;
