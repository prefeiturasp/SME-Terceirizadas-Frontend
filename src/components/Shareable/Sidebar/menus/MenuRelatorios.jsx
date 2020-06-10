import React from "react";
import { Menu, LeafItem } from "./shared";
import { PERFIL } from "constants/shared";
import { RELATORIOS } from "configs/constants";

const MenuRelatorios = () => {
  const exibirProdutosHomologados = [
    PERFIL.COORDENADOR_GESTAO_ALIMENTACAO_TERCEIRIZADA,
    PERFIL.COORDENADOR_DIETA_ESPECIAL,
    PERFIL.ADMINISTRADOR_GESTAO_ALIMENTACAO_TERCEIRIZADA
  ];

  return (
    <Menu id="Relatorios" icon="fa-file-alt" title={"Relatórios"}>
      <LeafItem to={`/${RELATORIOS}/`}>Relatórios</LeafItem>,
      {exibirProdutosHomologados && (
        <LeafItem to={`/relatorio-produtos-homologados`}>
          Produtos Homologados
        </LeafItem>
      )}
    </Menu>
  );
};

export default MenuRelatorios;
