import React from "react";
import Breadcrumb from "../../../components/Shareable/Breadcrumb";
import Page from "../../../components/Shareable/Page/Page";
import Container from "../../../components/AlteracaoDeCardapio/CODAE/PainelPedidos/Container";
import { HOME } from "../constants";

const atual = {
  href: "/codae/alteracoes-de-cardapio",
  titulo: "Alterações de Cardápio"
};

export default () => (
  <Page>
    <Breadcrumb home={HOME} atual={atual} />
    <Container />
  </Page>
);
