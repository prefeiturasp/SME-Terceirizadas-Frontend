import React from "react";
import Breadcrumb from "../../../components/Shareable/Breadcrumb";
import Page from "../../../components/Shareable/Page/Page";
import Container from "../../../components/AlteracaoDeCardapio/Terceirizada/PainelPedidos/Container";
import { HOME } from "../constants";
import { ALTERACAO_CARDAPIO, TERCEIRIZADA } from "../../../configs/RoutesConfig";

const atual = {
  href: `/${TERCEIRIZADA}/${ALTERACAO_CARDAPIO}`,
  titulo: "Alterações de Cardápio"
};

export default () => (
  <Page>
    <Breadcrumb home={HOME} atual={atual} />
    <Container />
  </Page>
);
