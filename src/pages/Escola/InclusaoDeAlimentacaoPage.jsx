import React from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import Page from "../../components/Shareable/Page/Page";
import Container from "../../components/InclusaoDeAlimentacao/Container";
import { HOME } from "./constants";

const atual = {
  href: "/escola/inclusao-de-alimentacao",
  titulo: "Inclusão de Alimentação"
};

export default props => (
  <Page titulo={atual.titulo}>
    <Breadcrumb home={HOME} atual={atual} />
    <Container />
  </Page>
);
