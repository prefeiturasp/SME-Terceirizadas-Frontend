import React from "react";
import Breadcrumb from "../../../components/Shareable/Breadcrumb";
import Page from "../../../components/Shareable/Page/Page";
import Container from "../../../components/InversaoDeDiaDeCardapio/Terceirizada/PainelPedidos/Container";
import { HOME } from "../constants";
import { INVERSAO_CARDAPIO, TERCEIRIZADA } from "../../../configs/RoutesConfig";

const atual = {
  href: `/${TERCEIRIZADA}/${INVERSAO_CARDAPIO}`,
  titulo: "Inversões de dia de Cardápio"
};

export default () => (
  <Page>
    <Breadcrumb home={HOME} atual={atual} />
    <Container />
  </Page>
);
