import React from "react";
import Breadcrumb from "../../../components/Shareable/Breadcrumb";
import Page from "../../../components/Shareable/Page/Page";
import Container from "../../../components/InversaoDeDiaDeCardapio/Terceirizada/PainelPedidos/Container";
import { HOME } from "../constants";
import { INVERSAO_CARDAPIO, TERCEIRIZADA } from "../../../configs/constants";

const atual = {
  href: `/${TERCEIRIZADA}/${INVERSAO_CARDAPIO}`,
  titulo: "Inversão de dia de Cardápio - Pendente Ciência"
};

export default () => (
  <Page titulo={atual.titulo} botaoVoltar voltarPara={HOME}>
    <Breadcrumb home={HOME} atual={atual} />
    <Container />
  </Page>
);
