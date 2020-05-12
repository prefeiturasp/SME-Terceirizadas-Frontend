import React from "react";
import { Menu, LeafItem } from "./shared";
import { CONFIGURACOES, PERMISSOES, MENSAGEM } from "configs/constants";
import {
  usuarioEhCODAEDietaEspecial,
  usuarioEhCODAEGestaoProduto
} from "helpers/utilities";

const MenuConfiguracoes = () => {
  const exibirPermissoes =
    usuarioEhCODAEGestaoProduto() || usuarioEhCODAEDietaEspecial();
  return (
    <Menu id="Configuracoes" icon="fa-cog" title={"Configurações"}>
      {exibirPermissoes && (
        <LeafItem to={`/${CONFIGURACOES}/${PERMISSOES}`}>Permissões</LeafItem>
      )}

      <LeafItem to={`/${CONFIGURACOES}`}>Disparo de E-mail</LeafItem>
      <LeafItem to={`/${CONFIGURACOES}/${MENSAGEM}`}>
        Configuração de Mensagem
      </LeafItem>
    </Menu>
  );
};

export default MenuConfiguracoes;
