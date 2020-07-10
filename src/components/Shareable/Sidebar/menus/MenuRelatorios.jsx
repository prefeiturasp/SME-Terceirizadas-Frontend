import React from "react";
import { Menu, LeafItem } from "./shared";
import { PERFIL } from "constants/shared";
import * as constants from "configs/constants";

const MenuRelatorios = () => {
  const exibirProdutosHomologados = [
    PERFIL.COORDENADOR_GESTAO_ALIMENTACAO_TERCEIRIZADA,
    PERFIL.COORDENADOR_DIETA_ESPECIAL,
    PERFIL.ADMINISTRADOR_GESTAO_ALIMENTACAO_TERCEIRIZADA
  ];

  const exibirQuantitativoPorTerceirizada = [
    PERFIL.COORDENADOR_GESTAO_ALIMENTACAO_TERCEIRIZADA,
    PERFIL.ADMINISTRADOR_GESTAO_ALIMENTACAO_TERCEIRIZADA,
    PERFIL.ADMINISTRADOR_GESTAO_PRODUTO,
    PERFIL.COORDENADOR_GESTAO_PRODUTO
  ];

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
