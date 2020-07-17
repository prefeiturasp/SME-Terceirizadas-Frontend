import React from "react";
import { Menu, LeafItem } from "./shared";
import {
  usuarioEhCODAEDietaEspecial,
  usuarioEhCODAEGestaoProduto,
  usuarioEhCODAEGestaoAlimentacao,
  usuarioEhNutricionistaSupervisao
} from "helpers/utilities";
import * as constants from "configs/constants";

const MenuRelatorios = () => {
  const exibirProdutosHomologados =
    usuarioEhCODAEGestaoAlimentacao() ||
    usuarioEhNutricionistaSupervisao() ||
    usuarioEhCODAEDietaEspecial();

  const exibirQuantitativoPorTerceirizada = usuarioEhCODAEGestaoProduto();

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
    </Menu>
  );
};

export default MenuRelatorios;
