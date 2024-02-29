import React from "react";
import Breadcrumb from "components/Shareable/Breadcrumb";
import VincularProdutosEditais from "components/screens/Cadastros/VincularProdutosEditais";
import Page from "components/Shareable/Page/Page";

const atual = {
  href: `/gestao-produto/vincular-produto-edital`,
  titulo: "Vincular Produtos aos Editais",
};

export default () => (
  <Page titulo={atual.titulo} botaoVoltar voltarPara={`/`}>
    <Breadcrumb home={"/"} atual={atual} />
    <VincularProdutosEditais />
  </Page>
);
