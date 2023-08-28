import React from "react";
import Container from "../../components/InclusaoDeAlimentacaoCEMEI/componentes/Container";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import Page from "../../components/Shareable/Page/Page";
import { ESCOLA, INCLUSAO_ALIMENTACAO } from "../../configs/constants";
import { HOME } from "./constants";

const atual = {
  href: `/${ESCOLA}/${INCLUSAO_ALIMENTACAO}`,
  titulo: "Inclusão de Alimentação",
};

export default () => (
  <Page titulo={atual.titulo} botaoVoltar>
    <Breadcrumb home={HOME} atual={atual} />
    <Container />
  </Page>
);
