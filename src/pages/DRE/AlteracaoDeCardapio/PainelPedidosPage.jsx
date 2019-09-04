import React from "react";
import Breadcrumb from "../../../components/Shareable/Breadcrumb";
import Page from "../../../components/Shareable/Page/Page";
import Container from "../../../components/AlteracaoDeCardapio/DRE/PainelPedidos/Container";
import { HOME } from "../constants";
import { DRE, ALTERACAO_CARDAPIO } from "../../../configs/constants";

const atual = {
  href: `/${DRE}/${ALTERACAO_CARDAPIO}`,
  titulo: "Alterações de Cardápio"
};

export default () => (
  <Page>
    <Breadcrumb home={HOME} atual={atual} />
    <Container />
  </Page>
);
