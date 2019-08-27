import React from "react";
import Breadcrumb from "../../../components/Shareable/Breadcrumb";
import Page from "../../../components/Shareable/Page/Page";
import Container from "../../../components/AlteracaoDeCardapio/DRE/PainelPedidos/Container";
import { HOME } from "../constants";

const atual = {
  href: "/dre/alteracoes-de-cardapio",
  titulo: "Alterações de Cardápio"
};

export default () => (
  <Page>
    <Breadcrumb home={HOME} atual={atual} />
    <Container />
  </Page>
);
