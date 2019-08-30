import React from "react";
import Breadcrumb from "../../../components/Shareable/Breadcrumb";
import Page from "../../../components/Shareable/Page/Page";
import Container from "../../../components/InclusaoDeAlimentacao/DRE/PainelPedidos/Container";
import { HOME } from "../constants";
import { INCLUSAO_ALIMENTACAO, DRE } from "../../../configs/RoutesConfig";

const atual = {
  href: `/${DRE}/${INCLUSAO_ALIMENTACAO}`,
  titulo: "Inclusões de Alimentação"
};

export default () => (
  <Page>
    <Breadcrumb home={HOME} atual={atual} />
    <Container />
  </Page>
);
