import React from "react";
import { Menu, LeafItem, SubMenu } from "./shared";
import {
  CONFIGURACOES,
  MENSAGEM,
  GERENCIAMENTO_EMAILS,
  GESTAO_ACESSO_CODAE_DILOG,
  GESTAO_ACESSO_DIRETOR_ESCOLA,
  CARGAS_USUARIOS,
  GESTAO_ACESSO_EMPRESA,
  GESTAO_ACESSO_GERAL,
  GESTAO_ACESSO_COGESTOR,
  GESTAO_ACESSO_MASTER,
  CARGAS_USUARIOS_SERVIDORES
} from "configs/constants";
import {
  usuarioEhCODAEGestaoAlimentacao,
  usuarioEhCODAEDietaEspecial,
  usuarioEhDiretorEscola,
  usuarioEhEmpresaTerceirizada,
  usuarioEhCoordenadorNutriSupervisao,
  usuarioEhCoordenadorGpCODAE,
  usuarioEhCoordenadorNutriCODAE,
  usuarioEhCoordenadorCODAE,
  usuarioEhAdministradorRepresentanteCodae,
  usuarioEhAdmQualquerEmpresa,
  usuarioEhCogestorDRE,
  usuarioEhCodaeDilog,
  usuarioEhDilog
} from "helpers/utilities";

const MenuConfiguracoes = ({ activeMenu, onSubmenuClick }) => {
  const exibirConfigEmail =
    usuarioEhCODAEGestaoAlimentacao() ||
    usuarioEhCODAEDietaEspecial() ||
    usuarioEhEmpresaTerceirizada();
  const exibirGerenciamentoEmails =
    usuarioEhCODAEGestaoAlimentacao() ||
    usuarioEhCODAEDietaEspecial() ||
    usuarioEhCoordenadorGpCODAE();

  const exibirGestaoUsuarioCODAE =
    usuarioEhCodaeDilog() ||
    usuarioEhCoordenadorCODAE() ||
    usuarioEhAdministradorRepresentanteCodae();

  const exibirGestaoAcesso =
    usuarioEhCoordenadorNutriCODAE() ||
    usuarioEhCoordenadorGpCODAE() ||
    usuarioEhCoordenadorNutriSupervisao();

  return (
    <Menu id="Configuracoes" icon="fa-cog" title={"Configurações"}>
      {exibirConfigEmail && (
        <>
          <LeafItem to={`/${CONFIGURACOES}`}>Disparo de E-mail</LeafItem>
          <LeafItem to={`/${CONFIGURACOES}/${MENSAGEM}`}>
            Configuração de Mensagem
          </LeafItem>
        </>
      )}
      {exibirGerenciamentoEmails && (
        <LeafItem to={`/${CONFIGURACOES}/${GERENCIAMENTO_EMAILS}`}>
          Gerenciamento de E-mails
        </LeafItem>
      )}

      {usuarioEhDilog() && (
        <SubMenu
          icon="fa-chevron-down"
          onClick={onSubmenuClick}
          title="Gestão de Usuários"
          activeMenu={activeMenu}
        >
          <LeafItem to={`/${CONFIGURACOES}/${GESTAO_ACESSO_MASTER}/`}>
            Gestão de Acesso
          </LeafItem>
          <LeafItem to={`/${CONFIGURACOES}/${CARGAS_USUARIOS}/`}>
            Cargas de Usuários
          </LeafItem>
        </SubMenu>
      )}

      {exibirGestaoUsuarioCODAE && (
        <SubMenu
          icon="fa-chevron-down"
          onClick={onSubmenuClick}
          title="Gestão de Usuários"
          activeMenu={activeMenu}
        >
          <LeafItem to={`/${CONFIGURACOES}/${GESTAO_ACESSO_CODAE_DILOG}/`}>
            Gestão de Acesso
          </LeafItem>
          <LeafItem to={`/${CONFIGURACOES}/${CARGAS_USUARIOS_SERVIDORES}/`}>
            Cargas de Usuários
          </LeafItem>
        </SubMenu>
      )}

      {usuarioEhDiretorEscola() && (
        <SubMenu
          icon="fa-chevron-down"
          onClick={onSubmenuClick}
          title="Gestão de Usuários"
          activeMenu={activeMenu}
        >
          <LeafItem to={`/${CONFIGURACOES}/${GESTAO_ACESSO_DIRETOR_ESCOLA}/`}>
            Gestão de Acesso
          </LeafItem>
        </SubMenu>
      )}

      {usuarioEhCogestorDRE() && (
        <SubMenu
          icon="fa-chevron-down"
          onClick={onSubmenuClick}
          title="Gestão de Usuários"
          activeMenu={activeMenu}
        >
          <LeafItem to={`/${CONFIGURACOES}/${GESTAO_ACESSO_COGESTOR}/`}>
            Gestão de Acesso
          </LeafItem>
        </SubMenu>
      )}

      {usuarioEhAdmQualquerEmpresa() && (
        <SubMenu
          icon="fa-chevron-down"
          onClick={onSubmenuClick}
          title="Gestão de Usuários"
          activeMenu={activeMenu}
        >
          <LeafItem to={`/${CONFIGURACOES}/${GESTAO_ACESSO_EMPRESA}/`}>
            Gestão de Acesso
          </LeafItem>
        </SubMenu>
      )}

      {exibirGestaoAcesso && (
        <SubMenu
          icon="fa-chevron-down"
          onClick={onSubmenuClick}
          title="Gestão de Usuários"
          activeMenu={activeMenu}
        >
          <LeafItem to={`/${CONFIGURACOES}/${GESTAO_ACESSO_GERAL}/`}>
            Gestão de Acesso
          </LeafItem>
        </SubMenu>
      )}
    </Menu>
  );
};

export default MenuConfiguracoes;
