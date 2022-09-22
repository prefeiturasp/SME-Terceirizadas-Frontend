import React from "react";
import { Menu, LeafItem, SubMenu } from "./shared";
import {
  CONFIGURACOES,
  PERMISSOES,
  MENSAGEM,
  GESTAO_ACESSO
} from "configs/constants";
import {
  usuarioEhCODAEGestaoAlimentacao,
  usuarioEhCODAEDietaEspecial,
  usuarioEhTerceirizada,
  usuarioEhCoordenadorNutriSupervisao,
  usuarioEhDRE,
  usuarioEhCoordenadorEscola,
  usuarioEhCoordenadorGpCODAE,
  usuarioEhCoordenadorNutriCODAE,
  usuarioEhCoordenadorCODAE,
  usuarioEhLogistica
} from "helpers/utilities";

const MenuConfiguracoes = ({ activeMenu, onSubmenuClick }) => {
  const exibirPermissoes =
    usuarioEhCoordenadorNutriCODAE() ||
    usuarioEhCoordenadorGpCODAE() ||
    usuarioEhCoordenadorCODAE() ||
    usuarioEhDRE() ||
    usuarioEhCoordenadorEscola() ||
    usuarioEhCoordenadorNutriSupervisao() ||
    usuarioEhTerceirizada();
  const exibirConfigEmail =
    usuarioEhCODAEGestaoAlimentacao() ||
    usuarioEhCODAEDietaEspecial() ||
    usuarioEhTerceirizada();

  const exibirGestaoUsuario =
    usuarioEhLogistica() || usuarioEhCoordenadorCODAE();

  return (
    <Menu id="Configuracoes" icon="fa-cog" title={"Configurações"}>
      {exibirPermissoes && (
        <LeafItem to={`/${CONFIGURACOES}/${PERMISSOES}`}>Permissões</LeafItem>
      )}

      {exibirConfigEmail && (
        <>
          <LeafItem to={`/${CONFIGURACOES}`}>Disparo de E-mail</LeafItem>
          <LeafItem to={`/${CONFIGURACOES}/${MENSAGEM}`}>
            Configuração de Mensagem
          </LeafItem>
        </>
      )}

      {exibirGestaoUsuario && (
        <SubMenu
          icon="fa-chevron-down"
          onClick={onSubmenuClick}
          title="Gestão de Usuários"
          activeMenu={activeMenu}
        >
          <LeafItem to={`/${CONFIGURACOES}/${GESTAO_ACESSO}/`}>
            Gestão de Acesso
          </LeafItem>
        </SubMenu>
      )}
    </Menu>
  );
};

export default MenuConfiguracoes;
