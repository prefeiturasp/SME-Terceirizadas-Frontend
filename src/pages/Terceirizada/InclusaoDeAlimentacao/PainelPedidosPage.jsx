import React from "react";
import Breadcrumb from "../../../components/Shareable/Breadcrumb";
import Page from "../../../components/Shareable/Page/Page";
import Container from "../../../components/InclusaoDeAlimentacao/Terceirizada/PainelPedidos/Container";
import { HOME } from "../constants";

const atual = {
  href: "/terceirizada/inclusoes-de-alimentacao",
  titulo: "Inclusões de Alimentação"
};

export default () => (
  <Page>
    <Breadcrumb home={HOME} atual={atual} />
    <Container />
  </Page>
);
