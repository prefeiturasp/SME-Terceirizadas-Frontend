import React from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import Container from "../../components/screens/Cadastros/CadastroLote/Container";
import Page from "../../components/Shareable/Page/Page";

const atual = {
  href: "/configuracoes/cadastros/lote",
  titulo: "Cadastro de Lote"
};

const anteriores = [
  {
    href: "/configuracoes/cadastros",
    titulo: "Cadastros"
  }
];

export default () => (
  <Page titulo={atual.titulo} botaoVoltar voltarPara={"/configuracoes/cadastros"}>
    <Breadcrumb home={"/"} anteriores={anteriores} atual={atual} />
    <Container />
  </Page>
);
