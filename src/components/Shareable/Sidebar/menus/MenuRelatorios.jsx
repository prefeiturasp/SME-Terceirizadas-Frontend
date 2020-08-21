import React from "react";
import { Menu, LeafItem } from "./shared";
import {
  usuarioEhCODAEDietaEspecial,
  usuarioEhCODAEGestaoProduto,
  usuarioEhCODAEGestaoAlimentacao,
  usuarioEhNutricionistaSupervisao,
  usuarioEhTerceirizada,
  usuarioEhEscola
} from "helpers/utilities";
import * as constants from "configs/constants";

const MenuRelatorios = () => {
  const exibirProdutosHomologados =
    usuarioEhCODAEGestaoAlimentacao() ||
    usuarioEhNutricionistaSupervisao() ||
    usuarioEhCODAEDietaEspecial();

  const exibirQuantitativoPorTerceirizada = usuarioEhCODAEGestaoProduto();
  const exibirRelatorioAnaliseSensorial =
    usuarioEhTerceirizada() || usuarioEhCODAEGestaoProduto();

  const exibirMenuTodosPerfis =
    usuarioEhCODAEGestaoProduto() ||
    usuarioEhNutricionistaSupervisao() ||
    usuarioEhTerceirizada() ||
    usuarioEhEscola() ||
    usuarioEhCODAEDietaEspecial();

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
          to={`/${
            constants.GESTAO_PRODUTO
          }/relatorios/quantitativo-por-terceirizada`}
        >
          Quantitativo Por Terceirizada
        </LeafItem>
      )}
      {exibirMenuTodosPerfis && (
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
          to={`/${constants.GESTAO_PRODUTO}/${
            constants.RELATORIO_SITUACAO_PRODUTO
          }`}
        >
          Relatório Situação Produto
        </LeafItem>
      )}
    </Menu>
  );
};

export default MenuRelatorios;
