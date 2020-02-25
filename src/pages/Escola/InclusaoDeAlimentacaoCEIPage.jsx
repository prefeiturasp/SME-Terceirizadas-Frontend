import React from "react";
import Container from "../../components/InclusaoDeAlimentacaoDaCei/Container";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import Page from "../../components/Shareable/Page/Page";
import { ESCOLA, INCLUSAO_ALIMENTACAO_CEI } from "../../configs/constants";
import { HOME } from "./constants";

const atual = {
  href: `/${ESCOLA}/${INCLUSAO_ALIMENTACAO_CEI}`,
  titulo: "Inclusão de Alimentação"
};

export default () => (
  <Page titulo={atual.titulo}>
    <Breadcrumb home={HOME} atual={atual} />
    <Container />
  </Page>
);
