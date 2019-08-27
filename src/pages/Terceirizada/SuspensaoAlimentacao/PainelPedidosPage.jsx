import React from "react";
import Breadcrumb from "../../../components/Shareable/Breadcrumb";
import Page from "../../../components/Shareable/Page/Page";
import Container from "../../../components/SuspensaoDeAlimentacao/Terceirizada/PainelPedidos/Container";
import { HOME } from "../constants";

const atual = {
  href: "/terceirizada/suspensoes-de-alimentacao",
  titulo: "Suspensão de Alimentação"
};

export default () => (
  <Page>
    <Breadcrumb home={HOME} atual={atual} />
    <Container />
  </Page>
);
