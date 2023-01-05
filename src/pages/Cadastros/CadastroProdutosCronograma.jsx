import React from "react";
import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";
import CadastroProdutosEdital from "components/screens/Cadastros/CadastroProdutosEdital";
import { CADASTROS, CONFIGURACOES, PRODUTOS } from "configs/constants";

const atual = {
  href: `/${CONFIGURACOES}/${CADASTROS}/${PRODUTOS}`,
  titulo: "Cadastro de Produtos"
};

export default () => (
  <Page titulo={atual.titulo} botaoVoltar voltarPara={`/`}>
    <Breadcrumb home={"/"} atual={atual} />
    <CadastroProdutosEdital />
  </Page>
);
