import React from "react";
import { Menu, SubMenu, LeafItem } from "./shared";
import {
  PAINEL_GESTAO_PRODUTO,
  GESTAO_PRODUTO,
  PESQUISA_DESENVOLVIMENTO
} from "configs/constants";
import { listarCardsPermitidos } from "helpers/gestaoDeProdutos";
import { usuarioEhTerceirizada } from "helpers/utilities";

const MenuGestaoDeAlimentacao = ({ activeMenu, onSubmenuClick }) => {
  const menuItems = listarCardsPermitidos();
  const exibirBusca = true;
  const exibirCadastro = usuarioEhTerceirizada();
  return (
    <Menu id="GestaoProduto" icon="fa-atom" title={"Gestão de Produto"}>
      <LeafItem to={`/${PAINEL_GESTAO_PRODUTO}`}>
        Painel de Solicitações
      </LeafItem>
      {exibirCadastro && (
        <LeafItem to={`/${PESQUISA_DESENVOLVIMENTO}/produto`}>
          Cadastro de Produto
        </LeafItem>
      )}
      {exibirBusca && (
        <LeafItem to={`/${PESQUISA_DESENVOLVIMENTO}/busca-produto`}>
          Busca de Produto
        </LeafItem>
      )}
      <SubMenu
        icon="fa-chevron-down"
        path="consulta-solicitacoes-gp"
        onClick={onSubmenuClick}
        title="Consulta de Solicitações"
        activeMenu={activeMenu}
      >
        {menuItems.map((item, index) => (
          <LeafItem key={index} to={`/${GESTAO_PRODUTO}/${item.rota}`}>
            {item.titulo_menu || item.titulo}
          </LeafItem>
        ))}
      </SubMenu>
    </Menu>
  );
};

export default MenuGestaoDeAlimentacao;
