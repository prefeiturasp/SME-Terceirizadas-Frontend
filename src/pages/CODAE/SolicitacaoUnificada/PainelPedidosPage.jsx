import React from "react";
import Breadcrumb from "../../../components/Shareable/Breadcrumb";
import Page from "../../../components/Shareable/Page/Page";
import Container from "../../../components/SolicitacaoUnificada/CODAE/PainelPedidos/Container";
import { HOME } from "../constants";
import {
  CODAE,
  SOLICITACAO_KIT_LANCHE_UNIFICADA
} from "../../../configs/constants";

const atual = {
  href: `/${CODAE}/${SOLICITACAO_KIT_LANCHE_UNIFICADA}`,
  titulo: "Solicitação Unificada - Pendente Autorização"
};

export default () => (
  <Page titulo={atual.titulo} botaoVoltar voltarPara={HOME}>
    <Breadcrumb home={HOME} atual={atual} />
    <Container />
  </Page>
);
