import React from "react";
import Breadcrumb from "../../../components/Shareable/Breadcrumb";
import Page from "../../../components/Shareable/Page/Page";
import Container from "../../../components/AlteracaoDeCardapio/Terceirizada/PainelPedidos/Container";
import { HOME } from "../constants";
import {
  ALTERACAO_TIPO_ALIMENTACAO,
  TERCEIRIZADA
} from "../../../configs/constants";

const atual = {
  href: `/${TERCEIRIZADA}/${ALTERACAO_TIPO_ALIMENTACAO}`,
  titulo: "Alteração do Tipo de Alimentação - Pendente Ciência"
};

export default () => (
  <Page titulo={atual.titulo} botaoVoltar voltarPara={HOME}>
    <Breadcrumb home={HOME} atual={atual} />
    <Container />
  </Page>
);
