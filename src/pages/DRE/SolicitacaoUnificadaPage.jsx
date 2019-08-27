import React from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import Page from "../../components/Shareable/Page/Page";
import Container from "../../components/SolicitacaoUnificada/Container";
import { HOME } from "./constants";

const atual = {
  href: "/dre/solicitacao-unificada",
  titulo: "Solicitação Unificada"
};

export default () => (
  <Page titulo={atual.titulo}>
    <Breadcrumb home={HOME} atual={atual} />
    <Container />
  </Page>
);
