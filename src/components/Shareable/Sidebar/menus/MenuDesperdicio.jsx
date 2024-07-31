import React from "react";
import { Menu, SubMenu, LeafItem } from "./shared";
import {
  DESPERDICIO,
  CONTROLE_SOBRAS,
  CONTROLE_RESTOS,
  CADASTROS,
  TIPOS_RECIPIENTE,
  TIPOS_ALIMENTO,
  PARAMETROS_CLASSIFICACAO,
  RELATORIOS,
  RELATORIO_CONTROLE_RESTOS,
  RELATORIO_CONTROLE_SOBRAS,
  RELATORIO_CONTROLE_SOBRAS_BRUTO,
} from "configs/constants";
import {
  usuarioEhNutricionistaSupervisao,
  usuarioEhAdmQualquerEmpresa,
  usuarioEhCoordenadorNutriSupervisao,
} from "helpers/utilities";

const MenuDesperdicio = ({ activeMenu, onSubmenuClick }) => {
  const exibirCadastros = usuarioEhCoordenadorNutriSupervisao();

  const exibirRelatoriosRestos = usuarioEhCoordenadorNutriSupervisao();
  const exibirRelatoriosSobras =
    usuarioEhAdmQualquerEmpresa() || usuarioEhCoordenadorNutriSupervisao();
  const exibirRelatorios = exibirRelatoriosRestos || exibirRelatoriosSobras;

  return (
    <Menu id="desperdicio" icon="fas fa-recycle" title={"Desperdicio"}>
      {usuarioEhAdmQualquerEmpresa() && (
        <LeafItem to={`/${DESPERDICIO}/${CONTROLE_SOBRAS}`}>
          Controle de Sobras
        </LeafItem>
      )}
      {usuarioEhNutricionistaSupervisao() && (
        <LeafItem to={`/${DESPERDICIO}/${CONTROLE_RESTOS}`}>
          Controle de Restos
        </LeafItem>
      )}

      {exibirRelatorios && (
        <SubMenu
          icon="fa-chevron-down"
          path="relatorios"
          onClick={onSubmenuClick}
          title="Relatórios"
          activeMenu={activeMenu}
        >
          {exibirRelatoriosRestos && (
            <LeafItem
              to={`/${DESPERDICIO}/${RELATORIOS}/${RELATORIO_CONTROLE_RESTOS}`}
            >
              Relatório de Restos
            </LeafItem>
          )}
          {exibirRelatoriosSobras && (
            <>
              <LeafItem
                to={`/${DESPERDICIO}/${RELATORIOS}/${RELATORIO_CONTROLE_SOBRAS}`}
              >
                Relatório de Sobras
              </LeafItem>
              <LeafItem
                to={`/${DESPERDICIO}/${RELATORIOS}/${RELATORIO_CONTROLE_SOBRAS_BRUTO}`}
              >
                Relatório de Sobras - Bruto
              </LeafItem>
            </>
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
          <LeafItem
            to={`/${DESPERDICIO}/${CADASTROS}/${PARAMETROS_CLASSIFICACAO}`}
          >
            Parâmetros de Classificação
          </LeafItem>
        </SubMenu>
      )}
    </Menu>
  );
};

export default MenuDesperdicio;
