import React from "react";
import Breadcrumb from "../../../components/Shareable/Breadcrumb";
import Page from "../../../components/Shareable/Page/Page";
import Container from "../../../components/SuspensaoDeAlimentacao/Terceirizada/PainelPedidos/Container";
import { HOME } from "../constants";
import {
  TERCEIRIZADA,
  SUSPENSAO_ALIMENTACAO
} from "../../../configs/constants";

const atual = {
  href: `/${TERCEIRIZADA}/${SUSPENSAO_ALIMENTACAO}`,
  titulo: "Suspensão de Alimentação - Pendente Ciência"
};

export default () => (
  <Page titulo={atual.titulo} botaoVoltar voltarPara={HOME}>
    <Breadcrumb home={HOME} atual={atual} />
    <Container />
  </Page>
);
