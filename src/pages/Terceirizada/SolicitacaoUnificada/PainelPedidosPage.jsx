import React from "react";
import Breadcrumb from "../../../components/Shareable/Breadcrumb";
import Page from "../../../components/Shareable/Page/Page";
import Container from "../../../components/SolicitacaoUnificada/Terceirizada/PainelPedidos/Container";
import { HOME } from "../constants";
import {
  TERCEIRIZADA,
  SOLICITACAO_KIT_LANCHE_UNIFICADA
} from "../../../configs/constants";

const atual = {
  href: `/${TERCEIRIZADA}/${SOLICITACAO_KIT_LANCHE_UNIFICADA}`,
  titulo: "Solicitação Unificadas - Pendente Ciência"
};

export default () => (
  <Page titulo={atual.titulo} botaoVoltar voltarPara={HOME}>
    <Breadcrumb home={HOME} atual={atual} />
    <Container />
  </Page>
);
