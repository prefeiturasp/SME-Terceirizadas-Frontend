import React from "react";
import { Menu, LeafItem } from "./shared";
import { CONFIGURACOES, PERMISSOES, MENSAGEM } from "configs/constants";
import { PERFIL } from "constants/shared";

const MenuConfiguracoes = () => {
  const exibirPermissoes = [
    PERFIL.COORDENADOR_GESTAO_ALIMENTACAO_TERCEIRIZADA,
    PERFIL.COORDENADOR_DIETA_ESPECIAL,
    PERFIL.ADMINISTRADOR_ESCOLA,
    PERFIL.NUTRI_ADMIN_RESPONSAVEL // NOTE: terceirizada@admin.com
  ].includes(localStorage.getItem("perfil"));

  const exibirConfigEmail = [
    PERFIL.COORDENADOR_GESTAO_ALIMENTACAO_TERCEIRIZADA,
    PERFIL.COORDENADOR_DIETA_ESPECIAL,
    PERFIL.ADMINISTRADOR_GESTAO_ALIMENTACAO_TERCEIRIZADA
  ];

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
    </Menu>
  );
};

export default MenuConfiguracoes;
