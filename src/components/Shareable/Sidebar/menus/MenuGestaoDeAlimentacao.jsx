import React from "react";
import { Menu, SubMenu, LeafItem } from "./shared";
import {
  CODAE,
  SOLICITACOES_AUTORIZADAS,
  SOLICITACOES_PENDENTES,
  SOLICITACOES_NEGADAS,
  SOLICITACOES_CANCELADAS,
  ESCOLA,
  INCLUSAO_ALIMENTACAO,
  ALTERACAO_CARDAPIO,
  SOLICITACAO_KIT_LANCHE,
  INVERSAO_CARDAPIO,
  SUSPENSAO_ALIMENTACAO
} from "configs/constants";
import { usuarioEhEscola } from "helpers/utilities";

const MenuGestaoDeAlimentacao = ({ activeMenu, onSubmenuClick }) => {
  const exibeMenuNovasSolicitacoes = usuarioEhEscola();
  return (
    <Menu
      id="GestaoAlimentacao"
      icon="fa-utensils"
      title={"Gestão de Alimentação"}
    >
      <LeafItem to="/">Painel de Solicitações</LeafItem>
      {exibeMenuNovasSolicitacoes && (
        <SubMenu
          icon="fa-chevron-down"
          path="novas-solicitacoes"
          onClick={onSubmenuClick}
          title="Novas Solicitações"
          activeMenu={activeMenu}
        >
          <LeafItem to={`/${ESCOLA}/${INCLUSAO_ALIMENTACAO}`}>
            Inclusão de Alimentação
          </LeafItem>
          <LeafItem to={`/${ESCOLA}/${ALTERACAO_CARDAPIO}`}>
            Alteração de Cardápio
          </LeafItem>
          <LeafItem to={`/${ESCOLA}/${SOLICITACAO_KIT_LANCHE}`}>
            Kit Lanche Passeio
          </LeafItem>
          <LeafItem to={`/${ESCOLA}/${INVERSAO_CARDAPIO}`}>
            Inversão de Dia de Cardápio
          </LeafItem>
          <LeafItem to={`/${ESCOLA}/${SUSPENSAO_ALIMENTACAO}`}>
            Suspensão de Alimentação
          </LeafItem>
        </SubMenu>
      )}
      <SubMenu
        icon="fa-chevron-down"
        path="consulta-solicitacoes"
        onClick={onSubmenuClick}
        title="Consulta de Solicitações"
        activeMenu={activeMenu}
      >
        <LeafItem to={`/${CODAE}/${SOLICITACOES_PENDENTES}`}>
          Aguardando autorização
        </LeafItem>
        <LeafItem to={`/${CODAE}/${SOLICITACOES_AUTORIZADAS}`}>
          Autorizadas
        </LeafItem>
        <LeafItem to={`/${CODAE}/${SOLICITACOES_NEGADAS}`}>Negadas</LeafItem>
        <LeafItem to={`/${CODAE}/${SOLICITACOES_CANCELADAS}`}>
          Canceladas
        </LeafItem>
      </SubMenu>
    </Menu>
  );
};

export default MenuGestaoDeAlimentacao;
