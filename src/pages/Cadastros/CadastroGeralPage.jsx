import React from "react";
import Breadcrumb from "components/Shareable/Breadcrumb";
import CadastroGeral from "components/screens/Cadastros/CadastroGeral";
import Page from "components/Shareable/Page/Page";

const atual = {
  href: `/gestao-produto/cadastro-geral`,
  titulo: "Cadastro Geral"
};

export default () => (
  <Page titulo={atual.titulo} botaoVoltar voltarPara={`/`}>
    <Breadcrumb home={"/"} atual={atual} />
    <CadastroGeral />
  </Page>
);
