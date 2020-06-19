import React from "react";
import Breadcrumb from "components/Shareable/Breadcrumb";
import ReclamacaoProduto from "components/screens/Produto/Reclamacao";
import AtivacaoSuspensaoDetalheProduto from "components/screens/Produto/AtivacaoSuspensao/AtivacaoSuspensaoDetalheProduto";
import AtivacaoSuspensao from "components/screens/Produto/AtivacaoSuspensao";
import Page from "components/Shareable/Page/Page";
import {
  PESQUISA_DESENVOLVIMENTO,
  RECLAMACAO_DE_PRODUTO,
  ATIVACAO_DE_PRODUTO,
  GESTAO_PRODUTO
} from "configs/constants";

export const ReclamacaoDeProdutoPage = () => {
  const atual = {
    href: `/${PESQUISA_DESENVOLVIMENTO}/${RECLAMACAO_DE_PRODUTO}`,
    titulo: "Reclamação de Produto"
  };

  return (
    <Page titulo={atual.titulo} botaoVoltar voltarPara="/">
      <Breadcrumb home={"/"} atual={atual} />
      <ReclamacaoProduto />
    </Page>
  );
};

export const ConsultaAtivacaoDeProdutoPage = () => {
  const atual = {
    href: `/${GESTAO_PRODUTO}/${ATIVACAO_DE_PRODUTO}/consulta`,
    titulo: "Ativar/suspender Produto"
  };

  return (
    <Page titulo={atual.titulo}>
      <Breadcrumb home={"/"} atual={atual} />
      <AtivacaoSuspensao />
    </Page>
  );
};

export const AtivacaoDeProdutoPage = () => {
  const atual = {
    href: `/${GESTAO_PRODUTO}/${ATIVACAO_DE_PRODUTO}/detalhe`,
    titulo: "Ativar/suspender Produto"
  };

  return (
    <Page titulo={atual.titulo}>
      <Breadcrumb home={"/"} atual={atual} />
      <AtivacaoSuspensaoDetalheProduto />
    </Page>
  );
};
