import React from "react";
import Breadcrumb from "../../../components/Shareable/Breadcrumb";
import Page from "../../../components/Shareable/Page/Page";
import Container from "../../../components/SolicitacaoUnificada/Terceirizada/PainelPedidos/Container";
import { HOME } from "../constants";

const atual = {
  href: "/terceirizada/solicitacoes-unificadas",
  titulo: "Solicitações Unificadas"
};

export default () => (
  <Page>
    <Breadcrumb home={HOME} atual={atual} />
    <Container />
  </Page>
);
