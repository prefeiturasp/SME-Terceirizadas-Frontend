import React from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import Container from "../../components/AlteracaoDeCardapio/Container";
import Page from "../../components/Shareable/Page/Page";
import { HOME } from "./constants";

const atual = {
  href: "/escola/alteracao-de-cardapio",
  titulo: "Alteração de Cardápio"
};

export default () => (
  <Page titulo={atual.titulo}>
    <Breadcrumb home={HOME} atual={atual} />
    <Container />
  </Page>
);
