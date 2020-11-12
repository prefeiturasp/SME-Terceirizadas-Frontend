import React from "react";
import { Menu, LeafItem } from "./shared";
import { CONFIGURACOES, PERMISSOES, MENSAGEM } from "configs/constants";
import {
  usuarioEhCODAEGestaoAlimentacao,
  usuarioEhCODAEDietaEspecial,
  usuarioEhTerceirizada,
  usuarioEhNutricionistaSupervisao,
  usuarioEhDRE,
  usuarioEhCODAEGestaoProduto,
  usuarioEhCoordenadorEscola
} from "helpers/utilities";

const MenuConfiguracoes = () => {
  const exibirPermissoes =
    usuarioEhCODAEDietaEspecial() ||
    usuarioEhCODAEGestaoAlimentacao() ||
    usuarioEhCODAEGestaoProduto() ||
    usuarioEhDRE() ||
    usuarioEhCoordenadorEscola() ||
    usuarioEhNutricionistaSupervisao() ||
    usuarioEhTerceirizada();
  const exibirConfigEmail =
    usuarioEhCODAEGestaoAlimentacao() ||
    usuarioEhCODAEDietaEspecial() ||
    usuarioEhTerceirizada();

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
