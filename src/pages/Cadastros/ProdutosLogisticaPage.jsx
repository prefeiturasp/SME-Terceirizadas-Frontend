import React from "react";
import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";
import ProdutosLogistica from "components/screens/Cadastros/ProdutosLogistica";
import { CADASTROS, CONFIGURACOES, PRODUTOS } from "configs/constants";

const atual = {
  href: `/${CONFIGURACOES}/${CADASTROS}/${PRODUTOS}`,
  titulo: "Produtos",
};

const anteriores = [
  {
    href: `/${CONFIGURACOES}/${CADASTROS}`,
    titulo: "Cadastros",
  },
];

export default () => (
  <Page titulo={atual.titulo} botaoVoltar voltarPara={`/`}>
    <Breadcrumb home={"/"} anteriores={anteriores} atual={atual} />
    <ProdutosLogistica />
  </Page>
);
