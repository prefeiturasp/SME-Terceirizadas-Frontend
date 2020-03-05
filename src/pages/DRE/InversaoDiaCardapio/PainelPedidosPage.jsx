import React from "react";
import Breadcrumb from "../../../components/Shareable/Breadcrumb";
import Page from "../../../components/Shareable/Page/Page";
import Container from "../../../components/InversaoDeDiaDeCardapio/DRE/PainelPedidos/Container";
import { HOME } from "../constants";
import { INVERSAO_CARDAPIO, DRE } from "../../../configs/constants";

const atual = {
  href: `/${DRE}/${INVERSAO_CARDAPIO}`,
  titulo: "Inversão de dia de Cardápio"
};

export default () => (
  <Page titulo={atual.titulo} botaoVoltar voltarPara={HOME}>
    <Breadcrumb home={HOME} atual={atual} />
    <Container />
  </Page>
);
