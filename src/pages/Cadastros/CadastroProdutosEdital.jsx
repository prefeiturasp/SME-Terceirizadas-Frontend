import React from "react";
import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";
import CadastroProdutosEdital from "components/screens/Cadastros/CadastroProdutosEdital";

const atual = {
  href: `/gestao-produto/cadastro-produtos-provinientes-edital`,
  titulo: "Cadastro de Produtos Provenientes do Edital",
};

export default () => (
  <Page titulo={atual.titulo} botaoVoltar voltarPara={`/`}>
    <Breadcrumb home={"/"} atual={atual} />
    <CadastroProdutosEdital />
  </Page>
);
