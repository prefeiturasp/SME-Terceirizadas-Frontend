import React from "react";
import { Menu, SubMenu, LeafItem } from "./shared";
import {
  DESPERDICIO,
  CONTROLE_SOBRAS,
  CONTROLE_RESTOS,
  CADASTROS,
  TIPOS_RECIPIENTE,
  TIPOS_ALIMENTO
} from "configs/constants";
import {
  usuarioEhNutricionistaSupervisao,
  usuarioEhAdmQualquerEmpresa,
  usuarioEhCoordenadorNutriSupervisao,
} from "helpers/utilities";
import * as constants from "configs/constants";

const MenuDesperdicio = ({ activeMenu, onSubmenuClick }) => {

  const exibirCadastros = usuarioEhCoordenadorNutriSupervisao();

  const exibirRelatorios = 
    usuarioEhCoordenadorNutriSupervisao() || 
    usuarioEhAdmQualquerEmpresa();

  return (
    <Menu
      id="desperdicio"
      icon="fas fa-recycle"
      title={"Desperdicio"}
    >
      {usuarioEhAdmQualquerEmpresa() && (
        <LeafItem to={`/${CONTROLE_SOBRAS}`}>Controle de Sobras</LeafItem>
      )}
      {usuarioEhNutricionistaSupervisao() && (
        <LeafItem to={`/${CONTROLE_RESTOS}`}>Controle de Restos</LeafItem>
      )}

      {exibirRelatorios && (
        <SubMenu
          icon="fa-chevron-down"
          path="relatorios"
          onClick={onSubmenuClick}
          title="Relatórios"
          activeMenu={activeMenu}
        >
          {usuarioEhCoordenadorNutriSupervisao() && (
            <LeafItem
              to={`/${constants.CONTROLE_RESTOS}/${constants.RELATORIO_CONTROLE_RESTOS}`}
            >
              Relatório de Restos
            </LeafItem>
          )}
          {usuarioEhAdmQualquerEmpresa() && (
            <LeafItem
              to={`/${constants.CONTROLE_SOBRAS}/${constants.RELATORIO_CONTROLE_SOBRAS}`}
            >
              Relatório de Sobras
            </LeafItem>
          )}
        </SubMenu>
      )}

      {exibirCadastros && (
        <SubMenu
          icon="fa-chevron-down"
          onClick={onSubmenuClick}
          title="Cadastros"
          activeMenu={activeMenu}
        >
          <LeafItem to={`/${DESPERDICIO}/${CADASTROS}/${TIPOS_RECIPIENTE}`}>
            Tipos de Recipiente
          </LeafItem>
          <LeafItem to={`/${DESPERDICIO}/${CADASTROS}/${TIPOS_ALIMENTO}`}>
            Tipos de Alimento
          </LeafItem>
        </SubMenu>
      )}


    </Menu>
  );
};

export default MenuDesperdicio;
