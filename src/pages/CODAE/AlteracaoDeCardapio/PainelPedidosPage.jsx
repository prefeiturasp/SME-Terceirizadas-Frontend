import React from "react";
import Container from "../../../components/AlteracaoDeCardapio/CODAE/PainelPedidos/Container";
import Breadcrumb from "../../../components/Shareable/Breadcrumb";
import Page from "../../../components/Shareable/Page/Page";
import { ALTERACAO_CARDAPIO, CODAE } from "../../../configs/constants";
import { HOME } from "../constants";

const atual = {
  href: `/${CODAE}/${ALTERACAO_CARDAPIO}`,
  titulo: "Alterações de Cardápio"
};

export default () => (
  <Page>
    <Breadcrumb home={HOME} atual={atual} />
    <Container />
  </Page>
);
