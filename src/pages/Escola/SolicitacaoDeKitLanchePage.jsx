import React from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import Page from "../../components/Shareable/Page/Page";
import Container from "../../components/SolicitacaoDeKitLanche/Container";
import { HOME } from "./constants";

const atual = {
  href: "/escola/solicitacao-de-kit-lanche",
  titulo: "Solicitação de Kit Lanche"
};

export default props => (
  <Page titulo={atual.titulo}>
    <Breadcrumb home={HOME} atual={atual} />
    <Container />
  </Page>
);
