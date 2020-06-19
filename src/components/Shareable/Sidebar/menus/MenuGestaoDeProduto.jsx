import React from "react";
import { Menu, SubMenu, LeafItem } from "./shared";
import {
  PAINEL_GESTAO_PRODUTO,
  GESTAO_PRODUTO,
  PESQUISA_DESENVOLVIMENTO,
  RECLAMACAO_DE_PRODUTO,
  AVALIAR_RECLAMACAO_PRODUTO,
  ATIVACAO_DE_PRODUTO
} from "configs/constants";
import { listarCardsPermitidos } from "helpers/gestaoDeProdutos";
import {
  usuarioEhEscola,
  usuarioEhTerceirizada,
  usuarioEhCODAEGestaoProduto
} from "helpers/utilities";

const MenuGestaoDeAlimentacao = ({ activeMenu, onSubmenuClick }) => {
  const menuItems = listarCardsPermitidos();
  const exibirBusca = true;
  const exibirCadastro = usuarioEhTerceirizada();
  const exibirAvaliarReclamacao = usuarioEhCODAEGestaoProduto();
  const exibirReclamacao = usuarioEhCODAEGestaoProduto() || usuarioEhEscola();
  const exibirAtivacao = usuarioEhCODAEGestaoProduto();

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
          Consulta de Produto
        </LeafItem>
      )}
      {exibirReclamacao && (
        <LeafItem to={`/${GESTAO_PRODUTO}/${RECLAMACAO_DE_PRODUTO}`}>
          Reclamação de Produto
        </LeafItem>
      )}
      {exibirAvaliarReclamacao && (
        <LeafItem to={`/${GESTAO_PRODUTO}/${AVALIAR_RECLAMACAO_PRODUTO}`}>
          Avaliar Reclamação de Produto
        </LeafItem>
      )}
      {exibirAtivacao && (
        <LeafItem to={`/${GESTAO_PRODUTO}/${ATIVACAO_DE_PRODUTO}/consulta`}>
          Suspensão/Ativação do Produto
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
