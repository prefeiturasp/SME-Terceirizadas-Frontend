import React from "react";
import Breadcrumb from "../../../components/Shareable/Breadcrumb";
import Page from "../../../components/Shareable/Page/Page";
import Container from "../../../components/InclusaoDeAlimentacao/Terceirizada/PainelPedidos/Container";
import { HOME } from "../constants";
import { TERCEIRIZADA, INCLUSAO_ALIMENTACAO } from "../../../configs/constants";

const atual = {
  href: `/${TERCEIRIZADA}/${INCLUSAO_ALIMENTACAO}`,
  titulo: "Inclusões de Alimentação"
};

export default () => (
  <Page>
    <Breadcrumb home={HOME} atual={atual} />
    <Container />
  </Page>
);
