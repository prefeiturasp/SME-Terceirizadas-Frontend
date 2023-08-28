import React from "react";
import Container from "../../components/AlteracaoDeCardapioCEMEI/componentes/Container";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import Page from "../../components/Shareable/Page/Page";
import { ESCOLA, ALTERACAO_TIPO_ALIMENTACAO } from "../../configs/constants";
import { HOME } from "./constants";

const atual = {
  href: `/${ESCOLA}/${ALTERACAO_TIPO_ALIMENTACAO}`,
  titulo: "Alteração do Tipo de Alimentação",
};

export default () => (
  <Page titulo={atual.titulo} botaoVoltar>
    <Breadcrumb home={HOME} atual={atual} />
    <Container />
  </Page>
);
