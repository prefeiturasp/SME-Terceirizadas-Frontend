import React from "react";
import Breadcrumb from "components/Shareable/Breadcrumb";
import ReclamacaoProduto from "components/screens/Produto/Reclamacao";
import AtivacaoSuspensao from "components/screens/Produto/AtivacaoSuspensao";
import Page from "components/Shareable/Page/Page";
import {
  PESQUISA_DESENVOLVIMENTO,
  RECLAMACAO_DE_PRODUTO,
  ATIVACAO_DE_PRODUTO
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

export const AtivacaoDeProdutoPage = () => {
  const atual = {
    href: `/${PESQUISA_DESENVOLVIMENTO}/${ATIVACAO_DE_PRODUTO}`,
    titulo: "Ativar/Suspender Produto"
  };

  return (
    <Page titulo={atual.titulo} botaoVoltar voltarPara="/">
      <Breadcrumb home={"/"} atual={atual} />
      <AtivacaoSuspensao />
    </Page>
  );
};
