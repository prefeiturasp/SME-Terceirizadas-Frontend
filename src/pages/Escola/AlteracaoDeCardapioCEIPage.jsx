import React from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import Container from "../../components/AlteracaoDeCardapio/CEI/Container";
import Page from "../../components/Shareable/Page/Page";
import { HOME } from "./constants";

const atual = {
  href: "/escola/alteracao-do-tipo-de-alimentacao",
  titulo: "Alteração do Tipo de Alimentação"
};

export default () => (
  <Page titulo={atual.titulo}>
    <Breadcrumb home={HOME} atual={atual} />
    <Container />
  </Page>
);
