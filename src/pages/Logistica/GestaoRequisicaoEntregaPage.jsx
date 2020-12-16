import React from "react";
import { HOME } from "constants/config";
import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";
import { GESTAO_REQUISICAO_ENTREGA, LOGISTICA } from "configs/constants";
import GestaoRequisicaoEntrega from "components/screens/Logistica/GestaoRequisicaoEntrega";

const atual = {
  href: `/${LOGISTICA}/${GESTAO_REQUISICAO_ENTREGA}`,
  titulo: "Gestão de Requisição de Entrega"
};

const anteriores = [
  {
    href: `/`,
    titulo: "Logística"
  }
];

export default () => (
  <Page botaoVoltar voltarPara="/" titulo={atual.titulo}>
    <Breadcrumb home={HOME} atual={atual} anteriores={anteriores} />
    <GestaoRequisicaoEntrega />
  </Page>
);
