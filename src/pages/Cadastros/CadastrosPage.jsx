import React from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import Cadastros from "../../components/screens/Cadastros/Cadastros";
import Page from "../../components/Shareable/Page/Page";

const atual = {
  href: "/configuracoes/cadastros",
  titulo: "Cadastros"
};

export default () => (
  <Page titulo={atual.titulo} botaoVoltar>
    <Breadcrumb home={"/"} atual={atual} />
    <Cadastros />
  </Page>
);
