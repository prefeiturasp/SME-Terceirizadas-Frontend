import React from "react";
import { HOME } from "constants/config";
import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";
import { INSUCESSO_ENTREGA, LOGISTICA } from "configs/constants";
import InsucessoEntrega from "components/screens/Logistica/InsucessoEntrega";

const atual = {
  href: `/${LOGISTICA}/${INSUCESSO_ENTREGA}`,
  titulo: "Insucesso de Entrega"
};

const anteriores = [
  {
    href: `/`,
    titulo: "Abastecimento"
  }
];

export default () => (
  <Page botaoVoltar voltarPara="/" titulo={atual.titulo}>
    <Breadcrumb home={HOME} atual={atual} anteriores={anteriores} />
    <InsucessoEntrega />
  </Page>
);
